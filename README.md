# Chromebook Browser

A lightweight Chromium-based browser shell that mimics a Chrome-like experience while keeping a custom, open-source UI.

This project is designed as a starter browser for Windows and Linux desktop use, and it is structured so it can be extended for Android support in a future mobile build.

## Features

- Chromium engine via Electron
- Tabless single-page browsing shell
- Back, forward, reload, and home navigation
- Address bar navigation
- Bookmarks
- Dark-mode UI
- Offline-safe default start page

## Run locally

```bash
npm install
npm start
```

## Build

```bash
npm run dist
```

## Notes

- This project uses Electron, which includes Chromium and is a good way to build a practical browser replacement without compiling Chrome from source.
- Android support requires a separate mobile shell or a wrapper around the browser logic; the current starter is focused on desktop platforms.
