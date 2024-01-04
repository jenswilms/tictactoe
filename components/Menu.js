import React from "react";
import { Modal, StyleSheet, Button, View, TextInput } from "react-native";

export default function Menu({
  isModalVisible,
  setModalVisible,
  startNewGame,
  joinGameHandler,
  inputText,
  setInputText,
}) {
  return (
    <View>
      {isModalVisible && (
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
              <Button onPress={() => setModalVisible(false)} title="Go back" />
              <TextInput
                style={styles.input}
                onChangeText={(text) => setInputText(text)}
                value={inputText}
                placeholder="Enter game code"
              />
              <Button onPress={joinGameHandler} title="Submit" />
            </View>
          </View>
        </Modal>
      )}

      <View>
        <Button onPress={startNewGame} title="Start New Game" />
        <Button onPress={() => setModalVisible(true)} title="Join Game" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
