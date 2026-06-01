import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useUser } from "@clerk/expo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  StreamVideo,
  StreamVideoClient,
  type Theme,
  type DeepPartial,
  type User,
} from "@stream-io/video-react-native-sdk";

import { fetchStreamToken } from "@/lib/stream";

// ─── Provider ─────────────────────────────────────────────────────────

/**
 * Bridges safe-area insets into Stream Video's theme so built-in
 * CallContent, RingingCallContent, and participant views respect
 * notches and system bars.
 */
function VideoWithInsets({
  client,
  children,
}: {
  client: StreamVideoClient;
  children: React.ReactNode;
}) {
  const { top, right, bottom, left } = useSafeAreaInsets();
  const theme = {
    variants: { insets: { top, right, bottom, left } },
  } as DeepPartial<Theme>;

  return (
    <StreamVideo client={client} style={theme}>
      {children}
    </StreamVideo>
  );
}

/**
 * Wraps the app with StreamVideo once the Clerk user is available
 * and a Stream token has been fetched.
 *
 * Mounts inside ClerkProvider so `useUser()` is available.
 */
export function StreamVideoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  // Ref to access the latest client in the cleanup without adding it to deps
  const clientRef = useRef<StreamVideoClient | null>(null);

  const userId = clerkUser?.id ?? "";
  const userName =
    clerkUser?.fullName ??
    clerkUser?.primaryEmailAddress?.emailAddress ??
    userId;

  const connectStream = useCallback(async () => {
    if (!clerkUser) return;

    setConnecting(true);
    setError(null);

    try {
      const streamUser: User = {
        id: userId,
        name: userName,
        image: clerkUser.imageUrl,
      };

      // Token provider that re-hits our API route on every refresh
      const tokenProvider = async (): Promise<string> => {
        const session = await fetchStreamToken(userId);
        return session.token;
      };

      // Fetch initial token so we can prime the client
      const initialSession = await fetchStreamToken(userId);

      const c = StreamVideoClient.getOrCreateInstance({
        apiKey: initialSession.apiKey,
        user: streamUser,
        token: initialSession.token,
        tokenProvider,
      });

      clientRef.current = c;
      setClient(c);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to connect to Stream";
      console.error("StreamVideoProvider error:", message);
      setError(message);
    } finally {
      setConnecting(false);
    }
  }, [clerkUser, userId, userName]);

  useEffect(() => {
    // Connecting to Stream Video — legitimate external system integration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    connectStream();
    return () => {
      clientRef.current?.disconnectUser();
      clientRef.current = null;
      setClient(null);
    };
  }, [connectStream]);

  // ── Loading ─────────────────────────────────────────────────────────

  if (!clerkLoaded || connecting) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D0C1A",
        }}
      >
        <ActivityIndicator size="large" color="#5238FC" />
        <Text style={{ color: "#9CA3AF", marginTop: 12, fontSize: 14 }}>
          Connecting to Stream…
        </Text>
      </View>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D0C1A",
          padding: 32,
        }}
      >
        <Text
          style={{
            color: "#EF4444",
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          Connection Error
        </Text>
        <Text
          style={{ color: "#9CA3AF", fontSize: 14, textAlign: "center" }}
        >
          {error}
        </Text>
      </View>
    );
  }

  // ── No user yet ─────────────────────────────────────────────────────

  if (!client) {
    // Clerk loaded but no user — auth gate handles redirection
    return <>{children}</>;
  }

  // ── Connected ───────────────────────────────────────────────────────

  return <VideoWithInsets client={client}>{children}</VideoWithInsets>;
}
