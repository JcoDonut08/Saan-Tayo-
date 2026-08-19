---
name: Saan Tayo?
description: A dark, playful welcome and onboarding world for starting a practical Metro Manila barkada decision.
colors:
  night-black: "#080B0C"
  onboarding-black: "#080B0C"
  onboarding-surface: "#171918"
  warm-lettering: "#F7F6F1"
  onboarding-white: "#FFFFFF"
  onboarding-muted: "#A7AAA8"
  onboarding-dot: "#444746"
  location-yellow: "#FFC21C"
  location-yellow-pressed: "#E6A900"
  yellow-action-ink: "#101213"
  yellow-outline: "rgba(255, 194, 28, 0.58)"
  yellow-outline-pressed: "rgba(255, 194, 28, 0.82)"
  content-background: "#0C100F"
  content-surface: "#161B18"
  content-surface-strong: "#1D231F"
  content-border: "#2D342F"
  content-muted: "#AAB1AA"
typography:
  onboarding-headline:
    fontSize: "34px"
    fontWeight: 900
    lineHeight: "40px"
    letterSpacing: "-0.85px"
  onboarding-body:
    fontSize: "17px"
    fontWeight: 500
    lineHeight: "24px"
  action-label:
    fontSize: "15px"
    fontWeight: 700
    lineHeight: "20px"
    letterSpacing: "0.1px"
rounded:
  action-capsule: "999px"
motion:
  onboarding-page-settle:
    duration: "240ms"
    reducedMotion: "No translation or scale; content remains fully visible"
  welcome-brand-entry:
    duration: "3270ms from route focus until brand completion, then 240ms action reveal"
    reducedMotion: "180ms opacity-only fade"
spacing:
  action-unit: "14px"
  action-inline: "24px"
components:
  onboarding-primary-action:
    backgroundColor: "{colors.location-yellow}"
    textColor: "{colors.yellow-action-ink}"
    rounded: "{rounded.action-capsule}"
    minHeight: "58px"
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

The established world now covers the branded entry surface, authentication, its four-page first-run introduction, a browse-first discovery journey, saved places, Smart Match preferences and results, place details, and a minimal guest-to-account handoff in Profile. Groups, rooms, and the broader authenticated profile remain route scaffolds.

**Key Characteristics:**

- Near-black, edge-to-edge atmosphere with a faint food-and-hangout doodle field.
- Warm white raster lettering with an integrated yellow location-pin accent.
- One authored opening beat: the original brush lettering writes on, the pin acquires location, and the question mark writes itself last.
- A four-beat onboarding story follows one original barkada character from indecision to a confident Saan Tayo? choice.
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

React Native uses the native platform system face because no family is declared. The welcome surface establishes the compact action label, while onboarding adds a heavy rounded-feeling headline and a restrained centered body role. Content-screen title, body, and navigation roles are not yet established.

### Hierarchy

- **Action Label** (`typography.action-label`): Used by both welcome actions; sentence case, bold, and centered.
- **Onboarding Headline** (`typography.onboarding-headline`): A 34-pixel, extra-heavy centered statement for each story beat.
- **Onboarding Body** (`typography.onboarding-body`): A 17-pixel muted explanation limited to a concise two- or three-line measure on narrow phones.

### Named Rules

**The Mark Is an Asset Rule.** Use the supplied logo asset for the Saan Tayo? lockup; do not approximate its lettering, punctuation, or integrated pin with a display font.

**The One-Question Motion Rule.** The welcome mark animates once on arrival: words first, location pin second, question mark last, actions only after completion. Do not loop it or scatter the same entrance across other controls.

## Layout

The welcome screen is an edge-to-edge portrait stage. A full-height scroll container grows to fill the viewport, while the content keeps a minimum height of 560 logical pixels so short phones can scroll rather than clip. The screen respects the top safe area and applies 38 logical pixels of horizontal gutter.

