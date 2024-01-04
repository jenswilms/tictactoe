import {View} from "react-native"

function Cell({data, onCellClick}) {
    return (
        <View style={styles.cellStyle} onClick={onCellClick}>
          <Text>{data}</Text>
        </View>
      );
}

function Row({ column, onCellClick }) {  
    return (
      <View style={styles.rowStyle}>
        {column.map((data) => (
          <Cell data={data} onCellClick={onCellClick}/>
        ))}
      </View>
   );
  }

function Grid({data, onCellClick}) {
    return (
      <View style={styles.gridContainer}>
        {data.map((column) => (
          <Row column={column} onCellClick={onCellClick} />
        ))}
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
      margin: 10,
    },
  });

export default Grid;