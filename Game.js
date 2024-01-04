import React, {useState} from "react";

import {View, Button, Text, StyleSheet, TouchableHighlight} from "react-native";


function checkWinner(gameState, playerValue, x, y) {
    
    //check row
    if(gameState[y][0] === playerValue && gameState[y][1] === playerValue && gameState[y][2] === playerValue) {
        return true
    }

    //entire column
    if(gameState[0][x] === playerValue && gameState[1][x] === playerValue && gameState[2][x] === playerValue) {
        return true
    }

    //check diagonal
    if(gameState[1][1] === playerValue) {
        if(gameState[0][0] === playerValue && gameState[2][2] === playerValue) {
            return true
        }
    
        if (gameState[0][2] === playerValue && gameState[2][0] === playerValue) {
            return true
        }
    } 

    return false
}

export default function Game({gameCode}) {
    const [gameState, setGameState] = useState(Array(3).fill(Array(3).fill(null)))
    const [roundCounter, setRoundCounter] = useState(0)
    const [gameEnd, setGameEnd] = useState(false)
    const [currentPlayer, setCurrentPlayer] = useState(1)
    const [winner, setWinner] = useState(null)

    const resetGame = () => {
        setGameState(Array(3).fill(Array(3).fill(null)))
        setCurrentPlayer(1)
        setWinner(null)
        setRoundCounter(0)
        setGameEnd(false)
    }

    const handleClick = (x,y) => {
        console.log("clicking")

        const playerValue = currentPlayer === 1 ? "X" : "O"

        //check if the item is already filled
        if(gameState[y][x] !== null) {
            //TODO: give error message "Is already clicked"
            return 
        }

        //Modify gameState
        let newRow = [...gameState[y]];
        newRow[x] = playerValue;
        let newGameState = [...gameState];
        newGameState[y] = newRow;

        //Check for winner
        if(checkWinner(newGameState, playerValue, x, y)) {
            setWinner(currentPlayer)
            setGameEnd(true)
        }

        // Check for draw
        if (roundCounter === 8 && !winner) {
            // Handle draw condition
            setGameEnd(true)
        } else {
            // Increment roundCounter after each move
            setRoundCounter(prev => prev + 1);
        }

        //change gameState
        setGameState(newGameState)

        //start new round
        const newPlayer = currentPlayer === 1 ? 2 : 1
        setCurrentPlayer(newPlayer)
    }


    return (
        <View>
            <Text>Game Code: {gameCode}</Text>
            {gameEnd && (
                <View>
                    <Text>{winner ? "The winner is Player " + winner : "It's a draw"}</Text>
                    <Button onPress={resetGame} title="Reset game" />
                </View>
            )}
            {!gameEnd && (
            <>
            <View>
                <Text>Current Player: {currentPlayer}</Text>
                </View>
                <View style={styles.gridContainer}>
                    {gameState.map((row, y) => (
                        <View index={"y"+ y} style={styles.rowStyle}>
                            {row.map((cell, x) => (
                                <TouchableHighlight 
                                    index={"x"+ x} 
                                    style={styles.cellStyle} 
                                    onPress={() => handleClick(x,y)}
                                >
                                    <View>
                                        <Text>{cell}</Text>
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
    },
    rowStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    cellStyle: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderColor: "black",
      alignItems: "center",
      height: 50,
    },
  });