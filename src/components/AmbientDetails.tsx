import { motion, useReducedMotion } from "framer-motion";

const SPARKLES = [
  { id: 0, left: "12%", size: 10, duration: 15, delay: 0, driftX: 28, type: "star" },
  { id: 1, left: "26%", size: 5, duration: 18, delay: 3, driftX: -22, type: "pearl" },
  { id: 2, left: "48%", size: 8, duration: 20, delay: 1.5, driftX: 18, type: "star" },
  { id: 3, left: "67%", size: 6, duration: 16, delay: 4.5, driftX: -30, type: "pearl" },
  { id: 4, left: "82%", size: 11, duration: 19, delay: 2, driftX: -20, type: "star" },
  { id: 5, left: "91%", size: 4, duration: 14, delay: 5.5, driftX: 14, type: "pearl" },
] as const;

export default function AmbientDetails() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden
    >
      {SPARKLES.map((item) => (
        <motion.div
          key={item.id}
          className="absolute bottom-[-8vh]"
          style={{ left: item.left }}
          animate={{
            y: ["0vh", "-118vh"],
            x: [0, item.driftX, -item.driftX * 0.4],
            opacity: [0, 0.55, 0.35, 0],
            rotate: item.type === "star" ? [0, 45, 90] : [0, 0, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {item.type === "star" ? (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill="none"
              className="text-champagne drop-shadow-[0_0_6px_rgba(228,202,150,0.65)]"
            >
              <path
                d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <span
              className="block rounded-full bg-pearl/75 shadow-[0_0_8px_rgba(244,239,228,0.6)]"
              style={{ width: item.size, height: item.size }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
