import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal, { SectionHeading } from "../components/Reveal";
import { invitation } from "../config";

export default function YachtShowcase() {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const copyHashtag = async () => {
    try {
      await navigator.clipboard.writeText(invitation.celebration.hashtag);
      setCopied(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access is optional.
    }
  };

  return (
    <section className="night-section relative overflow-hidden px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,195,115,.14),transparent_60%)]" />

      <SectionHeading
        kicker={invitation.yachtExperience.kicker}
        title={invitation.yachtExperience.title}
      />

      <div className="mx-auto -mt-6 max-w-3xl text-center mb-16">
        <Reveal delay={0.05}>
          <p className="font-display text-xl sm:text-2xl italic leading-relaxed text-pearl/90">
            "{invitation.yachtExperience.lead}"
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_1.3fr_1fr]">
        <Reveal className="order-2 text-center md:order-1 md:text-right">
          <p className="section-kicker">{invitation.yachtExperience.leftLabel}</p>
          <h3 className="font-display mt-2 text-4xl text-pearl">
            {invitation.yachtExperience.leftTitle}
          </h3>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-pearl/70 md:ml-auto md:mr-0">
            {invitation.yachtExperience.leftDetail}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="order-1 md:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs sm:max-w-sm">
            <motion.div
              className="absolute inset-[10%] rounded-full bg-champagne/18 blur-3xl"
              animate={
                reduceMotion ? undefined : { opacity: [0.6, 0.95, 0.6], scale: [0.96, 1.05, 0.96] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src={invitation.assets.yachtCrest}
              alt="Yacht Wave and Katara Towers celebration crest"
              className="relative h-full w-full object-contain drop-shadow-[0_28px_55px_rgba(0,0,0,.55)]"
              loading="lazy"
              decoding="async"
              animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </Reveal>

        <Reveal delay={0.16} className="order-3 text-center md:text-left">
          <p className="section-kicker">{invitation.yachtExperience.rightLabel}</p>
          <h3 className="font-display mt-2 text-4xl text-pearl">
            {invitation.yachtExperience.rightTitle}
          </h3>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-pearl/70 md:ml-0 md:mr-auto">
            {invitation.yachtExperience.rightDetail}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={copyHashtag}
          className="text-link"
        >
          {copied ? "Copied to clipboard" : invitation.celebration.hashtag}
        </button>
      </Reveal>
    </section>
  );
}
