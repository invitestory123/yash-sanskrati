import { Building2, Calendar, FileText, MapPin, Navigation } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
import { hotelMapsDirectionsUrl, invitation } from "../config";

export default function HospitalityStay() {
  const { stay } = invitation;

  return (
    <section className="night-section relative overflow-hidden px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,195,115,.12),transparent_55%)]" />

      <SectionHeading
        kicker={stay.kicker}
        title={stay.title}
      />

      <div className="mx-auto -mt-6 max-w-2xl text-center mb-14">
        <Reveal delay={0.05}>
          <p className="font-display text-xl sm:text-2xl italic leading-relaxed text-pearl/85">
            "{stay.subtitle}"
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {/* Hotel Accommodation Card */}
        <Reveal delay={0.1}>
          <div className="h-full rounded-sm border border-champagne/30 bg-ink/70 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-champagne/20 pb-4">
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-champagne">
                  <Building2 size={16} /> Accommodations
                </span>
                <span className="rounded-full bg-champagne/15 px-3 py-1 text-[10px] uppercase tracking-widest text-champagne">
                  Curated Stay
                </span>
              </div>

              <h3 className="font-display mt-6 text-3xl sm:text-4xl font-medium text-pearl">
                {stay.hotelName}
              </h3>

              <div className="mt-4 space-y-2 text-sm text-pearl/75">
                <p className="flex items-center gap-2">
                  <MapPin size={14} className="text-champagne shrink-0" />
                  <span>{stay.hotelCity}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar size={14} className="text-champagne shrink-0" />
                  <span className="font-medium text-champagne">{stay.dates}</span>
                </p>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-pearl/60">
                A warm sanctuary arranged for your comfort in Doha, ensuring you are relaxed and ready to celebrate with us.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-champagne/15">
              <a
                href={hotelMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-link inline-flex items-center gap-2"
              >
                <Navigation size={13} /> View Hotel on Google Maps
              </a>
            </div>
          </div>
        </Reveal>

        {/* Visa & Travel Card */}
        <Reveal delay={0.18}>
          <div className="h-full rounded-sm border border-champagne/30 bg-ink/70 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-champagne/20 pb-4">
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-champagne">
                  <FileText size={16} /> Travel &amp; Visas
                </span>
                <span className="rounded-full bg-champagne/15 px-3 py-1 text-[10px] uppercase tracking-widest text-champagne">
                  Important Info
                </span>
              </div>

              <h3 className="font-display mt-6 text-2xl sm:text-3xl font-medium text-pearl">
                {stay.visaTitle}
              </h3>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-pearl/80 font-light">
                {stay.visaNote}
              </p>

              <div className="mt-6 rounded border border-champagne/20 bg-champagne/5 p-4 text-xs text-pearl/70 space-y-1.5">
                <p className="font-medium text-champagne uppercase tracking-wider text-[11px]">
                  Checklist for Family Contact:
                </p>
                <p>• Clear color copy of your valid Passport</p>
                <p>• White-background passport-size photograph (JPG)</p>
              </div>
            </div>

            <p className="mt-8 pt-4 border-t border-champagne/15 text-[11px] text-pearl/50 uppercase tracking-widest">
              Please share directly with designated family contacts
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

