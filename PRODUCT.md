# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

## Users

Primary users are individuals and barkada groups in Metro Manila deciding where to spend time together. They use the app on a phone while choosing a practical place that fits the group.

## Product Purpose

Saan Tayo? helps people discover hangout places such as cafes, parks, malls, food spots, study spaces, and activity areas using budget, mood, location, group preferences, and travel limits. Success means reducing the friction of the group question, “Saan tayo?” into a confident shared choice.

## Positioning

The product centers the constraints of a real Metro Manila barkada decision—especially shared preferences, budget, and acceptable travel—rather than presenting a generic directory of places.

## Operating Context

The core use case is a quick, phone-first decision made alone or with a group, often while people are already coordinating where to meet. The project is designed for early testing through Expo Go on Android and iOS.

## Capabilities and Constraints

- Confirmed planned flows include discovery, saved places, groups, preferences, results, place details, and group rooms.
- The repository includes a branded entry experience, a four-page introduction, validation-only authentication screens, persisted local guest/account entry state, and a browse-first discovery journey backed by nine dated, source-linked Metro Manila venue records. Smart Match is deterministic local ranking rather than AI. Real authentication, maps, backend services, live place data, and group coordination are not implemented.
- The starter stack is React Native, Expo Router, TypeScript, Zustand, React Hook Form, Zod, Lucide React Native, and AsyncStorage.
- Early development must remain usable through Expo Go and must not depend on paid services.
- The native splash is a brief non-interactive loading surface. The branded entry screen offers “Continue as guest” and “Log In”; new guests and newly created accounts receive the optional introduction, while returning logins and remembered guests open Discover directly.

## Brand Commitments

- Product name: **Saan Tayo?**
- The splash-screen reference supplied by the user is binding for this first surface: near-black background, faint hangout/food doodles, a large white hand-lettered name with a yellow location-pin accent, and yellow/outlined bottom actions.
- The project-local `saan-tayo-logo.png` asset is the single current logo source for native launch, launcher, web, welcome, and authentication surfaces.

## Evidence on Hand

- A user-supplied portrait splash-screen reference is present in the conversation.
- The original setup brief is available in the Codex attachment history.
- No real place records, testimonials, usage metrics, partner claims, or production brand asset pack are available and none should be fabricated.

## Product Principles

- Make group decisions feel fast and low-friction.
- Keep budget and travel practicality visible in future recommendations.
- Ground the experience in Metro Manila’s real hangout context.
- Build a free, testable foundation before adding external services.
- Preserve the friendly, conversational Filipino identity of the name and actions.
- Let people browse without setup, then offer preference matching as a visible way out of indecision.

## Accessibility & Inclusion

No product-specific accessibility standard has been confirmed. New mobile surfaces should nevertheless respect safe areas, screen readers, dynamic text, reduced motion, and minimum platform touch targets.
