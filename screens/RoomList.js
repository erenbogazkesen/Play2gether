import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import RoomContext from "./RoomContext"; // RoomContext'in bulunduğu yolu düzenleyin

const RoomList = () => {
  const { data, removeRoomPost } = useContext(RoomContext);

  return (
    <View style={styles.container}>
      {data.map((room) => (
        <View key={room.id} style={styles.roomItem}>
          <Text style={styles.text}>{room.title}</Text>
          <Button title="Sil" onPress={() => removeRoomPost(room.id)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  roomItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  text: {
    fontSize: 18,
  },
});

export default RoomList;
