# Changelog - Alquiler Torremolinos

## [2026-02-28] - Premium Booking Experience & Theming

### Added
- **Google Calendar Integration:** Created `CalendarService` to fetch availability from the Google Calendar API.
- **Dynamic Pricing:** Implemented logic to calculate daily prices based on seasonality (high/mid season) and weekend surcharges.
- **Premium Calendar Component:** Built `CalendarView` from scratch using Lit and CSS Grid, featuring an Airbnb-inspired aesthetic.
- **Brand Identity:** Integrated `logo.svg` into the navbar.
- **Modern Typography:** Added Google Font "Outfit" for a cleaner, more premium feel.
- **Environment Configuration:** Added `.env.example` to manage API keys and Calendar IDs.

### Changed
- **Airbnb-style Layout:** Updated `my-app.ts` with a more professional structure.
- **Theming System:** Refactored CSS to use CSS variables (`:root`) based on the colors extracted from `logo.svg` (#1D7874, #CE7D55, #003D4D).
- **Component Refactoring:** `AvailabilityCalendar` now uses the new `CalendarView` instead of static placeholders.

### Technical Improvements
- **Componentization:** All new UI elements are fully modular.
- **Global Theme Support:** The entire application's color scheme can now be changed by modifying a few variables in `index.css`.
