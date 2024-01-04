import {store, retrieve, updateDb} from './firebaseService';

const generateGameCode = () => {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 5; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

export const createGame = async () => {
  const gameCode = generateGameCode(); // function to generate a unique 5-digit code
  const gameState = Array(3).fill(Array(3).fill(null)); // initial game state

  await store('games/' + gameCode, {
    gameState: gameState,
    roundCounter: 0,
    gameEnd: false,
    currentPlayer: 1,
    winner: null,
  })

  return gameCode;
};

export const joinGame = async (gameCode) => {

    try {
        await retrieve('games/' + gameCode);
        return gameCode;
    } catch (error) {
        throw new Error('Invalid game code');
    }
};