The logo sits in a flexible centered region at 80% width, capped at 304 logical pixels, with its shipped 873:704 aspect ratio and a subtle 24-pixel upward optical adjustment. The action stack is full-width up to 360 logical pixels, uses the shared 14-pixel action unit as its gap, and clears the bottom safe area by at least 72 logical pixels with an 88-pixel minimum bottom inset.

The verified normal-text viewports are 393×852 and 360×640. The 360×640 large-text capture confirms that the action labels can grow without clipping and that the scroll-safe composition preserves both actions. Tablet support is declared by the app, but no tablet composition has been visually established.

The onboarding route measures its actual safe-area container instead of assuming a static window width. It uses the exact same edge-to-edge `splash-pattern.png`, Night Black base, and 8% black scrim as the welcome route. The onboarding illustrations have transparent outer canvases, so the shared splash field stays continuous behind every character and destination instead of turning into a black rectangle. Each FlatList page is locked to the measured width with no flex shrink, and the illustration stage scales from 48% of the available height between 286 and 420 logical pixels. Back and Skip remain at the left and right edges of a fixed 56-pixel top bar; pagination and the primary action remain in a fixed bottom region. The verified onboarding viewports are 390×844 and 360×640.

## Elevation & Depth

The welcome world is flat. It uses no shadows, gradients, blur, or simulated card elevation. Depth comes from the low-contrast doodle field, an 8% black scrim over that image, and the secondary action's translucent near-black fill.

### Named Rules

**The Flat Night Rule.** Keep this world shadowless; separate action from atmosphere with contrast, outline, and state color rather than floating surfaces.

Discovery extends that flatness into an operational content surface. It removes the doodle wallpaper, shifts the ground slightly lighter to Content Background, and separates destination slips with Content Surface and a single Content Border. It does not introduce shadows, gradients, glass, or additional accents.

## Shapes

Both welcome actions use one continuous capsule silhouette (`rounded.action-capsule`), a minimum height of 52 logical pixels, and equal inline padding. The onboarding action uses the same silhouette at 58 pixels high. The secondary welcome capsule carries a fine 1.5-pixel yellow outline; primary actions are borderless. Floating illustration tokens are compact circles, never content cards. No field, sheet, or content-card shape has been established.

## Components

### Welcome Brand Field

- **Pattern:** `splash-pattern.png` is a 941×1672 portrait raster cropped to cover the viewport beneath an 8% black scrim.
- **Mark:** `saan-tayo-logo.png` is an 873×704 transparent raster whose exact lettering and punctuation are revealed through animated SVG masks. The yellow GPS pin, transparent center, connector, and lower-left tail are one code-native SVG silhouette, eliminating any compositing seam at the point. The final mark uses the same deterministic composition.
- **Motion:** After the route gains focus, a 200ms startup beat lets the native loading surface clear. The white lettering writes on over 1500ms in seven non-overlapping phases: `S`, `a`, `a`, `n`, `T`, `a`, then `y`. Each letter resolves to the complete source pixels before the next layer can appear. At 1600ms the yellow pin and its connected tail settle into place. Two outward GPS scan rings begin at 1750ms and 1880ms, followed by a contracting lock ring from 2160–2520ms. Only after acquisition finishes does the separately gated question layer write itself from 2570–3010ms. At 3070ms after motion begins (3270ms after focus), the animated layers switch to the final composed mark without a visible crossfade or dimming.
- **Focus behavior:** The sequence plays once per app session only when no guest or authenticated session is active. Persisted entry state hydrates before routing, so remembered guests and returning accounts bypass the branded entry without flashing it. Returning from a canceled introduction restores the completed mark and available actions immediately instead of replaying the sequence.
- **Performance:** The one-shot sequence uses Reanimated shared values. Each letter owns a clipped SVG stroke-dash mask and an outer native opacity gate, preventing Android round caps from exposing later letters; the question mark has the same independent gate. The pin and three signal beats stay on opacity and transforms; nothing loops or triggers layout animation.
- **Reduced motion:** The device preference is read through `useReducedMotion`. When enabled, all translation, scale, rotation, springs, delays, and signal rings are skipped; the complete mark receives only a 180ms opacity fade before the actions become available.
- **Accessibility:** The pattern is decorative and hidden from accessibility APIs; the mark exposes the label “Saan Tayo?”.

