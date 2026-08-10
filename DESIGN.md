---
name: Saan Tayo?
description: A dark, doodled welcome world for starting a practical Metro Manila barkada decision.
colors:
  night-black: "#080B0C"
  warm-lettering: "#F7F6F1"
  location-yellow: "#FFC21C"
  location-yellow-pressed: "#E6A900"
  yellow-action-ink: "#101213"
  yellow-outline: "rgba(255, 194, 28, 0.58)"
  yellow-outline-pressed: "rgba(255, 194, 28, 0.82)"
typography:
  action-label:
    fontSize: "15px"
    fontWeight: 700
    lineHeight: "20px"
    letterSpacing: "0.1px"
rounded:
  action-capsule: "999px"
motion:
  welcome-brand-entry:
    duration: "2320ms from route focus until brand completion, then 240ms action reveal"
    reducedMotion: "180ms opacity-only fade"
spacing:
  action-unit: "14px"
  action-inline: "24px"
components:
  welcome-action-primary:
    backgroundColor: "{colors.location-yellow}"
    textColor: "{colors.yellow-action-ink}"
    typography: "{typography.action-label}"
    rounded: "{rounded.action-capsule}"
    padding: "14px 24px"
  welcome-action-primary-pressed:
    backgroundColor: "{colors.location-yellow-pressed}"
  welcome-action-secondary:
    backgroundColor: "rgba(8, 11, 12, 0.64)"
    textColor: "{colors.warm-lettering}"
    typography: "{typography.action-label}"
    rounded: "{rounded.action-capsule}"
    padding: "14px 24px"
  welcome-action-secondary-pressed:
    backgroundColor: "rgba(255, 194, 28, 0.08)"
---

# Design System: Saan Tayo?

## Overview

**Creative North Star: "The Barkada Night Map"**

The established Saan Tayo? world is a portrait welcome surface: a near-black illustrated field, warm white hand-lettering, and a single location-yellow accent turn the familiar barkada question into an immediate invitation. It feels friendly and local without presenting unverified venues, maps, or product claims.

The world is intentionally narrow. Only the welcome surface is visually implemented; onboarding, discovery, saved places, groups, profile, results, place details, and rooms remain empty route scaffolds. Future work may extend these visual ingredients deliberately, but this document does not imply that navigation, cards, inputs, lists, or content screens already have an established design.

**Key Characteristics:**

- Near-black, edge-to-edge atmosphere with a faint food-and-hangout doodle field.
- Warm white raster lettering with an integrated yellow location-pin accent.
- One authored opening beat: the original brush lettering writes on, the pin acquires location, and the question mark writes itself last.
- One filled yellow action and one quiet outlined action, both full-width capsules.
- Safe-area-aware, scroll-safe portrait composition that remains usable at larger text sizes.

## Colors

The palette is a compact night-and-neon scheme: near-black carries the field, warm off-white carries the mark and secondary label, and yellow is reserved for location identity and action.

### Primary

- **Location Yellow** (`colors.location-yellow`): The sole vivid accent, used by the pin inside the supplied logo, the primary action fill, and the secondary action outline.
- **Pressed Location Yellow** (`colors.location-yellow-pressed`): The immediate pressed fill and Android ripple color for the primary action.
- **Yellow Outline** (`colors.yellow-outline`): The restrained border around the secondary action; its stronger pressed companion is `colors.yellow-outline-pressed`.

### Neutral

- **Night Black** (`colors.night-black`): The edge-to-edge application and status-bar ground.
- **Warm Lettering** (`colors.warm-lettering`): The bright neutral used in the supplied brand mark and the secondary action label.
- **Yellow Action Ink** (`colors.yellow-action-ink`): The near-black label color that keeps the filled yellow action legible.

### Named Rules

**The One Yellow Rule.** Location Yellow carries the pin and the two action treatments; it is the sole accent in the established world.

## Typography

The expressive display lettering is not a font token. It is supplied as the transparent `saan-tayo-logo.png` raster asset, including the punctuation and location-pin construction.

The only implemented text role is the action label. React Native uses the native platform system face because no family is declared; the shared role is bold, compact, and centered (`typography.action-label`). Body, title, headline, and navigation roles are not yet established.

### Hierarchy

- **Action Label** (`typography.action-label`): Used by both welcome actions; sentence case, bold, and centered.

### Named Rules

**The Mark Is an Asset Rule.** Use the supplied logo asset for the Saan Tayo? lockup; do not approximate its lettering, punctuation, or integrated pin with a display font.

**The One-Question Motion Rule.** The welcome mark animates once on arrival: words first, location pin second, question mark last, actions only after completion. Do not loop it or scatter the same entrance across other controls.

## Layout

The welcome screen is an edge-to-edge portrait stage. A full-height scroll container grows to fill the viewport, while the content keeps a minimum height of 560 logical pixels so short phones can scroll rather than clip. The screen respects the top safe area and applies 38 logical pixels of horizontal gutter.

