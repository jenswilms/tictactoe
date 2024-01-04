import React, {useState} from 'react';
import { Modal, StyleSheet, Button, View, TextInput } from 'react-native';
import Game from "./Game"
import {createGame, joinGame} from "./gameService"

export default function App() {
  const [menuShown, setMenuShown] = useState(true);
  const [gameCode, setGameCode] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  const reset = () => {
    setMenuShown(true);
    setGameCode(null);
  }

  const startNewGame = async () => {
    const gameCode = await createGame();
    setGameCode(gameCode);
    setMenuShown(false);
  }

  const joinGame = () => {
    setGameCode(inputText);
    setModalVisible(false);
    setInputText('');
    setMenuShown(false);
  }
  

  return (
    <View style={styles.container}>
      <Button onPress={reset} title="Back to home" />

      {isModalVisible && 
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={text => setInputText(text)}
              value={inputText}
              placeholder="Enter game code"
            />
            <Button
              onPress={joinGame}
              title="Submit"
            />
          </View>
        </View>
      </Modal>
      }

      {menuShown && 
        <View>
          <Button onPress={startNewGame} title="Start New Game" />
          <Button onPress={() => setModalVisible(true)} title="Join Game" />
        </View>
      }

      {!menuShown && gameCode && <Game gameCode={gameCode}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