### First-Run Introduction

- **Structure:** Exactly four data-driven pages in a horizontally paginated native FlatList: “Saan tayo?”, “May idea ako!”, “Tara?”, and “May tambayan na!”. The same original character carries the story across every scene, over the same faint food-and-hangout pattern used by the welcome route.
- **Illustration:** Every page uses the same square stage, capped to the slide's 12-pixel side safe zone so no artwork is clipped by page overflow. The first page uses the supplied transparent `assets/images/onboarding-confused-v4.png`, including its four finished speech-bubble labels. Its wide source is framed in a centered 1.09:1 window that removes only empty outer canvas, keeps all four bubbles visible, and matches the other scenes' optical height. A 95% optical correction on the bulb scene keeps its taller silhouette aligned with the other three illustrations. A project-local transparent 2×2 raster sprite at `assets/images/onboarding-scenes-transparent-v3.png` supplies the idea and ready scenes, while `assets/images/onboarding-discover-transparent-v3.png` supplies the solved final scene so its foreground phone and destination vignettes remain fully framed. Their alpha canvases expose the exact shared splash background beneath the artwork while UI copy and controls remain native and accessible. The character keeps warm skin tones, black hair, and Location Yellow clothing across the story.
- **Entry:** “Continue as guest” and successful account creation mark the introduction as pending before opening it. Returning login marks the introduction complete and goes directly to Discover. Pending state survives an interrupted launch; completed state prevents replay for remembered guests and returning accounts.
- **Navigation:** Next advances one page with a native horizontal scroll. Swiping forward or backward updates the current page and pagination. Back cancels the pending local guest/account session before returning to the branded entry, avoiding redirect loops. Skip and the final “Let's Go” action both persist completion and replace the route with `/discover`, preventing Back from reopening the introduction.
- **Progress:** Four compact circular indicators sit between copy and action. A slightly larger yellow circle glides continuously between the smaller Onboarding Dot gray circles as the page moves, briefly tightening at the midpoint without stretching into an oval.
- **Motion:** Active artwork and copy settle over 240ms with a small opacity, vertical, and scale adjustment. The progress circle follows the native page offset on the UI thread for both swipes and Next actions. Reduced-motion users receive the fully visible state and a discrete progress update with no travel animation. Illustration decoration does not loop.
- **Accessibility:** Skip, progress, illustration meaning, and primary actions have explicit labels, hints, and roles. The controls retain at least a 48-pixel touch target and the copy maintains strong contrast on the dark field.
- **Asset replacement:** `OnboardingIllustration` is the single crop and labeling boundary for the generated onboarding art. A future final art pack can replace those assets without changing the onboarding data, navigation, copy, or controls.

### Buttons

- **Primary — Continue as guest:** Location-yellow fill, yellow-action-ink label, no border, and shared capsule geometry. It begins the first-run introduction without requiring an account. The pressed state changes to Pressed Location Yellow and Android uses that same state color for ripple feedback.
- **Secondary — Log In:** Translucent night fill, warm-lettering label, and a yellow outline. Pressing adds an 8% yellow wash and strengthens the outline.
- **Shared geometry:** Full width within the 360-pixel stack, at least 52 pixels tall, with 14-pixel vertical and 24-pixel horizontal padding.
- **Interaction:** Both are native `Pressable` controls with button roles, explicit labels and hints, and immediate color-state feedback.
- **Entrance gate:** The action stack always reserves its final layout space, preventing the mark from jumping. It stays fully transparent, untappable, disabled, and hidden from accessibility navigation until the complete mark is restored; it then fades upward over 240ms.

