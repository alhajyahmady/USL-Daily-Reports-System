# USL Daily Reports System - Offline HTML+JS Template

This is a lightweight HTML+JavaScript template of the **USL Daily Reports System** designed to run in VS Code using the *Live Server* extension, without requiring npm or build tools.

## What's included
- `index.html` — single-page app with Login, Signup, Submit Report, Manager View
- `styles.css` — exact-looking CSS matching your screenshots (tiles background + yellow theme)
- `app.js` — application logic (uses Firebase compat SDK via CDN)
- `firebase-config.js` — placeholder where you must paste your Firebase config
- `assets/logo.png` — placeholder file (replace with your logo)
- `backgrounds/` — folder where you can put tile images (`tile1.jpg`, `tile2.jpg`, ...)

## Setup (step-by-step)

1. Open the folder in VS Code.
2. Install the Live Server extension (ritwickdey.liveserver).
3. Open `firebase-config.js` and paste your Firebase web app config (from Firebase Console → Project Settings → Your apps).
4. Replace `assets/logo.png` with your company logo.
5. Put tile images in `backgrounds/` (e.g. `tile1.jpg`, `tile2.jpg`, `tile3.jpg`).
6. In VS Code, right-click `index.html` and choose **Open with Live Server** (or click "Go Live" bottom-right).
7. The app will open in your browser. Use Signup → create accounts (choose role manager to view Manager Dashboard).
8. Note: the app uses Firebase CDN — your computer must have internet to talk to Firebase services.

## Firebase requirements
- Enable Authentication → Email/Password
- Create Firestore database in **test** or secured mode (update rules in production)
- Enable Storage (for attachments)

## Notes
- This is a simplified offline template. Export features (XLSX/PDF) are placeholders to keep the template lightweight.
- If you want a full React repo (with exports, role-based routing, and nicer UI), I can prepare that separately — it requires npm or the full ZIP with prebuilt node_modules.
