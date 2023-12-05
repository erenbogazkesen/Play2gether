import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const GameDetails = ({ imageSource, title, score }) => {
  return (
    <View>
      <Image source={imageSource} style={styles.image} />
      <Text>{title}</Text>
      <Text>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 250, // İstenilen genişlik
    height: 150, // İstenilen yükseklik
  },
});

export default GameDetails;
