import { useEffect, useState, useCallback, useRef } from "react";
import {
  useStreamVideoClient,
  Call,
  CallingState,
} from "@stream-io/video-react-native-sdk";

import { createStreamCall } from "@/lib/stream";

// ─── Status ───────────────────────────────────────────────────────────

export type AudioCallStatus =
  | "idle"
  | "creating"
  | "joining"
  | "joined"
  | "reconnecting"
  | "ended"
  | "error";

/**
 * Maps SDK CallingState to the hook's simplified status.
 */
function callingStateToStatus(
  cs: CallingState | undefined,
): AudioCallStatus {
  switch (cs) {
    case CallingState.IDLE:
      return "idle";
    case CallingState.JOINING:
      return "joining";
    case CallingState.JOINED:
      return "joined";
    case CallingState.RECONNECTING:
      return "reconnecting";
    case CallingState.LEFT:
      return "ended";
    case CallingState.OFFLINE:
    case CallingState.RECONNECTING_FAILED:
    default:
      return "error";
  }
}

// ─── Hook inputs ──────────────────────────────────────────────────────

export interface UseAudioCallParams {
  lessonId: string;
  languageCode: string;
  lessonTitle: string;
  userId: string;
  userName: string;
}

// ─── Hook output ──────────────────────────────────────────────────────

export interface UseAudioCallReturn {
  /** The Stream Call instance (null until created). */
  call: Call | null;
  /** High-level call status. */
  status: AudioCallStatus;
  /** Error message when status is "error". */
  error: string | null;
  /** Whether the local mic is muted. */
  isMuted: boolean;
  /** Toggle the local mic on/off. */
  toggleMute: () => Promise<void>;
  /** End the call for this participant. */
  endCall: () => Promise<void>;
  /** Reconnect / retry after an error. */
  retry: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────

/**
 * Manages the full lifecycle of a Stream audio call for a lesson.
 *
 * 1. Calls the API route to create the call server-side.
 * 2. Creates a local Call instance via `client.call(...)`.
 * 3. Joins the call with audio-only settings.
 * 4. Tracks status, mic state, and cleans up on unmount.
 *
 * The returned `call` should be passed to `<StreamCall call={call}>`
 * so that child components can use `useCallStateHooks()` for live state.
 */
export function useAudioCall({
  lessonId,
  languageCode,
  lessonTitle,
  userId,
  userName,
}: UseAudioCallParams): UseAudioCallReturn {
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call | null>(null);
  const [status, setStatus] = useState<AudioCallStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Refs to prevent double-join and guard leave
  const hasJoined = useRef(false);

  // ── Bootstrap: create call + join ───────────────────────────────────

  const bootstrap = useCallback(async () => {
    if (!client || !userId || !lessonId) return;
    if (hasJoined.current) return;

    try {
      setStatus("creating");
      setError(null);

      // 1. Create the call server-side
      const { callType, callId } = await createStreamCall({
        userId,
        userName,
        lessonId,
        languageCode,
        lessonTitle,
      });

      // 2. Get or create the local Call instance
      const c = client.call(callType, callId, { reuseInstance: true });
      setCall(c);

      // 3. Subscribe to calling state changes
      c.state.callingState$.subscribe((cs) => {
        setStatus(callingStateToStatus(cs));
      });

      // 4. Subscribe to mic state changes
      c.microphone.state.status$.subscribe((micStatus) => {
        setIsMuted(micStatus === "disabled");
      });

      // 5. Join the call
      setStatus("joining");
      await c.join({ create: true });
      hasJoined.current = true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to join Stream call";
      console.error("useAudioCall bootstrap error:", message);
      setError(message);
      setStatus("error");
    }
  }, [client, userId, userName, lessonId, languageCode, lessonTitle]);

  useEffect(() => {
    // Bootstrapping the call — legitimate external system integration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    bootstrap();

    return () => {
      // Cleanup: leave the call on unmount
      if (call && call.state.callingState !== CallingState.LEFT) {
        call.leave().catch((err) =>
          console.error("useAudioCall cleanup leave error:", err),
        );
      }
      hasJoined.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, userId, lessonId]);

  // ── Mic toggle ──────────────────────────────────────────────────────

  const toggleMute = useCallback(async () => {
    if (!call) return;
    try {
      await call.microphone.toggle();
    } catch (err) {
      console.error("useAudioCall toggleMute error:", err);
    }
  }, [call]);

  // ── End call ────────────────────────────────────────────────────────

  const endCall = useCallback(async () => {
    if (!call || call.state.callingState === CallingState.LEFT) return;
    try {
      await call.leave();
      setStatus("ended");
      hasJoined.current = false;
    } catch (err) {
      console.error("useAudioCall endCall error:", err);
    }
  }, [call]);

  // ── Retry ───────────────────────────────────────────────────────────

  const retry = useCallback(() => {
    hasJoined.current = false;
    setError(null);
    setStatus("idle");
    bootstrap();
  }, [bootstrap]);

  return {
    call,
    status,
    error,
    isMuted,
    toggleMute,
    endCall,
    retry,
  };
}
