import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useReducer, useRef, useState } from "react";
import { invitation } from "../config";
import { introReducer } from "../lib/introMachine";

type Props = {
  onOpened: () => void;
};

export default function IntroJourney({ onOpened }: Props) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [state, dispatch] = useReducer(introReducer, { stage: "landing" });
  const isLocked = state.stage !== "open";

  useEffect(() => {
    if (state.stage === "open") onOpened();
  }, [onOpened, state.stage]);

  useEffect(() => {
    if (state.stage !== "revealing") return;
    const id = window.setTimeout(
      () => dispatch({ type: "REVEAL_FINISHED" }),
      1150,
    );
    return () => window.clearTimeout(id);
  }, [state.stage]);

  useEffect(() => {
    if (state.stage !== "playing") return;
    const id = window.setTimeout(
      () => dispatch({ type: "VIDEO_FAILED", reason: "timeout" }),
      invitation.intro.videoTimeoutMs,
    );
    return () => window.clearTimeout(id);
  }, [state.stage]);

  useEffect(() => {
    if (state.stage !== "playing") videoRef.current?.pause();
  }, [state.stage]);

  useEffect(() => {
    if (!isLocked) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [isLocked]);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) {
      dispatch({ type: "VIDEO_FAILED", reason: "unavailable" });
      return;
    }

    video.muted = muted;
    video.currentTime = 0;
    video.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      dispatch({ type: "VIDEO_FAILED", reason: "playback" });
    });
  };

  const begin = () => {
    if (reduceMotion) {
      dispatch({ type: "SKIP_MOTION" });
      return;
    }
    if (!invitation.intro.videoEnabled) {
      dispatch({ type: "BEGIN_WITHOUT_VIDEO" });
      return;
    }

    dispatch({ type: "BEGIN" });
    playVideo();
  };

  const replay = () => {
    videoRef.current?.pause();
    dispatch({ type: "REPLAY" });
    playVideo();
  };

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  return (
    <AnimatePresence>
      {state.stage !== "open" && (
        <motion.section
          className="fixed inset-0 z-40 isolate overflow-hidden bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Yash & Sanskrati engagement celebration opening"
          role="dialog"
          aria-modal="true"
        >
          <motion.img
            src={invitation.assets.introPoster}
            alt="Yash & Sanskrati celebration at Lusail Marina beneath Katara Towers"
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduceMotion ? false : { scale: 1.04 }}
            animate={reduceMotion ? undefined : { scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,rgba(245,195,115,.28),transparent_65%),linear-gradient(180deg,rgba(6,17,36,.36),rgba(6,17,36,.12)_38%,rgba(6,17,36,.92))]" />

          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              state.stage === "playing" ? "opacity-100" : "opacity-0"
            }`}
            src={
              invitation.intro.videoEnabled
                ? invitation.assets.introVideo
                : undefined
            }
            poster={invitation.assets.introPoster}
            playsInline
            muted={muted}
            preload={invitation.intro.videoEnabled ? "auto" : "none"}
            onEnded={() => dispatch({ type: "VIDEO_ENDED" })}
            onError={() =>
              dispatch({ type: "VIDEO_FAILED", reason: "unavailable" })
            }
          />

          {(state.stage === "awaitTap" || state.stage === "revealing") && (
            <motion.img
              src={invitation.assets.introEnd}
              alt="Illuminated Katara Towers crescent arch at Lusail Marina"
              className="absolute inset-0 h-full w-full object-cover"
              initial={reduceMotion ? false : { opacity: 0, scale: 1.07 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            />
          )}

          <img
            src={invitation.assets.frame}
            alt=""
            className="pointer-events-none absolute inset-2 z-20 h-[calc(100%-1rem)] w-[calc(100%-1rem)] object-fill opacity-85 sm:inset-4 sm:h-[calc(100%-2rem)] sm:w-[calc(100%-2rem)]"
          />

          {state.stage === "landing" && (
            <motion.div
              className="absolute inset-x-0 bottom-[6vh] z-30 mx-auto flex max-w-lg flex-col items-center px-8 text-center text-pearl [text-shadow:0_2px_20px_rgba(6,17,36,.95)]"
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="eyebrow">
                {invitation.intro.eyebrow}
              </p>
              <h1 className="font-display mt-3 max-w-md text-[3rem] font-medium leading-[.92] tracking-[-.035em] sm:text-6xl">
                {invitation.intro.title}
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-pearl/85">
                {invitation.intro.body}
              </p>
              <button
                type="button"
                onClick={begin}
                className="journey-button mt-7"
              >
                <span>{invitation.intro.beginLabel}</span>
                <span className="journey-button__mark" aria-hidden>
                  ✦
                </span>
              </button>
            </motion.div>
          )}

          {state.stage === "playing" && (
            <div className="absolute inset-x-0 bottom-8 z-30 flex items-center justify-center gap-2">
              <span className="rounded-full bg-ink/60 px-4 py-2 text-[9px] uppercase tracking-[0.3em] text-pearl/75 backdrop-blur-md">
                {invitation.intro.playingLabel}
              </span>
              <button
                type="button"
                onClick={toggleSound}
                className="rounded-full border border-champagne/30 bg-ink/60 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-pearl/75 backdrop-blur-md"
              >
                {muted ? "Sound off" : "Sound on"}
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: "VIDEO_ENDED" })}
                className="rounded-full border border-champagne/30 bg-ink/60 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-pearl/75 backdrop-blur-md"
              >
                Skip
              </button>
            </div>
          )}

          {state.stage === "awaitTap" && (
            <motion.div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center pt-[16vh] text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <button
                type="button"
                onClick={() => dispatch({ type: "ENTER" })}
                className="tap-ripple"
                aria-label={invitation.intro.enterLabel}
              >
                <span className="tap-ripple__ring" />
                <span className="tap-ripple__ring tap-ripple__ring--delayed" />
                <span className="tap-ripple__core">✦</span>
              </button>
              <p className="mt-5 rounded-full border border-champagne/25 bg-ink/60 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-pearl/85 backdrop-blur-md">
                {invitation.intro.tapHint}
              </p>
              {state.videoError && state.videoError !== "not-configured" && (
                <p className="sr-only" aria-live="polite">
                  The opening film was unavailable. Continue with the still
                  invitation.
                </p>
              )}
              {invitation.intro.videoEnabled && (
                <button
                  type="button"
                  onClick={replay}
                  className="mt-3 text-[9px] uppercase tracking-[0.22em] text-pearl/65 underline decoration-champagne/40 underline-offset-4"
                >
                  Replay opening film
                </button>
              )}
            </motion.div>
          )}

          {state.stage === "revealing" && (
            <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
              <motion.div
                className="absolute inset-0 origin-left bg-ink/95"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-champagne/10 via-champagne/45 to-pearl/25"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.9, 0] }}
                transition={{ duration: 1.05, times: [0, 0.45, 1] }}
              />
              <motion.img
                src={invitation.assets.foregroundWaves}
                alt=""
                className="absolute bottom-[-2%] left-1/2 w-[140%] max-w-none"
                style={{ x: "-50%" }}
                initial={{ y: "72%", scale: 0.9, opacity: 0 }}
                animate={{ y: "-6%", scale: 1.15, opacity: [0, 1, 0] }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
