# `@alquiler/web` — Alquiler Torremolinos Public Website

Public Single Page Application (SPA) for **Alquiler Torremolinos** (`alquilertorremolinos.es`), providing property details, multilingual content (9 languages), live Google Calendar + Booking.com iCal availability, and direct WhatsApp booking inquiries.

---

## Tech Stack

- **Vite 7**: Build tool and local development server.
- **Lit 3 (`LitElement`)**: Lightweight Web Components UI layer.
- **TypeScript**: Strict static typing.
- **Bootstrap 5 & Bootstrap Icons**: Responsive layout and UI utilities.
- **Vercel**: Production static deployment (`apps/web/dist`).

---

## Architecture

The app follows a **Smart/Dumb component pattern**:

- **`src/my-app.ts`**: Root layout orchestrator.
- **`src/components/`**: Modular presentation components (`image-carousel`, `property-header`, `property-details`, `property-amenities`, `property-map`, `host-profile`, `about-place`, `language-selector`, `availability-calendar`, `calendar/calendar-view`, `app-footer`).
- **`src/services/`**:
  - `calendar-service.ts`: Fetches occupied dates from Google Calendar + imported Booking.com iCal calendar.
  - `pricing-service.ts`: Internal seasonal pricing and dynamic minimum-stay rules (currently hidden in the UI; used for minimum nights and analytics).
  - `translation-service.ts` & `languages/`: 9-language i18n (`es`, `en`, `de`, `fr`, `it`, `nl`, `pt`, `sv`, `zh`).
  - `analytics-service.ts` & `share-service.ts`: GA4 event tracking and Web Share API helper.
- **`src/config/`**: Contact obfuscation (`contact-config.ts`) and seasonal pricing/minimum-stay config (`pricing-config.ts`).
- **`src/data/mock-data.ts`**: Static property content and gallery image list.

---

## Commands

Run from the **monorepo root** or inside `apps/web`:

```bash
# Start local dev server (http://localhost:5173)
npm run dev --workspace=@alquiler/web

# Typecheck and build production bundle to apps/web/dist
npm run build --workspace=@alquiler/web

# Preview production build locally
npm run preview --workspace=@alquiler/web

# Validate translation keys and types across all 9 languages
npm run test:i18n --workspace=@alquiler/web
```

---

## Environment Variables

Copy `.env.example` to `.env` inside `apps/web/` if overriding local Vite environment variables:

```env
VITE_GOOGLE_API_KEY=your_api_key_here
VITE_GOOGLE_CALENDAR_ID=your_calendar_id_here
```

*(Never commit `.env` to Git.)*
