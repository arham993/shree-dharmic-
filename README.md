# Shree Dharmic Leela Committee — Membership Portal (UI)

One-page Next.js site: hero, about, a YouTube video carousel, and a 4-step
membership flow (details → OTP → plan → payment → membership ID).

## Run
    npm install
    npm run dev        # http://localhost:3000

## Edit
- `lib/site.ts` — committee name, contact details, membership plans & prices, videos
- `lib/validation.ts` — form rules (mobile, email, Aadhaar checksum, states list)
- `components/Art.tsx` — SVG artwork (rath, temple skyline, toran, diya, emblem)
- `app/globals.css` — colours (CSS variables at the top) and animations

## Adding videos
Add a line to `VIDEOS` in `lib/site.ts` with any YouTube link (Shorts, youtu.be
or watch?v=). The `title` is optional and is shown on the card:

    { url: "https://youtube.com/shorts/xxxxxxxxxxx", title: "Rajtilak on Dussehra night" },

Shorts get tall cards, other videos wide ones. The YouTube player only loads
when a video is tapped, using the privacy-enhanced youtube-nocookie.com embed.

## Demo mode
OTP is `123456`; payment is simulated. Backend hooks are marked `TODO` in
`components/MembershipFlow.tsx` (SMS OTP, Razorpay order + webhook, member ID).
