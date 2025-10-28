# CP0Android - Local Development Setup Guide

This guide will help you set up and run the CP0Android project locally in development mode, including Android Studio and Expo.

---

## 1. Prerequisites

- **Node.js** (v18 or newer recommended)
- **npm** (comes with Node.js)
- **Git**
- **Expo CLI**
- **EAS CLI**
- **Android Studio** (for emulator/device testing)

---

## 2. Clone the Repository

```bash
git clone https://github.com/laxman-gupta1006/CP0Android.git
cd CP0Android/Latest_app
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Install Expo & EAS CLI (if not already installed)

```bash
npm install -g expo-cli eas-cli
```

---

## 5. Android Studio Setup (Detailed)

### Step 1: Download Android Studio
- Go to the official website: [https://developer.android.com/studio](https://developer.android.com/studio)
- Click "Download Android Studio" and follow the instructions for your operating system (Windows, macOS, Linux).

### Step 2: Install Android Studio
- Run the downloaded installer and follow the setup wizard.
- On first launch, choose "Standard" installation for recommended settings.
- Let Android Studio install the required SDKs and tools.

### Step 3: Install Android SDK & Tools
- Open Android Studio.
- Go to **Preferences** (macOS: `Android Studio > Preferences`, Windows: `File > Settings`).
- Navigate to **Appearance & Behavior > System Settings > Android SDK**.
- Make sure the following are installed:
  - Android SDK Platform (API 33 or newer recommended)
  - Android SDK Build-Tools
  - Android Emulator
  - Android Platform Tools
  - Google USB Driver (Windows only)

### Step 4: Create an Android Virtual Device (Emulator)
- In Android Studio, go to **Tools > Device Manager** (or **AVD Manager**).
- Click "Create Device" and select a phone model (e.g., Pixel 5).
- Choose a system image (API 33+ recommended) and download if needed.
- Finish setup and click "Play" to start the emulator.

### Step 5: Configure Physical Device (Optional)
- Enable **Developer Options** on your Android device:
  - Go to **Settings > About phone** and tap **Build number** 7 times.
- Enable **USB Debugging** in **Developer Options**.
- Connect your device via USB and allow debugging.

### Step 6: Verify Setup
- Run the following command to verify your device/emulator is detected:
  ```bash
  adb devices
  ```
- You should see your device/emulator listed.

### Step 7: Run the App
- In your project directory, start the Expo server:
  ```bash
  npx expo start
  ```
- Press `a` in the terminal to launch the app in the Android emulator.
- Or use Expo Go app to scan the QR code for instant preview.

---

## 6. Start the Development Server

```bash
npx expo start
```

- Scan the QR code with Expo Go app (Android/iOS)
- Or press `a` to open in Android emulator

---

## 7. Build APK for Testing (Optional)

To build a release APK/AAB for testing:

```bash
eas build --platform android
```

- Download the build from the Expo dashboard link provided after build completes.

---

## 8. Troubleshooting

- If you see Java/Gradle errors, ensure your Java version is **Java 17** (not Java 25+).
- If Metro Bundler fails, try:
  ```bash
  rm -rf .expo .expo-shared node_modules
  npm install
  npx expo start -c
  ```
- For Android Studio issues, check SDK Manager and AVD Manager for correct setup.

---

## 9. Useful Commands

- `npx expo start` — Start development server
- `npx expo run:android` — Run on connected Android device/emulator
- `eas build --platform android` — Build APK/AAB for release
- `npm install` — Install dependencies

---

## 10. Project Structure

- `App.tsx` — Main app entry point
- `components/` — All React Native screens/components
- `android/` — Native Android project files
- `assets/` — Images and static assets
- `app.json` — Expo configuration
- `eas.json` — EAS Build configuration

---

## 11. Resources

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/eas/)
- [React Native Docs](https://reactnative.dev/docs/environment-setup)
- [Android Studio Setup](https://developer.android.com/studio)

---

## 12. Contact

For issues, open a GitHub issue or contact the project maintainer.

---

Happy coding!
