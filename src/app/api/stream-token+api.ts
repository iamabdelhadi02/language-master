import { StreamClient } from "@stream-io/node-sdk";

/**
 * GET /api/stream-token
 *
 * Generates a Stream Video user token for the authenticated Clerk user.
 * The Stream API secret stays server-side — never exposed to the client.
 *
 * TODO: Verify the Clerk session token from the request header instead of
 * accepting user_id as a query parameter. The backend should derive the user
 * identity from its own authenticated session so tokens cannot be minted for
 * arbitrary users. Reject unauthorized requests with 401/403.
 */
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return Response.json(
      { error: "Missing user_id query parameter" },
      { status: 400 },
    );
  }

  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  if (!apiKey || !apiSecret) {
    console.error("Missing Stream API credentials in server environment.");
    return Response.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  try {
    const serverClient = new StreamClient(apiKey, apiSecret);
    const token = serverClient.generateUserToken({
      user_id: userId,
      validity_in_seconds: 60 * 60 * 4, // 4-hour token
    });

    return Response.json({
      apiKey,
      token,
      userId,
    });
  } catch (err) {
    console.error("Failed to generate Stream token:", err);
    return Response.json(
      { error: "Failed to generate Stream token" },
      { status: 500 },
    );
  }
}
