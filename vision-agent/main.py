"""
Vision Agents — AI Language Teacher

A voice-only AI language teacher that uses:
  - Gemini Realtime (LLM + STT/TTS built-in)
  - Stream Edge (transport layer)

The teacher always speaks English and helps users learn their
selected language through English explanations.

For Arabic, the agent switches to conversational mode — speaking
mainly in Arabic for open-ended dialogue practice.
"""

import asyncio
import logging
from pathlib import Path

from dotenv import load_dotenv
from google.genai.types import (
    LiveConnectConfigDict,
    PrebuiltVoiceConfigDict,
    SpeechConfigDict,
    VoiceConfigDict,
)

from vision_agents.core import Agent, AgentLauncher
from vision_agents.core.edge.events import ParticipantJoinedEvent
from vision_agents.core.edge.types import User
from vision_agents.core.runner import Runner
from vision_agents.plugins.gemini import Realtime
from vision_agents.plugins.getstream import Edge

# Load environment variables from .env at startup.
load_dotenv()

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Voice configuration
# ---------------------------------------------------------------------------

# Available male voices from Gemini:
#   achird, algenib, algieba, alnilam, charon, enceladus, fenrir,
#   iapetus, orus, puck, rasalgethi, sadachbia, sadaltager, schedar,
#   umbriel, zubenelgenubi
#
# Available female voices:
#   achernar, aoede, autonoe, callirrhoe, despina, erinome, gacrux,
#   kore, laomedeia, leda, sulafat, zephyr, pulcherrima, vindemiatrix

# Map language codes to preferred voice names.
# Arabic gets a male voice (Karim); other languages keep female voices.
VOICE_MAP: dict[str, str] = {
    "ar": "Puck",      # Male — warm, friendly tone for Arabic conversations
    "es": "Leda",      # Female — Sofia
    "fr": "Leda",      # Female — Camille
    "ja": "Leda",      # Female — Yuki
    "de": "Leda",      # Female — Klaus (voice stays female for now)
}

DEFAULT_VOICE = "Puck"  # Default to male voice


def _build_live_config(language_code: str = "") -> LiveConnectConfigDict:
    """Build a LiveConnectConfigDict with the appropriate voice."""
    voice_name = VOICE_MAP.get(language_code, DEFAULT_VOICE)
    logger.info(f"Using voice: {voice_name} (language_code={language_code!r})")
    return LiveConnectConfigDict(
        speech_config=SpeechConfigDict(
            voice_config=VoiceConfigDict(
                prebuilt_voice_config=PrebuiltVoiceConfigDict(
                    voice_name=voice_name,
                ),
            ),
        ),
    )


# ---------------------------------------------------------------------------
# Agent factory
# ---------------------------------------------------------------------------
def _build_instructions(
    language_name: str = "",
    language_code: str = "",
    lesson_title: str = "",
) -> str:
    """Build the agent's system instructions, optionally with lesson context.

    For Arabic (ar), the agent switches to conversational mode: speaks mainly
    in Arabic and conducts open-ended dialogue on any topic the user chooses.
    For all other languages, the agent teaches through English explanations.
    """
    lesson_context = ""
    if language_name and lesson_title:
        lesson_context = (
            f"The user is learning {language_name} ({language_code}) "
            f"and is currently on the lesson: {lesson_title}. "
        )
    elif language_name:
        lesson_context = (
            f"The user is learning {language_name} ({language_code}). "
        )

    # ── Arabic: conversational mode ──────────────────────────────────────
    if language_code == "ar":
        return (
            "You are Karim, a warm and friendly Arabic teacher from Cairo.\n"
            "\n"
            f"{lesson_context}"
            "When you first join the call, greet the user warmly in Arabic, "
            "mention that this is a conversational Arabic session, and ask "
            "what they'd like to talk about.\n"
            "\n"
            "Rules:\n"
            "- Speak MAINLY in Arabic — natural, conversational Arabic, not "
            "formal textbook language.\n"
            "- Switch to English ONLY when the student clearly needs help "
            "or asks for clarification.\n"
            "- This is OPEN-ENDED conversation. The user can ask about ANY "
            "topic: culture, food, travel, daily life, work, hobbies, "
            "opinions — anything. Follow their lead.\n"
            "- Adapt your speed and vocabulary to the student's level. If "
            "they're a beginner, speak slowly with simple words. If "
            "advanced, use natural speed and richer vocabulary.\n"
            "- Be encouraging, friendly, and patient.\n"
            "- Correct mistakes gently by echoing the correct form in your "
            "response — never interrupt the conversation to give a grammar "
            "lesson unless the student asks.\n"
            "- Use a playful, encouraging tone like Duolingo.\n"
            "- Do NOT use special characters, markdown, or emojis in speech.\n"
            "- After the user speaks, always respond. Never leave the user "
            "waiting without a reply.\n"
            "- Keep the conversation flowing naturally — this is a real "
            "dialogue, not a structured lesson.\n"
        )

    # ── All other languages: English-instruction mode ────────────────────
    return (
        "You are an AI language teacher.\n"
        "\n"
        f"{lesson_context}"
        "When you first join the call, greet the user warmly, mention the "
        "language they are learning, and introduce the lesson briefly. "
        "Then ask a simple question to begin practicing.\n"
        "\n"
        "Rules:\n"
        "- Always speak in English.\n"
        "- Teach the user the language they are learning through English "
        "explanations.\n"
        "- Be encouraging, friendly, and patient.\n"
        "- Keep responses concise and clear for a learning context.\n"
        "- Explain concepts in English; give examples in both English "
        "and the target language.\n"
        "- When the user makes mistakes, gently correct them.\n"
        "- Use a playful, encouraging tone like Duolingo.\n"
        "- Do NOT use special characters, markdown, or emojis in speech.\n"
        "- After the user speaks, always respond. Never leave the user "
        "waiting without a reply.\n"
    )


