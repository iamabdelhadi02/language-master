"""
Vision Agents — AI Language Teacher

A voice-only AI language teacher that uses:
  - Gemini Realtime (LLM + STT/TTS built-in)
  - Stream Edge (transport layer)

The teacher always speaks English and helps users learn their
selected language through English explanations.
"""

import asyncio
from pathlib import Path

from dotenv import load_dotenv

from vision_agents.core import Agent, AgentLauncher
from vision_agents.core.edge.events import ParticipantJoinedEvent
from vision_agents.core.edge.types import User
from vision_agents.core.runner import Runner
from vision_agents.plugins.gemini import Realtime
from vision_agents.plugins.getstream import Edge

# Load environment variables from .env at startup.
load_dotenv()


# ---------------------------------------------------------------------------
# Agent factory
# ---------------------------------------------------------------------------
async def create_agent(**kwargs) -> Agent:
    """Create and return the language-teacher agent.

    This factory is called by AgentLauncher when a new session starts.
    Accepts ``**kwargs`` so the launcher can pass additional configuration.
    """
    agent = Agent(
        edge=Edge(),
        agent_user=User(
            id="language-teacher",
            name="Language Teacher",
        ),
        instructions=(
            "You are an AI language teacher.\n"
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
        ),
        llm=Realtime(),
    )

    # -----------------------------------------------------------------------
    # Event subscriptions
    # -----------------------------------------------------------------------

    @agent.events.subscribe
    async def on_participant_joined(event: ParticipantJoinedEvent) -> None:
        """Greet the user as soon as they join the call."""
        await agent.simple_response(
            "Welcome! I'm your language teacher. "
            "What language would you like to learn today?"
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
    # participant_wait_timeout=0 means the agent starts immediately
    # without waiting for other participants.
    async with agent.join(call, participant_wait_timeout=0):
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
