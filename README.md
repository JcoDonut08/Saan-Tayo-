# Saan Tayo?

Saan Tayo? is a mobile-first Expo application for discovering Metro Manila hangout places based on budget, mood, location, group preferences, and travel limits.

The current prototype includes branded entry and onboarding, validation-only authentication, browse-first discovery, dated source-linked Metro Manila venue data, deterministic Smart Match results, place details, and locally persisted saves. Real authentication, maps, backend services, Supabase, live availability, and AI-backed recommendations have not been implemented.

## Project folders

- `app/` contains Expo Router screens and navigation layouts.
- `components/` will contain reusable visual components.
- `constants/` will contain shared fixed values such as categories, moods, colors, and transportation modes.
- `data/` will contain local place data for the first free version of the app.
- `features/` will contain feature-specific logic organized by domain.
- `hooks/` will contain reusable React hooks.
- `lib/` will contain external-service helpers and reusable technical utilities.
- `stores/` will contain global application state built with Zustand.
- `types/` will contain shared TypeScript types.
- `utils/` will contain pure helper functions such as future recommendation calculations.
- `assets/` will contain images, icons, and fonts.

## Development

```sh
npm install
npx expo start
```

Use Expo Go during the early development stage.
