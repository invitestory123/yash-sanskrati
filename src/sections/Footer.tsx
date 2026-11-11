import Reveal from "../components/Reveal";
import { invitation } from "../config";

export default function Footer() {
  const { closing } = invitation;

  return (
    <footer className="relative flex min-h-[85svh] flex-col justify-end overflow-hidden border-t border-champagne/15 bg-ink">
      <img
        src={invitation.assets.environment}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/40" />
      <img
        src={invitation.assets.foregroundWaves}
        alt=""
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] mx-auto w-full min-w-[760px] max-w-none opacity-45"
        loading="lazy"
        decoding="async"
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-72 bg-[radial-gradient(ellipse_at_bottom,rgba(6,17,36,0.85)_0%,rgba(6,17,36,0.5)_48%,transparent_75%)]"
        aria-hidden
      />

      <div className="pointer-events-none relative z-[4] -mb-4 flex select-none justify-center overflow-hidden">
        <span className="font-display whitespace-nowrap text-[9vw] font-medium uppercase leading-none tracking-[-.04em] text-champagne/12 sm:text-[6.5vw]">
          {invitation.footer.watermark}
        </span>
      </div>

      <Reveal className="relative z-10 mx-auto mb-20 mt-6 flex max-w-xl flex-col items-center gap-5 px-6 text-center">
        <p className="font-display text-2xl sm:text-3xl italic leading-relaxed text-champagne">
          "{closing.quote}"
        </p>

        <p className="max-w-md text-xs sm:text-sm leading-relaxed text-pearl/80 font-light">
          {closing.presence}
        </p>

        <div className="my-1 flex items-center gap-3">
          <span className="h-px w-12 bg-champagne/40" />
          <span className="text-xs text-champagne">✦</span>
          <span className="h-px w-12 bg-champagne/40" />
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-pearl/60">
            {closing.signoff}
          </p>
          <p className="font-display mt-1 text-3xl font-medium tracking-wide text-pearl sm:text-4xl">
            {closing.family}
          </p>
        </div>

        {/* RSVP Card */}
        <div className="mt-4 rounded-sm border border-champagne/35 bg-ink/75 px-8 py-4 backdrop-blur-md">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-champagne">
            {closing.rsvpLabel}
          </p>
          <p className="font-display mt-1 text-xl sm:text-2xl font-medium tracking-wide text-pearl">
            {closing.rsvpName}
          </p>
        </div>

        <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-champagne/60">
          {invitation.celebration.monogram} · Doha, Qatar · 2027
        </p>
      </Reveal>
    </footer>
  );
}