The logo sits in a flexible centered region at 80% width, capped at 304 logical pixels, with its shipped 873:704 aspect ratio and a subtle 24-pixel upward optical adjustment. The action stack is full-width up to 360 logical pixels, uses the shared 14-pixel action unit as its gap, and clears the bottom safe area by at least 72 logical pixels with an 88-pixel minimum bottom inset.

The verified normal-text viewports are 393×852 and 360×640. The 360×640 large-text capture confirms that the action labels can grow without clipping and that the scroll-safe composition preserves both actions. Tablet support is declared by the app, but no tablet composition has been visually established.

## Elevation & Depth

The welcome world is flat. It uses no shadows, gradients, blur, or simulated card elevation. Depth comes from the low-contrast doodle field, an 8% black scrim over that image, and the secondary action's translucent near-black fill.

### Named Rules

**The Flat Night Rule.** Keep this world shadowless; separate action from atmosphere with contrast, outline, and state color rather than floating surfaces.

## Shapes

Both welcome actions use one continuous capsule silhouette (`rounded.action-capsule`), a minimum height of 52 logical pixels, and equal inline padding. The secondary capsule carries a fine 1.5-pixel yellow outline; the primary capsule is borderless. No card, field, chip, sheet, or navigation shape has been established.

## Components

### Welcome Brand Field

- **Pattern:** `splash-pattern.png` is a 941×1672 portrait raster cropped to cover the viewport beneath an 8% black scrim.
- **Mark:** `saan-tayo-logo.png` is an 873×704 transparent raster. Animated SVG masks reveal pixels from that exact source; after the sequence, the complete original asset is restored as the final rendered mark.
- **Motion:** After the route gains focus, a 200ms startup beat lets the native loading surface clear. The white lettering then writes on in natural brush-stroke order over 1150ms. At 1050ms the yellow pin settles into place, followed by two expanding GPS acquisition rings. At 1640ms the question mark begins a separate 420ms written reveal. At 2120ms after motion begins (2320ms after focus), the animated layers switch to the complete source image without a visible crossfade or dimming.
- **Focus behavior:** The sequence resets whenever the welcome route gains focus, so Expo Go reloads and navigation back to the route replay the authored entrance instead of preserving an already-completed frame.
- **Performance:** The one-shot sequence uses Reanimated shared values. Lettering and punctuation use SVG stroke-dash masks, while the pin and signal rings stay on opacity and transforms; nothing loops or triggers layout animation.
- **Reduced motion:** The device preference is read through `useReducedMotion`. When enabled, all translation, scale, rotation, springs, delays, and signal rings are skipped; the complete mark receives only a 180ms opacity fade before the actions become available.
- **Accessibility:** The pattern is decorative and hidden from accessibility APIs; the mark exposes the label “Saan Tayo?”.

### Buttons

- **Primary — Get Started:** Location-yellow fill, yellow-action-ink label, no border, and shared capsule geometry. The pressed state changes to Pressed Location Yellow and Android uses that same state color for ripple feedback.
- **Secondary — Log In:** Translucent night fill, warm-lettering label, and a yellow outline. Pressing adds an 8% yellow wash and strengthens the outline.
- **Shared geometry:** Full width within the 360-pixel stack, at least 52 pixels tall, with 14-pixel vertical and 24-pixel horizontal padding.
- **Interaction:** Both are native `Pressable` controls with button roles, explicit labels and hints, and immediate color-state feedback.
- **Entrance gate:** The action stack always reserves its final layout space, preventing the mark from jumping. It stays fully transparent, untappable, disabled, and hidden from accessibility navigation until the complete mark is restored; it then fades upward over 240ms.

## Do's and Don'ts

### Do:

- **Do** use the supplied logo and pattern assets together when reproducing this welcome world.
- **Do** keep yellow rare and functional: the integrated pin, primary action, secondary outline, and their pressed states.
- **Do** preserve safe-area clearance, scroll fallback, and at least the shipped 52-pixel action height.
- **Do** keep the writing-to-GPS-to-question sequence one-shot and UI-thread driven, then reveal the reserved action stack only after the mark is complete.
- **Do** treat every route beyond the welcome screen as undesigned until its interface is actually built and reviewed.

### Don't:

- **Don't** re-typeset or redraw the Saan Tayo? mark. Animated masks must reveal the exact source asset and resolve to the complete original image.
- **Don't** expose, focus, or enable the actions before the mark has completed; keep their layout space reserved while hidden.
- **Don't** infer card, input, navigation, list, map, or content-screen patterns from this single welcome surface.
- **Don't** spread the doodle field across every future route by default; it is currently established only for the welcome atmosphere.
- **Don't** add shadows, gradients, glass effects, or extra accent colors to make the current world feel more dimensional.
