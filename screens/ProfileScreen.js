import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { logout } from "../firebaseConfig";
const ProfileScreen = ({ navigation }) => {
  const [selectedGames, setSelectedGames] = useState({
    csGo: false,
    lol: false,
    valorant: false,
  });

  const handleGameSelection = (game) => {
    setSelectedGames((prevState) => ({
      ...prevState,
      [game]: !prevState[game],
    }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace("Login"); // Kullanıcıyı giriş ekranına yönlendir
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu: ", error.message);
      // Hata mesajını işleyebilir veya kullanıcıya gösterebilirsiniz
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profil Ekranı</Text>

      <View style={styles.gameSelectionSection}>
        <Text style={styles.sectionTitle}>Oyunlar</Text>
        {Object.entries(selectedGames).map(([game, isSelected]) => (
          <TouchableOpacity
            key={game}
            style={[styles.gameButton, isSelected && styles.selectedGame]}
            onPress={() => handleGameSelection(game)}
          >
            <Text style={styles.gameText}>{game.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.logoutSection}>
        <Button title="Çıkış Yap" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ADD8E6", // Açık mavi arka plan rengi
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  gameSelectionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  gameButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  selectedGame: {
    backgroundColor: "#b0e0e6",
  },
  gameText: {
    textAlign: "center",
    fontSize: 16,
  },
  logoutSection: {
    marginTop: 20,
  },
});

export default ProfileScreen;
