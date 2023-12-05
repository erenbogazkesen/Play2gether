import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const ShowRoomScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // route.params ile geçiş parametrelerine erişim
  const { id, title } = route.params || {};

  return (
    <View style={styles.container}>
      <Text>Show Screen</Text>
      <Text>ID: {id}</Text>
      <Text>Title: {title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // Diğer stil tanımlamalarınız burada olabilir
});

export default ShowRoomScreen;
