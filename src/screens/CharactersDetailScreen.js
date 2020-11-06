import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import { Content, Text, H1, Spinner, Card } from "native-base";
import backend from "../api/backend";

const CharactersDetailScreen = ({route, navigation}) => {
    // Obtener el id de la película
    const { id } = route.params;
    const [characters, setCharacters] = useState(null);
    const [error, setError] = useState(false);

    return (
        <View>
            <Text>Prueba</Text>
        </View>
    )
}

export default CharactersDetailScreen;