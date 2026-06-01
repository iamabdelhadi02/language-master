import { StreamClient } from "@stream-io/node-sdk";

/**
 * POST /api/stream-call
 *
 * Creates a Stream audio call for a lesson session via the Stream Video SDK.
 * The SDK's built-in ApiClient handles server-side authentication (server JWT
 * + API key) so we never make raw fetch calls to the REST API.
 *
 * Body: { userId, userName, lessonId, languageCode, lessonTitle }
 * Returns: { callType, callId }
 *
 * TODO: Verify the Clerk session token from the request header instead of
 * accepting userId/userName from the request body. The backend should derive
 * the user identity from its own authenticated session so users cannot
 * impersonate each other when creating or joining calls.
 */
export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  if (!apiKey || !apiSecret) {
    console.error("Missing Stream API credentials in server environment.");
    return Response.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  let body: {
    userId?: string;
    userName?: string;
    lessonId?: string;
    languageCode?: string;
    lessonTitle?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const { userId, userName, lessonId, languageCode, lessonTitle } = body;

  if (!userId || !lessonId) {
    return Response.json(
      { error: "Missing required fields: userId, lessonId" },
      { status: 400 },
    );
  }

  // Sanitize call ID — Stream supports a-z, A-Z, 0-9, _, -
  const sanitizedLessonId = lessonId.replace(/[^a-zA-Z0-9_-]/g, "-");
  const callId = `lesson-${sanitizedLessonId}-${Date.now()}`;
  const callType = "default";

  try {
    // StreamClient constructor generates an internal server JWT (JWTServerToken)
    // and the ApiClient handles auth (api_key + JWT) on every request.
    const client = new StreamClient(apiKey, apiSecret);

    await client.video.getOrCreateCall({
      type: callType,
      id: callId,
      video: false,
      data: {
        created_by_id: userId,
        custom: {
          lessonId,
          languageCode: languageCode ?? "",
          lessonTitle: lessonTitle ?? "",
        },
        members: [
          {
            user_id: userId,
            name: userName ?? userId,
            role: "host",
          },
        ],
        settings_override: {
          audio: {
            mic_default_on: true,
            default_device: "speaker",
          },
        },
      },
    });

    return Response.json({
      callType,
      callId,
    });
  } catch (err) {
    console.error("Failed to create Stream call:", err);
    return Response.json(
      { error: "Failed to create Stream call" },
      { status: 500 },
    );
  }
}
