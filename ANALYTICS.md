# Google Analytics 4 (GA4) Implementation Guide

This project uses a custom-built `AnalyticsService` to handle Google Analytics 4 tracking. The implementation follows expert-level standards to provide high-quality business insights without the need for Google Tag Manager.

## Quick Technical Overview

- **Measurement ID:** `G-5RT7VZETN8`
- **Core Abstraction:** `src/services/analytics-service.ts`
- **Localhost Safety:** Tracking is automatically disabled on `localhost` and `127.0.0.1` via a check in `index.html`.

## Key Business Metrics Tracked

### 1. Main Conversions (`generate_lead`)
- **Action:** Clicking the "Reservar por WhatsApp" button.
- **Data Captured:** Total price of selection, number of nights, and item details.
- **Purpose:** Measures direct ROI and lead quality based on price points.

### 2. High-Intent Interactions (`select_content`)
- **Date Selections:** Tracked every time a user picks a valid range to see the price.
- **Map Interaction:** Tracked when users click the map or the address to view the location in Google Maps.
- **Content Expansion:** Tracked when users click "Read more" about the place or "Show all" for amenities.
- **Language Switch:** Tracked to understand visitor market demographics.

### 3. Visual Engagement (`view_item_list`)
- **Action:** Opening the photo gallery.
- **Purpose:** Validates the effectiveness of search-result photos and hero images.

### 4. Friction & Lost Sales (`exception`)
- **Action:** Triggers when the calendar shows an error (Occupied, Min Nights restriction, etc.).
- **Purpose:** Identifies where your policies or lack of availability are driving customers away.

### 5. Standard Page Visibility (`view_item`)
- **Action:** Dispatched on initial load of the application.
- **Purpose:** Provides a standard baseline for engagement.

## How to manage as an AI / Developer

### To disable tracking:
Go to `src/services/analytics-service.ts` and comment out the logic inside the `trackEvent` method.

### To add more tracking:
1. Create a new static method in `AnalyticsService`.
2. Use standard GA4 event names whenever possible (`view_item`, `select_item`, etc.).
3. Call the method from the relevant UI component.

---
*Last updated: March 2026*
