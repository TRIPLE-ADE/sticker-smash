# sticker-smash React Native Project
 
A **React Native** application built to smash stickers

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)

## Installation

To get started with this project, follow the steps below:

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14+)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) (Optional, if using Expo, install [Expo CLI](https://docs.expo.dev/get-started/installation/))
- [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) (for running on Android/iOS simulators)
- A mobile device or emulator for testing.

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/TRIPLE-ADE/sticker-smash.git
   cd sticker-smash
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

## Running the Application

### For Android

1. Start the Metro bundler:

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

2. Run the application on an Android emulator or connected device:

   ```bash
   npm run android
   ```

   or

   ```bash
   yarn android
   ```

### For iOS

1. Start the Metro bundler:

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

2. Run the application on an iOS simulator or connected device:

   ```bash
   npm run ios
   ```

   or

   ```bash
   yarn ios
   ```

## Project Structure

overview of the project structure:

```
├── components      # Reusable components
├── assets          # Images, fonts, etc.
├── App.js              # Root of the app
├── package.json        # Project dependencies and scripts
└── README.md           # Guidelines
```

## Dependencies

This project uses the following major dependencies:

- **React Native**: Core framework for building mobile apps
- **React**: React library
- **React Dom**: React DOM

Check `package.json` for a full list of dependencies.

