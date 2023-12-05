import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import RoomContext from "./RoomContext";
import firebase from "firebase/compat/app";

const CreateRoom = ({ route, navigation }) => {
  const { addRoomPost } = useContext(RoomContext);
  const currentUser = firebase.auth().currentUser;
  const gameName = route.params.gameName; // Correctly retrieve the gameName from route params
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateRoom = () => {
    if (currentUser) {
      const userId = currentUser.uid;
      addRoomPost(title, content, userId, gameName); // Odayı oluştur

      // Odayı ekledikten sonra RoomIndexScreen'e yönlendir
      navigation.navigate("Index", { gameFilter: gameName });
    }
  };

  return (
    <View>
      <Text style={styles.label}>Create Room</Text>
      <Text style={styles.label}>Oda Adı</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Oda İçeriği</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
      />
      <Button title="Create Room" onPress={handleCreateRoom} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default CreateRoom;
