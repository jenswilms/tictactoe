import { store, retrieve, updateDb, db } from "./firebaseService";
import { ref, onValue } from "firebase/database";

const generateGameCode = () => {
  let code = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

export const createGame = async () => {
  const gameCode = generateGameCode(); // function to generate a unique 5-digit code
  const gameBoardState = Array(3).fill(Array(3).fill("N")); // initial game state

  await store("games/" + gameCode, {
    gameBoardState: gameBoardState,
    roundCounter: 0,
    gameEnd: false,
    currentPlayer: 1,
    winner: null,
  });

  return gameCode;
};

export const joinGame = async (gameCode) => {
  try {
    const result = await retrieve("games/" + gameCode);
    if (!result) {
      throw new Error();
    }
    return gameCode;
  } catch (error) {
    throw new Error("Invalid game code");
  }
};

export function checkWinner(gameBoardState, playerValue, x, y) {
  //check row
  if (
    gameBoardState[y][0] === playerValue &&
    gameBoardState[y][1] === playerValue &&
    gameBoardState[y][2] === playerValue
  ) {
    return true;
  }

  //entire column
  if (
    gameBoardState[0][x] === playerValue &&
    gameBoardState[1][x] === playerValue &&
    gameBoardState[2][x] === playerValue
  ) {
    return true;
  }

  //check diagonal
  if (gameBoardState[1][1] === playerValue) {
    if (
      gameBoardState[0][0] === playerValue &&
      gameBoardState[2][2] === playerValue
    ) {
      return true;
    }

    if (
      gameBoardState[0][2] === playerValue &&
      gameBoardState[2][0] === playerValue
    ) {
      return true;
    }
  }

  return false;
}

export const onGameStateChange = (gameCode, callback) => {
  const gameRef = ref(db, "games/" + gameCode);

  const unsubscribe = onValue(gameRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });

  return unsubscribe;
};
