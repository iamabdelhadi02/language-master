/**
 * POST /api/vision-agent
 *
 * Proxies requests to the Vision Agent HTTP server (FastAPI) so the
 * Expo app can start / stop AI teacher sessions without exposing the
 * vision agent server to the client directly.
 *
 * Body:
 *   - action: "start" | "stop"
 *   - callType: string  (Stream call type, e.g. "default")
 *   - callId:   string  (Stream call ID)
 *   - sessionId?: string (required for "stop" action)
 *
 * Environment:
 *   EXPO_PUBLIC_VISION_AGENT_URL — override the default (http://127.0.0.1:8000)
 */

// Use 127.0.0.1 explicitly — Uvicorn binds IPv4, and "localhost" can
// resolve to ::1 (IPv6) in some Node.js setups, causing connection refused.
const VISION_AGENT_URL =
  process.env.EXPO_PUBLIC_VISION_AGENT_URL ?? "http://127.0.0.1:8000";

interface VisionAgentRequestBody {
  action: "start" | "stop";
  callType: string;
  callId: string;
  sessionId?: string;
  languageName?: string;
  languageCode?: string;
  lessonTitle?: string;
  lessonId?: string;
}

interface StartSessionResponse {
  session_id: string;
  call_id: string;
  session_started_at: string;
}

export async function POST(request: Request): Promise<Response> {
  console.log("[vision-agent API] ← request received");

  let body: VisionAgentRequestBody;
  try {
    body = await request.json();
  } catch {
    console.log("[vision-agent API] ← invalid JSON body");
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { action, callType, callId, sessionId } = body;
  console.log(
    `[vision-agent API] action=${action} callType=${callType} callId=${callId}`,
  );

  if (!action || !callType || !callId) {
    console.log("[vision-agent API] ← missing required fields");
    return Response.json(
      { error: "Missing required fields: action, callType, callId" },
      { status: 400 },
    );
  }

  try {
    if (action === "start") {
      const targetUrl = `${VISION_AGENT_URL}/calls/${encodeURIComponent(callId)}/sessions`;
      console.log(`[vision-agent API] → PROXY POST ${targetUrl}`);

      const res = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          call_type: callType,
          language_name: body.languageName,
          language_code: body.languageCode,
          lesson_title: body.lessonTitle,
          lesson_id: body.lessonId,
        }),
      });

      console.log(`[vision-agent API] ← vision agent responded: ${res.status}`);

      if (!res.ok) {
        const detail = await res.text();
        console.error(
          `[vision-agent API] ← vision agent error (${res.status}): ${detail}`,
        );
        return Response.json(
          { error: `Vision agent failed to start: ${res.status}` },
          { status: res.status },
        );
      }

      const data: StartSessionResponse = await res.json();
      console.log(
        `[vision-agent API] ← session created: ${data.session_id}`,
      );
      return Response.json(data, { status: 201 });
    }

    if (action === "stop") {
      if (!sessionId) {
        return Response.json(
          { error: "sessionId is required for stop action" },
          { status: 400 },
        );
      }

      const targetUrl = `${VISION_AGENT_URL}/calls/${encodeURIComponent(callId)}/sessions/${encodeURIComponent(sessionId)}`;
      console.log(`[vision-agent API] → PROXY DELETE ${targetUrl}`);

      const res = await fetch(targetUrl, { method: "DELETE" });

      console.log(`[vision-agent API] ← vision agent responded: ${res.status}`);

      if (!res.ok && res.status !== 404) {
        const detail = await res.text();
        console.error(
          `[vision-agent API] ← vision agent error (${res.status}): ${detail}`,
        );
        return Response.json(
          { error: `Vision agent failed to stop: ${res.status}` },
          { status: res.status },
        );
      }

      return Response.json({ ok: true });
    }

    return Response.json(
      { error: `Unknown action: ${action}` },
      { status: 400 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(
      `[vision-agent API] ← proxy error (check if vision agent server is running on ${VISION_AGENT_URL}): ${message}`,
    );
    return Response.json(
      { error: `Vision agent server unreachable at ${VISION_AGENT_URL}: ${message}` },
      { status: 502 },
    );
  }
}
