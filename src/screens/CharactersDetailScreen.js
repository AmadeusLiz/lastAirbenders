import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions, View } from "react-native";
import { Content, Text, H1, Spinner, Card } from "native-base";
import backend from "../api/backend";

const { width, height } = Dimensions.get("window");

const CharactersDetailScreen = ({ route, navigation }) => {
  // Obtener el id de la película
  const { id } = route.params;
  const [characters, setCharacters] = useState(null);
  const [error, setError] = useState(false);

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CharactersDetailScreen;