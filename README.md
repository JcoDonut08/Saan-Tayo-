# Saan Tayo?

Saan Tayo? is a mobile-first Expo application for discovering Metro Manila hangout places based on budget, mood, location, group preferences, and travel limits.

This repository currently contains only the initial project environment and folder structure. Application screens, recommendation logic, authentication, maps, backend services, Supabase, and sample place data have not been implemented.

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
