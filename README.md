# Lusail Marina Yacht Soirée — Doha, Qatar

A luxury digital yacht party invitation tailored for Doha, Qatar and Lusail Marina Promenade, styled in warm ivory, deep midnight navy, and soft champagne gold accents.

## Dev

```bash
npm install
npm run dev
```

Opens on port `3024`.

## Customise Client Details

Edit `src/config.ts` (`invitation`) to update:

- Event title, eyebrow, host name(s), dress code, monogram, and hashtag (`invitation.celebration`)
- Event date, time, ISO timestamp for the countdown & calendar links (`invitation.dateISO`, `dateLabel`, `timeLabel`)
- Embarkation berth, Lusail Marina Promenade address, and Google Maps query (`invitation.venue`)
- Welcome greeting, Arabic welcome phrase, and host/dress-code notes (`invitation.verse`)
- Superyacht details and Doha coastal cruise highlights (`invitation.vessel`)
- Evening voyage itinerary milestones (`invitation.program`)
- Optional concierge / RSVP link (`invitation.footer.rsvpUrl`)

## Assets

Bespoke Doha & Lusail Marina artwork lives in `public/assets/doha/`:

- `intro-poster.webp` and `intro-end.webp` (Katara Towers & Lusail Marina two-tap gate)
- `ornamental-frame.png` (champagne-gold Arabesque compass & pearl border)
- `water-doha.webp` (Doha West Bay & Katara Towers skyline panorama)
- `marina-promenade.webp` (Lusail Marina Promenade venue showcase)
- `superyacht.png` (isolated luxury motor yacht foreground cutout)
- `yacht-crest.png` (Katara Towers & compass superyacht centerpiece)
- `skyline-watermark.png` (fine-line architectural engraving for Save the Date)
- `foreground-waves.png` (navy waves, palm fronds & pearl shell foreground motif)
- `social-card.webp` (1200×630 OpenGraph sharing card)
