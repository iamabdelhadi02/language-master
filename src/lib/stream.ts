import Constants from "expo-constants";
import { Platform } from "react-native";

/**
 * Resolve the base URL for API routes.
 *
 * In development the Expo dev server hosts API routes (+api.ts files).
 * In production they are deployed alongside the app on the same origin,
 * or at a custom URL set via EXPO_PUBLIC_API_URL.
 */
export function getApiBaseUrl(): string {
  // Production override
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // Expo dev server — hostUri is available in dev client and Expo Go
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const protocol = hostUri.includes(":") ? "http" : "https";
    return `${protocol}://${hostUri}`;
  }

  // Debugger host (Expo Go specific)
  const debuggerHost = Constants.expoGoConfig?.debuggerHost;
  if (debuggerHost) {
    return `http://${debuggerHost}`;
  }

  // Fallback — common dev addresses
  return Platform.OS === "android"
    ? "http://10.0.2.2:8081"
    : "http://localhost:8081";
}

export interface StreamTokenResponse {
  apiKey: string;
  token: string;
  userId: string;
}

/**
 * Fetch a Stream Video user token from the API route.
 * The token is minted server-side so the API secret never reaches the client.
 */
export async function fetchStreamToken(
  userId: string,
): Promise<StreamTokenResponse> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/stream-token?user_id=${encodeURIComponent(userId)}`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to fetch Stream token (${res.status}): ${body}`,
    );
  }

  return res.json();
}

export interface StreamCallResponse {
  callType: string;
  callId: string;
}

export interface StreamCallRequest {
  userId: string;
  userName?: string;
  lessonId: string;
  languageCode?: string;
  lessonTitle?: string;
}

/**
 * Create a Stream audio call via the API route.
 * The call is created server-side with audio-only settings
 * and lesson metadata attached.
 */
export async function createStreamCall(
  params: StreamCallRequest,
): Promise<StreamCallResponse> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/stream-call`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to create Stream call (${res.status}): ${body}`,
    );
  }

  return res.json();
}
