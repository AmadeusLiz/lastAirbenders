//Importar módulos necesarios
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, Dimensions, FlatList, View } from "react-native";
import { Container, Input, Item, H1, Header, Spinner, Card, CardItem, Body } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

//Obtener valores del ancho y alto del dispositivo
const { width, height } = Dimensions.get("window");

//Variable que contiene la pantalla
const CharactersListScreen = () => {

  //Hook para el estado de las canciones
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const getCharacters = async () => {
    //Consulta a la API AVATAR THE LAST AIRBENDER
    try {
      //Consulta personajes random 
      
    } catch (error) {
      
    }
  }

  //Hook de Efecto
  useEffect (() =>{
    //Efecto secundario, realizar la petición a la API
    getCharacters();
  },[]);


  if (!characters) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="#f05454" />
      </View>
    );
  }

  return (
    <View>
      
      <H1>Personajes del día</H1>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: width,
    height: height * 0.15,
    resizeMode: "contain",
  },
  characterImage: {
    width: width, //*0.99
    height: height * 0.5,
  }
});

export default CharactersListScreen;