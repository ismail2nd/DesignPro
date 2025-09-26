# DesignPro

# Canva-like Editor README — Prompts 1–12 (Start at Prompt 1)

> This document is organized so you can copy each prompt into Copilot/Augment to scaffold features step-by-step. Start with **Prompt 1 (Home Page)** to set up the entry screen.

## Prompt 1 — Home Page (Entry Screen)

```reate a Home Page (entry screen) for a Canva-like web app. The Home Page loads before the dashboard/page editor and highlights templates, testimonials, and quick access to core features.

Requirements:
- Topbar/Header with:
  - Brand logo (left)
  - Auto-Design dropdown (categories: Sticker, Receipt, Invoice, Letter Head, Exercise Book, Calendar, Flyer, Flex/Banner, Jotter, Branding, Table Calendar, Roll-up Stand, Business Card, Tag, Magazine, Journal, Book, Register/Diary, Forms, Clock Design, Label, Cloth, Status Design)
  - Page Editor link
  - Token balance indicator
  - Search bar
  - Profile dropdown
  - Notification bell

- Left Sidebar (persistent):
  - Profile
  - Scheduling (note: backend not required now)
  - Templates
  - Mockup
  - Video
  - Help (Subscription, Suggest Feature, Help Center, Rate App)
  - Legal (Contact Support, Terms, Privacy, Privacy Settings)
  - Logout button at bottom

- Body:
  - Featured Template grid (click opens Auto-Design or Editor). Include "See more" link.
  - Customer testimonials slider/grid

- Footer:
  - FAQ, About, Template Quick Links, Social buttons (Facebook, Twitter, WhatsApp, Instagram)

Acceptance Criteria:
- Home Page loads before dashboard/editor.
- Header has all required controls.
- Sidebar exists and contains listed items.
- Body shows template grid + testimonials.
- Footer shows FAQ/About/Links.
- Clicking template or Auto-Design routes to input pages.
```

---

## Prompt 2 — Dashboard + UI Layout

```
Scaffold a Dashboard UI with Topbar, LeftSidebar, RightSidebar, and Center Canvas placeholder.
- Topbar: logo, Auto Design dropdown, Undo/Redo, Dark Mode toggle.
- LeftSidebar: Templates, Backgrounds, Uploads, Text, Elements, BG Remover.
- RightSidebar: Pages (thumbnails) + Layers.
- Center: Canvas placeholder for later Fabric/Konva integration.

File layout:
- frontend/src/pages/Dashboard.vue
- frontend/src/components/Topbar.vue
- frontend/src/components/LeftSidebar.vue
- frontend/src/components/RightSidebar.vue
```

---

## Prompt 3 — Text & Image Property Popups

```
Create floating property toolbars that appear when selecting text or images.
- Text toolbar: bold, italic, underline, strikethrough, font dropdown, font-size +/- buttons, color pickers, alignment, text transform, line-height, letter-spacing, shadow.
- Image toolbar: replace, crop, resize (W/H + lock), rotate, flip, opacity, filters, BG remover toggle, layer controls.
- Use Vue state (Pinia) to track selected element.
- Bind controls to Fabric.js/Konva actions.
```

---

## Prompt 4 — Canvas Interactivity Basics

```
Implement Fabric.js (or Konva) canvas interactions:
- Add, select, move, resize, rotate, delete elements.
- Drag & drop from sidebar items.
- Snap-to-grid and alignment guides.
- Layer z-order maintained with bring-to-front / send-to-back.
- Keyboard delete support.
```

---

## Prompt 5 — Right Sidebar (Pages + Layers Management)

```
Build the Right Sidebar UI for pages and layers management.
- Pages panel: thumbnail list, duplicate, delete, reorder, +Add Page.
- Layers panel: list of objects, reorder by drag, visibility toggle, lock/unlock, rename.
- Tabs for Pages and Layers.
- Integration ready for canvas state.
```

---

## Prompt 6 — Left Sidebar (Templates, Elements, Text, Background, Uploads, Tools, QR, Brand)

```
Create an expandable left sidebar with sections: Templates, Elements, Text, Backgrounds, Uploads, Tools (BG remover, filters), QR Code generator, Brand Kit.
- Each section opens a scrollable panel.
- Templates: categories + search.
- Uploads: grid thumbnails, drag & drop.
- Backgrounds: solid/gradient/pattern/upload/online search (Unsplash/Pexels).
```

---

## Prompt 7 — Upload & Asset Manager

```
Implement an Upload Manager:
- Accept PNG, JPG, SVG.
- Gallery view with preview cards (Tailwind).
- Drag & drop uploads to canvas.
- Asset actions: delete, duplicate, rename.
- Persist temporarily to localStorage; later swap to Firebase/S3.
```

---

## Prompt 8 — Elements & Shapes Library

```
Add shapes and icons library:
- Basic shapes (rect, circle, triangle, line).
- Icon set (Heroicons / Lucide) with searchable list.
- Drag to canvas; shapes are editable (color, border, size, rotation).
```

---

## Prompt 9 — My Gallery (User Projects)

```
Create a "My Gallery" area:
- Save projects (localStorage first).
- Show thumbnails, Open, Duplicate, Delete.
- New Design button for starting fresh.

## Prompt 10 — Templates System

Templates tab with 3–5 starter templates.
- Grid view with preview.
- Click to load template into canvas.
- Templates fully editable.

## Prompt 11 — Toolbar Controls

```
Create a canvas toolbar:
- Undo, Redo, Zoom In, Zoom Out, Align controls, Download (PNG/JPEG), Fullscreen.
- Fixed above canvas.

## Prompt 12 — Export & Share

```
Add export/share features:
- Export PNG, JPEG, PDF.
- Copy shareable link (placeholder if no backend).
- Confirm modal prior to export.
```

