import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  const target = 10;
  const [turn, setTurn] = useState(0);
  const [players, setPlayers] = useState([
    { name: "Player 1", score: 0, disabled: false },
    { name: "Player 2", score: 0, disabled: false },
    { name: "Player 3", score: 0, disabled: false },
  ]);
  const [playing, setPlaying] = useState(players.length);

  useEffect(()=>{
    if(players[turn].score === target){
      players[turn].disabled = true;
      setTurn((turn + 1) % playing);

    }
  },[turn])

  const play = () => {
    score = Math.floor(Math.random() * 6) + 1;
    let newPlayers = [...players];
    score += newPlayers[turn].score;
    score > target ? (newPlayers[turn].score = target, setPlaying(playing-1)) : (newPlayers[turn].score = score);    
    setTurn((turn + 1) % playing);
    setPlayers(newPlayers);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        renderItem={({ item, index }) => (
          <View style={styles.player}>
            <Text style={styles.playerName}>{item.name}</Text>
            <Text style={styles.playerName}>{item.score}</Text>
            <Text style={{ color: "red" }}>Target:{target}</Text>
            <TouchableOpacity style={[styles.button,players[turn].disabled ? {backgroundColor: "red"}: {backgroundColor: "green"}]}
              onPress={play}
              disabled={index === turn ? false : true}
            >
              <Text>Play</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  player: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  playerName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  playerScore: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    width: 100,
    height: 30,
    borderRadius: 10,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
});