async def create_agent(**kwargs) -> Agent:
    """Create and return the language-teacher agent.

    This factory is called by AgentLauncher when a new session starts.
    The lesson context is read from the Stream call's custom data in
    ``join_call`` and injected into the agent's instructions before
    the Gemini session connects.

    The voice defaults to male ("Puck") and can be overridden per-language
    when the call's custom data is available in ``join_call``.
    """
    agent = Agent(
        edge=Edge(),
        agent_user=User(
            id="language-teacher",
            name="Language Teacher",
        ),
        instructions=_build_instructions(),
        llm=Realtime(config=_build_live_config()),
    )

    # -----------------------------------------------------------------------
    # Event subscriptions
    # -----------------------------------------------------------------------

    @agent.events.subscribe
    async def on_participant_joined(event: ParticipantJoinedEvent) -> None:
        """Greet any participant who joins after the agent."""
        await agent.simple_response(
            "Welcome! I'm your AI language teacher. "
            "I'm here to help you practice. How would you like to start?"
        )

    return agent


# ---------------------------------------------------------------------------
# Call-lifecycle handler
# ---------------------------------------------------------------------------
async def join_call(
    agent: Agent,
    call_type: str,
    call_id: str,
) -> None:
    """Join an existing call and stay until it ends.

    Reads the call's custom data (set by the Expo app) to discover which
    language and lesson the user is on, then updates the agent's system
    instructions before Gemini connects so the teacher knows exactly what
    to teach.

    Parameters
    ----------
    agent:
        The agent instance returned by ``create_agent``.
    call_type:
        Stream call type (e.g. ``"default"``, ``"audio_room"``).
    call_id:
        Unique identifier for the call.
    """
    call = await agent.create_call(call_type, call_id)

    # ── Read lesson context from the Stream call's custom data ─────────
    # The Expo app sets custom: { languageCode, languageName, lessonTitle,
    # lessonId } when creating the call. After get_or_create() (called by
    # create_call), BaseCall._sync_from_response populates custom_data.
    custom = getattr(call, "custom_data", {}) or {}
    logger.info(
        f"Call custom_data: languageCode={custom.get('languageCode')!r}, "
        f"languageName={custom.get('languageName')!r}, "
        f"lessonTitle={custom.get('lessonTitle')!r}"
    )

    language_name = str(custom.get("languageName", ""))
    language_code = str(custom.get("languageCode", ""))
    lesson_title = str(custom.get("lessonTitle", ""))

    # Update the agent's instructions with the actual lesson context
    # BEFORE joining so Gemini receives the correct system_instruction.
    if language_name:
        agent.llm.set_instructions(
            _build_instructions(
                language_name=language_name,
                language_code=language_code,
                lesson_title=lesson_title,
            )
        )
        logger.info(
            f"Updated agent instructions for: {language_name} "
            f"({language_code}) — {lesson_title}"
        )
    else:
        logger.warning(
            "No language_name in call custom_data — agent will use "
            "generic instructions"
        )

    # participant_wait_timeout=0 means the agent starts immediately
    # without waiting for other participants.
    async with agent.join(call, participant_wait_timeout=0):
        # Send the initial greeting. The mic stays enabled (audio track
        # always published), so Gemini stays connected and will continue
        # listening for user speech after this greeting completes.
        if language_code == "ar":
            # Arabic conversational mode — greet in Arabic
            greeting = (
                "أهلاً وسهلاً! أنا كريم، مدرّس اللغة العربية. "
                "هذه جلسة محادثة مفتوحة — يمكنك أن تسأل عن أي شيء تريده. "
                "عن ماذا تود أن نتحدث؟"
            )
            await agent.simple_response(greeting)
        else:
            greeting = "Welcome! I'm your AI language teacher."
            if language_name:
                greeting += (
                    f" You are learning {language_name} ({language_code})."
                )
                if lesson_title:
                    greeting += f" This lesson is: {lesson_title}."
            greeting += " I'm here to help you practice. How would you like to start?"
            await agent.simple_response(greeting)

        # Block until the call ends or the agent is stopped.
        # During this time, Gemini handles ongoing conversation via VAD.
        await agent.finish()


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
def main() -> None:
    """Parse CLI arguments and run the agent.

    Usage:
        uv run main.py run       # Run a single agent session
        uv run main.py serve     # Start the HTTP server (Edge)
    """
    launcher = AgentLauncher(
        create_agent=create_agent,
        join_call=join_call,
        agent_idle_timeout=0,  # Never disconnect when alone
    )
    runner = Runner(launcher=launcher)
    runner.cli()


if __name__ == "__main__":
    main()
