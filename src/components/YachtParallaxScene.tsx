import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { invitation } from "../config";

const HORIZON_STARS = [
  { top: "12%", left: "18%", delay: 0.2, size: 2.5 },
  { top: "20%", left: "34%", delay: 1.4, size: 2 },
  { top: "9%", left: "58%", delay: 0.8, size: 3 },
  { top: "17%", left: "74%", delay: 2.1, size: 2 },
  { top: "26%", left: "86%", delay: 1.1, size: 2.5 },
];

export default function YachtParallaxScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 65, damping: 24 });
  const y = useSpring(pointerY, { stiffness: 65, damping: 24 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scrollLandscapeY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const scrollYachtX = useTransform(scrollYProgress, [0, 1], [0, -34]);

  const landscapeX = useTransform(x, (value) => value * 0.25);
  const landscapeY = useTransform([y, scrollLandscapeY], ([py, sy]: number[]) => py * 0.15 + sy);
  const subjectX = useTransform([x, scrollYachtX], ([px, sx]: number[]) => px * 0.7 + sx);
  const subjectY = useTransform(y, (value) => value * 0.45);

  const move = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 20);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 12);
  };

  return (
    <section
      ref={sectionRef}
      id="invitation"
      className="new-hero"
      onPointerMove={move}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <motion.img
        src={invitation.assets.environment}
        alt="Moonlit Doha West Bay skyline and Katara Towers across the Arabian Gulf"
        className="new-hero__landscape"
        style={{ x: landscapeX, y: landscapeY }}
      />
      <div className="new-hero__wash" />
      <div className="new-hero__grain" aria-hidden />

      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden>
          {HORIZON_STARS.map((star, idx) => (
            <motion.span
              key={idx}
              className="absolute rounded-full bg-champagne-light shadow-[0_0_8px_rgba(242,227,191,0.85)]"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
              }}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.85, 1.2, 0.85] }}
              transition={{
                duration: 3.6 + idx * 0.5,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          <motion.div
            className="absolute inset-x-0 top-[53%] h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent"
            animate={{ opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      <motion.div
        className="new-hero__copy"
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-champagne/60" />
          <p className="new-hero__eyebrow !mb-0">{invitation.celebration.concept}</p>
        </div>
        <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-pearl/70">
          {invitation.celebration.occasion}
        </p>
        <h1 className="new-hero__names mt-3">
          <span>{invitation.celebration.titleLine1}</span>
          <i>{invitation.celebration.connector}</i>
          <span className="text-champagne-foil">{invitation.celebration.titleLine2}</span>
        </h1>
        <p className="font-display mt-3 text-lg italic tracking-wide text-champagne/90">
          {invitation.celebration.tagline}
        </p>
        <div className="new-hero__details">
          <p>{invitation.dateLabel}</p>
          <span aria-hidden />
          <p>Boarding 2:00 PM</p>
          <p>{invitation.venue.vessel} · {invitation.venue.name}, Doha</p>
        </div>
      </motion.div>

      <motion.div
        className="new-hero__yacht-wrap"
        style={{ x: subjectX, y: subjectY }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.95, x: 32 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="new-hero__wake-glow" aria-hidden />
        <img
          src={invitation.assets.yacht}
          alt="Luxury white and champagne gold superyacht cruising Doha Bay"
          className="new-hero__yacht"
        />
      </motion.div>

      <div className="new-hero__index" aria-hidden>
        {invitation.shortDateIndex}
      </div>
      <a className="new-hero__scroll" href="#main-invitation">
        <span>Continue</span>
        <i aria-hidden />
      </a>
    </section>
  );
}
