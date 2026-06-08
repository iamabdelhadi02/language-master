import { getApiBaseUrl } from "@/lib/stream";

export interface VisionAgentStartResponse {
  session_id: string;
  call_id: string;
  session_started_at: string;
}

/**
 * Start a vision agent session on the given Stream call.
 *
 * Calls the Expo API route which proxies to the vision agent HTTP server.
 * The agent joins the call and begins interacting as the AI teacher.
 *
 * @returns The session info including session_id for later cleanup.
 */
export async function startVisionAgentSession(params: {
  callType: string;
  callId: string;
  languageName?: string;
  languageCode?: string;
  lessonTitle?: string;
  lessonId?: string;
}): Promise<VisionAgentStartResponse> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/vision-agent`;

  console.log(
    `[vision-agent lib] → POST ${url} (callId=${params.callId})`,
  );

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "start",
      callType: params.callType,
      callId: params.callId,
      languageName: params.languageName,
      languageCode: params.languageCode,
      lessonTitle: params.lessonTitle,
      lessonId: params.lessonId,
    }),
  });

  console.log(
    `[vision-agent lib] ← response: ${res.status}`,
  );

  if (!res.ok) {
    const body = await res.text();
    console.error(
      `[vision-agent lib] ← error body: ${body}`,
    );
    throw new Error(
      `Failed to start vision agent session (${res.status}): ${body}`,
    );
  }

  return res.json();
}

/**
 * Stop a running vision agent session.
 */
export async function stopVisionAgentSession(params: {
  callType: string;
  callId: string;
  sessionId: string;
}): Promise<void> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/vision-agent`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "stop",
      callType: params.callType,
      callId: params.callId,
      sessionId: params.sessionId,
    }),
  });

  if (!res.ok && res.status !== 404) {
    const body = await res.text();
    throw new Error(
      `Failed to stop vision agent session (${res.status}): ${body}`,
    );
  }
}
