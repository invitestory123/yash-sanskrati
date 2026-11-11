import { Anchor, CalendarPlus, Clock, Navigation } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
import {
  invitation,
  googleCalendarUrl,
  downloadICS,
  mapsDirectionsUrl,
} from "../config";

export default function Venue() {
  return (
    <section className="night-section relative overflow-hidden px-6 py-28 sm:py-36">
      <SectionHeading
        kicker="Embarkation Port"
        title="Meet us at Lusail Marina"
      />

      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[.82fr_1.18fr] md:items-end">
        <Reveal className="flex flex-col items-start gap-3 text-left md:pb-4">
          <p className="section-kicker">{invitation.venue.regionLabel}</p>
          <h3 className="font-display text-4xl leading-[0.98] text-pearl sm:text-5xl">
            {invitation.venue.name}
          </h3>
          <p className="max-w-xs text-[13px] leading-relaxed text-pearl/70">
            {invitation.venue.address}
          </p>

          <div className="mt-2 space-y-1.5 text-xs text-champagne/90">
            <p className="flex items-center gap-2">
              <Anchor size={14} className="shrink-0 text-champagne" />
              <span className="font-medium">{invitation.venue.vessel} · VIP Mooring</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock size={14} className="shrink-0 text-champagne" />
              <span>{invitation.timeLabel}</span>
            </p>
          </div>

          <p className="font-display mt-2 text-lg tracking-wide text-champagne font-medium">
            {invitation.dateLabel}
          </p>

          <div className="mt-5 flex flex-wrap gap-5">
            <a
              href={googleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="text-link flex items-center gap-2"
            >
              <CalendarPlus size={13} /> Add to Calendar
            </a>
            <button type="button" onClick={downloadICS} className="text-link">
              Download .ics
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative flex h-[26rem] items-end overflow-hidden border border-champagne/25 shadow-[0_28px_80px_rgba(0,0,0,0.48)]"
            aria-label={`Open directions to ${invitation.venue.name}`}
          >
            <img
              src={invitation.assets.promenade}
              alt="Lusail Marina Promenade waterfront at sunset with date palms, yachts, and Katara Towers"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="relative flex w-full items-end justify-between gap-4 p-6">
              <div>
                <p className="mb-1.5 text-[10px] uppercase tracking-[0.22em] text-champagne">
                  {invitation.venue.routeSummary}
                </p>
                <p className="font-display text-2xl text-pearl font-medium">
                  {invitation.venue.landmark}
                </p>
                <p className="mt-1 text-xs text-pearl/70">
                  {invitation.venue.directionHint}
                </p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center border border-champagne/35 bg-ink/75 text-champagne backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1">
                <Navigation size={16} />
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