### Browse-First Discovery

- **First viewport:** A compact instance of the supplied logo and yellow “Match me” action lead into the local search field, horizontal category filters, and the first destination slip. Browsing is available without preference capture.
- **Destination slips:** Places use a compact horizontal 1-pixel bordered surface with a code-native map stamp, venue name, city, sourced budget or admission note, up to two editorial fit tags, and an independent save action. The artwork is abstract interface geometry, never a generated imitation of the real venue.
- **Search and filtering:** Search covers venue name, city, address, category, summary, and editorial mood tags. Category changes update the local catalog immediately. Empty search results name the problem and offer one clear reset.
- **Smart Match handoff:** A compact yellow “Can’t decide?” intervention appears after the first two browse results. Both it and the header action open the same preference route. The matcher explains concrete reasons and never displays arbitrary percentages.
- **Trust boundary:** Venue summaries, address, cost notes, source label, source URL, and verification date come from the dated local catalog. Mood tags are explicitly described as Saan Tayo? editorial suggestions. Volatile details direct users to the official source.
- **Navigation:** The visible tab bar contains Discover, Saved, and Profile. Groups remains a future route and is hidden rather than shipped as a blank tab.

### Smart Match and Saved States

- **Preferences:** Mood is required and limited to three selections. Budget uses one ceiling choice; place types are optional and limited to three. Choices persist as they are made, so Back never discards unfinished work. Reset is the only explicit clearing action.
- **Results:** Exact matches lead, followed by honest closest options only when no exact result exists. Reasons prioritize mood and confirmed budget fit; variable-price venues never claim budget compatibility.
- **Saved:** The bookmark state persists locally for guests and prototype authenticated sessions. The empty state explains what saving does and returns directly to Discover.
- **Details:** The large destination stamp, sourced summary, budget note, editorial tags, verification date, Save, and Official information actions make the source boundary visible without relying on photography or live data.

## Do's and Don'ts

### Do:

- **Do** use the supplied logo and pattern assets together when reproducing this welcome world.
- **Do** keep yellow rare and functional: the integrated pin, primary action, secondary outline, and their pressed states.
- **Do** preserve safe-area clearance, scroll fallback, and at least the shipped 52-pixel action height.
- **Do** keep the writing-to-GPS-to-question sequence one-shot and UI-thread driven, then reveal the reserved action stack only after the mark is complete.
- **Do** keep one recognizable main character and the confused → idea → ready → solved progression when replacing introduction art.
- **Do** treat Skip as completed introduction state and remember both guest and authenticated return paths.
- **Do** treat every route beyond onboarding as undesigned until its interface is actually built and reviewed.
- **Do** keep browsing available before Smart Match and keep source dates visible on place details.
- **Do** use the supplied logo asset when a product mark appears; the small Discover header mark is the same file as native launch and welcome.

### Don't:

- **Don't** re-typeset or redraw the Saan Tayo? mark. Animated masks must reveal the exact source asset and resolve to the complete original image.
- **Don't** expose, focus, or enable the actions before the mark has completed; keep their layout space reserved while hidden.
- **Don't** add a fifth introduction page, hide Skip, loop decorative motion, or introduce an external carousel dependency.
- **Don't** replay the introduction for remembered guests or returning logins.
- **Don't** replace the onboarding art with unrelated characters or a green competitor-inspired mascot.
- **Don't** infer card, input, navigation, list, map, or content-screen patterns from this single welcome surface.
- **Don't** spread the doodle field across every future route by default; it is currently established only for the welcome and onboarding atmosphere.
- **Don't** add shadows, gradients, glass effects, or extra accent colors to make the current world feel more dimensional.
- **Don't** call deterministic ranking AI, use match percentages, or label a place popular, nearby, open now, or personalized without supporting data.
- **Don't** present editorial mood tags as venue-provided facts or copy official venue photography into the app without permission.
