import React from "react";

import useGame from "../hooks/useGame";

import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

export default function Game({ gameCode, playerID }) {
  const { gameState, resetGame, handleClick } = useGame(gameCode, playerID);

  return (
    <View>
      <Text>Game Code: {gameCode}</Text>
      {gameState.gameEnd && (
        <View>
          <Text>Game ended</Text>
          {gameState.winner && (
            <Text>
              {gameState.winner === playerID ? "You won!" : "You loose"}
            </Text>
          )}
          {!gameState.winner && (
            <Text>{gameState.winner === null ? "Draw" : ""}</Text>
          )}
          <Button onPress={resetGame} title="Play a new game" />
        </View>
      )}
      {!gameState.gameEnd && (
        <>
          <View>
            <Text>
              {gameState.currentPlayer === playerID
                ? "Your turn!"
                : "Waiting for other player..."}
            </Text>
          </View>
          <View style={styles.gridContainer}>
            {gameState.gameBoardState &&
              gameState.gameBoardState.map((row, y) => (
                <View index={"y" + y} style={styles.rowStyle}>
                  {row.map((cell, x) => (
                    <TouchableHighlight
                      index={"x" + x}
                      style={styles.cellStyle}
                      onPress={() => handleClick(x, y)}
                    >
                      <View>
                        <Text>{cell !== "N" && cell}</Text>
                      </View>
                    </TouchableHighlight>
                  ))}
                </View>
              ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    width: 220,
    backgroundColor: "#1E1E1E", // Dark background color
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding around the grid
    margin: 20, // Margin around the grid
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 5, // Margin between rows
  },
  cellStyle: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#6F6F6F", // Lighter border color
    alignItems: "center",
    height: 50,
    borderRadius: 5, // Rounded corners for cells
    backgroundColor: "#3F3F3F", // Lighter cell color
  },
  text: {
    color: "white", // Light text color
    fontSize: 18, // Larger font size
  },
});
