# TicTacToe Game - Code Structure and Logic

This project is a simple TicTacToe game built with React Native and Firebase. The game allows two players to play TicTacToe in real-time.

## Code Structure

The codebase is structured into several main files and directories:

- App.js: This is the main entry point of the application. It handles the game's main logic, including starting a new game and joining an existing game.

- components/: This directory contains the React components used in the application. The main components are Game.js and Menu.js.

- hooks/: This directory contains custom React hooks. The main hook is useGame.js, which encapsulates the game logic.

- services/: This directory contains services for interacting with Firebase.

- firebaseConfig.js: This file contains the configuration for Firebase.

## Game Logic

The game logic is primarily handled in the useGame.js hook and the App.js file.

In App.js, the startNewGame function creates a new game, and the joinGameHandler function allows a player to join an existing game. The game code and player ID are stored in the state and passed to the Game component.

In useGame.js, the game state is fetched from Firebase and stored in the local state. The resetGame function resets the game state in Firebase, and the handleClick function handles a player's move.

The Game component displays the game board and game state. It uses the useGame hook to interact with the game state.

## Running the Game

The game can be run on different platforms using the scripts defined in package.json. For example, to start the game on an Android device, you would run npm run android.

```
npm i
npm run ios
```

