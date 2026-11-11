import Reveal from "../components/Reveal";
import { invitation } from "../config";

export default function InviteMessage() {
  const { blessings } = invitation;

  return (
    <section
      id="main-invitation"
      className="paper-section relative overflow-hidden px-6 py-28 sm:py-36"
    >
      <img
        src={invitation.assets.foregroundWaves}
        alt=""
        className="pointer-events-none absolute bottom-[-4%] right-[-6%] w-[78%] max-w-4xl opacity-[0.08] mix-blend-multiply"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Divine Grace Header */}
        <Reveal>
          <div className="mx-auto flex flex-col items-center gap-2">
            <span className="font-display text-sm tracking-[0.32em] text-gold">
              {invitation.celebration.divineGraceHindi}
            </span>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink/65">
              {blessings.subheading}
            </p>
            <div className="my-2 h-px w-20 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </div>
        </Reveal>

        {/* Baba & Dadi Blessings Card */}
        <Reveal delay={0.08} className="mt-8">
          <div className="mx-auto max-w-2xl rounded-sm border border-gold/35 bg-white/40 px-6 py-5 backdrop-blur-xs">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              With the divine grace of {invitation.celebration.divineGrace}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink/60">
              & the cherished blessings of our beloved Baba &amp; Dadi
            </p>
            <p className="font-display mt-2 text-2xl font-medium tracking-wide text-ink sm:text-3xl">
              {blessings.grandparents}
            </p>
          </div>
        </Reveal>

        {/* Parents Invitation */}
        <Reveal delay={0.16} className="mt-10">
          <p className="font-display text-lg italic text-ink/75 sm:text-xl">
            {blessings.parentsIntro}
          </p>
          <h3 className="font-display mt-1 text-3xl font-medium tracking-wide text-ink sm:text-4xl">
            {blessings.parents}
          </h3>
          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-gold">
            {blessings.invitationLead}
          </p>
        </Reveal>

        {/* The Couple Lockup */}
        <Reveal delay={0.24} className="mt-8">
          <div className="inline-block border-y border-gold/40 py-6 px-10">
            <h2 className="font-display text-5xl font-medium tracking-tight text-ink sm:text-7xl">
              {invitation.celebration.groom} <span className="font-script text-4xl text-gold sm:text-5xl">&amp;</span> {invitation.celebration.bride}
            </h2>
            <p className="font-display mt-2 text-xl italic tracking-wide text-gold sm:text-2xl">
              {blessings.tagline}
            </p>
          </div>
        </Reveal>

        {/* Heartfelt Note */}
        <Reveal delay={0.32} className="mt-10 mx-auto max-w-2xl">
          <p className="text-sm sm:text-base leading-relaxed text-ink/75 font-light">
            {blessings.note}
          </p>
          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gold/40" />
            <span className="text-xs text-gold">✦</span>
            <span className="h-px w-12 bg-gold/40" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
