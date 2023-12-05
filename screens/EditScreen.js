import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import RoomContext from "./RoomContext";
import firebase from "firebase/compat/app";

const EditScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { data, updateRoomPost } = useContext(RoomContext);

  const currentRoom = data.find((room) => room.id === id);
  const [newTitle, setNewTitle] = useState(currentRoom.title);
  const [newContent, setNewContent] = useState(currentRoom.content);
  const currentUser = firebase.auth().currentUser;

  const handleUpdateRoom = () => {
    if (currentUser) {
      const userId = currentUser.uid;
      updateRoomPost(id, newTitle, newContent);

      // Eğer currentRoom içindeki gameName'i kullanmak istiyorsanız:
      // const gameName = currentRoom.gameName;

      // Eğer route.params içindeki gameName'i kullanmak istiyorsanız:
      const gameName = route.params?.gameName || "";
      console.log("oyun isim", gameName);
      navigation.navigate("Main", { gameFilter: gameName });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Room</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Current Game Title</Text>
        <Text style={styles.infoText}>{currentRoom.title}</Text>

        <Text style={styles.label}>Current League</Text>
        <Text style={styles.infoText}>{currentRoom.content}</Text>
      </View>

      <Text style={styles.label}>New Game Title</Text>
      <TextInput
        style={styles.input}
        value={newTitle}
        onChangeText={setNewTitle}
      />

      <Text style={styles.label}>New League</Text>
      <TextInput
        style={styles.input}
        value={newContent}
        onChangeText={setNewContent}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateRoom}>
        <Text style={styles.buttonText}>Update Room</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 15,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
  },
  updateButton: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default EditScreen;
