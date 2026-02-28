# Alquiler Torremolinos SPA

Welcome to the frontend real estate application for **Alquiler Torremolinos**. This is a fast, responsive, Single Page Application (SPA) designed to serve as an informational landing page and booking directory for a tourist rental property. 

## Tech Stack
- **Vite**: Ultra-fast build tool and development server.
- **LitElement**: Lightweight Web Components library for UI development.
- **TypeScript**: Static typing for robust code architecture.
- **Bootstrap 5 & Icons**: Complete UI framework utilizing standard grid layout and utility classes.
- **Vercel**: Deployment-ready with optimized SPA routing configurations (`vercel.json`).

---

## SOLID Principles & Architecture

To ensure the codebase naturally scales and remains easy to extend, the project is structured following SOLID design principles, particularly prioritizing **Single Responsibility (SRP)** and **Dependency Inversion (DIP)**.

### Component Structure
The UI logic has been stripped of direct data access. We enforce a **Smart/Dumb component pattern**:

- **`my-app.ts` (Smart Layout Component)**: This is the orchestrator. It fetches or imports the data source and distributes it to child components via attributes. 
- **`image-carousel.ts` (Dumb Presentation Component)**: Strictly handles iterating over a provided `images` array and rendering the Bootstrap Carousel. It knows nothing about properties or API endpoints.
- **`property-details.ts` (Dumb Presentation Component)**: Strictly handles rendering titles, descriptions, host data, and amenities based on a provided `PropertyData` object.
- **`availability-calendar.ts` (Dumb Presentation Component)**: Responsible for the informational display of bookings and receives the `whatsappNumber` and `paypalLink` from the parent.

### Data
- **`src/data/mock-data.ts`**: Simulates an API response or Data Layer. Currently holds the hardcoded structure `PropertyData`, which makes it incredibly simple to swap to an actual API `fetch()` inside `my-app.ts` in the future without modifying *any* presentation components.

---

## Important Commands

- `npm install` - Installs dependencies
- `npm run dev` - Starts the local development server at `http://localhost:5173`
- `npm run build` - Builds for production. The output will be inside the `dist` folder.
- `npm run preview` - Locally preview the production build.

## To Do / Next Steps
1. Insert the real property description in `src/data/mock-data.ts`.
2. Connect actual Google Calendar Embed/API details to `src/components/availability-calendar.ts`.
3. Fill in the real WhatsApp number and PayPal links in `src/my-app.ts`.
