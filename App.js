import React, { useState } from "react";
import { StyleSheet, Button, View } from "react-native";
import Game from "./components/Game";
import Menu from "./components/Menu";
import { createGame, joinGame } from "./services/gameService";

export default function App() {
  const [menuShown, setMenuShown] = useState(true);
  const [gameCode, setGameCode] = useState(null);
  const [inputText, setInputText] = useState("");
  const [playerID, setPlayerID] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const reset = () => {
    setMenuShown(true);
    setGameCode(null);
  };

  const startNewGame = async () => {
    const gameCode = await createGame();
    setGameCode(gameCode);
    setPlayerID(1);
    setMenuShown(false);
  };

  const joinGameHandler = async () => {
    try {
      //TODO: some frontend validation
      await joinGame(inputText.toUpperCase());
      setGameCode(inputText.toUpperCase());
      setPlayerID(2);
      setModalVisible(false);
      setInputText("");
      setMenuShown(false);
    } catch (error) {
      alert("wrong game code");
      setInputText("");
    }
  };

  return (
    <View style={styles.container}>
      {menuShown && (
        <Menu
          startNewGame={startNewGame}
          setModalVisible={setModalVisible}
          joinGameHandler={joinGameHandler}
          inputText={inputText}
          setInputText={setInputText}
          isModalVisible={isModalVisible}
        />
      )}

      {!menuShown && gameCode && (
        <>
          <Button onPress={reset} title="Back to home" />
          <Game gameCode={gameCode} playerID={playerID} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
