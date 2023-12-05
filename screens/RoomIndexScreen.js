import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RoomContext from "./RoomContext";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import firebase from "firebase/compat/app";

const RoomIndexScreen = ({ route, navigation }) => {
  const { data, removeRoomPost } = useContext(RoomContext);
  const gameFilter = route.params?.gameFilter;
  const currentUserUID = firebase.auth().currentUser?.uid;

  // Check if the data is still loading
  if (!data) {
    return <Text style={styles.loadingText}>Loading rooms...</Text>;
  }

  // Filtrelenmiş odaları elde etmek için
  const filteredData = data.filter((room) => room.game === gameFilter);

  // Check if there are no rooms after filtering
  if (filteredData.length === 0) {
    return (
      <Text style={styles.noRoomsText}>No rooms available for this game.</Text>
    );
  }

  const handleDeleteRoom = (roomId) => {
    console.log("Silinen oda ID'si:", roomId);
    removeRoomPost(roomId);
  };

  const handleRoomPress = (id, title) => {
    navigation.navigate("Chat", { roomId: id, title });
  };

  const handleEditRoom = (id) => {
    navigation.navigate("Edit", { id });
  };

  return (
    <ScrollView style={styles.container}>
      {filteredData.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handleRoomPress(item.id, item.title)}
        >
          <View style={styles.roomCard}>
            <Text style={styles.roomTitle}>
              {item.title} - {item.content}
            </Text>
            {item.createdBy === currentUserUID && (
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => handleDeleteRoom(item.id)}
                  style={styles.iconButton}
                >
                  <Feather name="trash" size={24} color="#ff4f4f" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleEditRoom(item.id)}
                  style={styles.iconButton}
                >
                  <EvilIcons name="pencil" size={30} color="#3498db" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  roomCard: {
    backgroundColor: "white",
    margin: 10,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  roomTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconButton: {
    marginLeft: 10,
  },
  loadingText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
  noRoomsText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
});

export default RoomIndexScreen;
