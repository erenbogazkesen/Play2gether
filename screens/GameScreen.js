import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import GameDetails from "../Components/GameDetails";

const GameScreen = ({ navigation }) => {
  const games = [
    { name: "CS2", image: require("../assets/cs2.jpg") },
    { name: "LOL", image: require("../assets/lol.jpg") },
    { name: "Valorant", image: require("../assets/valo.jpeg") },
  ];

  return (
    <ScrollView style={styles.container}>
      {games.map((game) => (
        <View key={game.name} style={styles.gameContainer}>
          <TouchableOpacity
            style={styles.gameImageContainer}
            onPress={() =>
              navigation.navigate("Index", { gameFilter: game.name })
            }
          >
            <Image style={styles.gameImage} source={game.image} />

            <View style={styles.gameNameOverlay}>
              <Text style={styles.gameNameText}>{game.name}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createButton}
            onPress={() =>
              navigation.navigate("Create", { gameName: game.name })
            }
          >
            <Text style={styles.createButtonText}>Create {game.name} Room</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  gameContainer: {
    marginBottom: 16,
  },
  gameImageContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  gameImage: {
    width: "100%",
    height: 200,
  },
  gameNameOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  gameNameText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50, // Make it a circle
    alignItems: "center",
    marginTop: -30, // Move the button up to overlap with the image
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#2ecc71", // Light blue border color
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GameScreen;
