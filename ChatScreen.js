import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { db } from "./firebaseConfig";
import { useRoute } from "@react-navigation/native";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const roomId = route.params?.roomId; // Optional chaining ile roomId'yi alın

  // roomId'nin geçerli olduğunu kontrol edin (string veya number olabilir)
  useEffect(() => {
    if (!roomId) {
      // roomId'nin tanımlı ve sıfır olmadığını kontrol edin
      console.error("Geçersiz veya tanımsız roomId:", roomId);
      return; // Geçersiz roomId için erken dönüş
    }

    const unsubscribe = db
      .collection("rooms")
      .doc(String(roomId)) // roomId'yi string'e çevir
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    if (!roomId) {
      console.error("Geçersiz veya tanımsız roomId:", roomId);
      return; // Geçersiz roomId için erken dönüş
    }

    try {
      await db
        .collection("rooms")
        .doc(String(roomId))
        .collection("messages")
        .add({
          text: message,
          createdAt: new Date(),
        });
      setMessage("");
    } catch (error) {
      console.error("Mesaj gönderilirken hata oluştu: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <Text key={msg.id} style={styles.message}>
            {msg.text} {/* Mesaj metnini göster */}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  onlineStatus: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#ddffdd",
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: "#cccccc",
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default ChatScreen;
