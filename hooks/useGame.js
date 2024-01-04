import React, { useState, useEffect } from "react";

import { updateDb } from "../services/firebaseService";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebase } from "../firebaseConfig";
import { checkWinner } from "../services/gameService";

const emptyGameState = {
  gameBoardState: Array(3).fill(Array(3).fill("N")),
  currentPlayer: 1,
  winner: null,
  roundCounter: 0,
  gameEnd: false,
};

export default function useGame(gameCode, playerID) {
  const db = getDatabase(firebase);
  const [gameState, setGameState] = useState(emptyGameState);

  useEffect(() => {
    const gameStateRef = ref(db, "games/" + gameCode);
    const unsubscribe = onValue(gameStateRef, (snapshot) => {
      const data = snapshot.val();
      setGameState(data);
    });

    () => unsubscribe();
  }, [gameCode]);

  const resetGame = async () => {
    setGameState(emptyGameState);
    await updateDb("games/" + gameCode, emptyGameState);
  };

  const handleClick = async (x, y) => {
    if (gameState.currentPlayer !== playerID) {
      return;
    }

    const playerValue = gameState.currentPlayer === 1 ? "X" : "O";

    //check if the item is already filled
    if (gameState.gameBoardState[y][x] !== "N") {
      //TODO: give error message "Is already clicked"
      return;
    }

    //Modify gameBoardState
    let newRow = [...gameState.gameBoardState[y]];
    newRow[x] = playerValue;
    let newGameBoardState = [...gameState.gameBoardState];
    newGameBoardState[y] = newRow;

    //Check for winner
    let winner = null;
    let gameEnd = false;
    if (checkWinner(newGameBoardState, playerValue, x, y)) {
      winner = gameState.currentPlayer;
      gameEnd = true;
    }

    // Check for draw
    if (gameState.roundCounter === 8 && !winner) {
      gameEnd = true;
    }

    //start new round
    const newPlayer = gameState.currentPlayer === 1 ? 2 : 1;

    const newGame = {
      ...gameState,
      gameBoardState: newGameBoardState,
      currentPlayer: newPlayer,
      winner: winner,
      roundCounter: gameState.roundCounter + 1,
      gameEnd,
    };

    // Update game state in Firebase
    await updateDb("games/" + gameCode, newGame);
  };

  return {
    gameState,
    resetGame,
    handleClick,
  };
}
