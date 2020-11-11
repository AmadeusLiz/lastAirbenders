//Importar módulos necesarios
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, Dimensions, FlatList, View } from "react-native";
import { Container, Input, Item, H1, Header, Spinner, Card, CardItem, Body } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import backend from "../api/backend";
import { TouchableOpacity } from "react-native-gesture-handler";

//Obtener valores del ancho y alto del dispositivo
const { width, height } = Dimensions.get("window");

//Variable que contiene la pantalla
const CharactersListScreen = ({ navigation }) => {
  //Hook para el estado de las canciones
  const [characters, setCharacters] = useState(null);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState(false);

  const getCharacters = async () => {
    //Consulta a la API AVATAR THE LAST AIRBENDER
    try {
      //Consulta personajes random
      const response = await backend.get(`/random?count=10`);
      setCharacters(response.data);
    } catch (error) {
      // Error al momento de ejecutar la petición a la API
      setError(true);
    }
  }

  //Verificar si hay información en el input para la búsqueda
  const handlerSearch = () => {
    if (!search) setSearchError(true); //Activara el estilo de inputError y no dejara hacer la búsqueda hasta ingresar texto
    else {
      navigation.navigate("charactersResults", { search });
      setSearch(""); //Al regresar ya no estara el texto que se habia buscado
      setSearchError(false); //Cuando ya haya texto en el recuadro de búsqueda se quita el searchError
    }
  };

  //Hook de Efecto
  useEffect(() => {
    //Efecto secundario, realizar la petición a la API
    getCharacters();
  }, []);

  //Para manejar cuando search tenga valor y asi se quite el estilo de inputError en el searchBar
  useEffect(() => {
    //Si hay valor en search se quita el estilo de inputError colocando en falso el searchError
    if (search) setSearchError(false);
  },[search]);

  if (!characters) {
    return (
      <View style = {{ flex: 1, justifyContent: "center" }}>
        <Spinner color = "#f05454" />
      </View>
    );
  }

  return (
    <Container>
      <Header searchBar backgroundColor="#f05454">
        <Item>
          <Input
            placeholder = "¡Busca un personaje!"
            value = {search}
            onChangeText = {setSearch}
            style = {searchError ? inputError : null}
          />
          <FontAwesome.Button
            backgroundColor = "transparent"
            name = "search"
            size = {25}
            color = "#214252"
            onPress = {() => {
              handlerSearch;
            }}
          />
        </Item>
      </Header>
      <Image
        source = {require("../../assets/lastAirbendersLogo.png")}
        style = {styles.logoImage}
      />
      <H1>Personajes del día</H1>
      <FlatList
        data = {characters}
        keyExtractor = {(item) => item._id}
        ListEmptyComponent = {<Text>¡No se han encontrado personajes!</Text>}
        renderItem = {({ item }) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("charactersDetail", {
                    id: item._id,
                    name: item.name,
                  })
                }
              >
                <Card>
                  <CardItem cardBody>
                    <Image
                      source = {
                        item.photoUrl
                          ? { uri: `${item.photoUrl}` }
                          : require("../../assets/lastAirbendersLogo.png")
                      }
                      style = {
                        item.photoUrl
                          ? styles.characterImage
                          : styles.imageNotFound
                      }
                    />
                  </CardItem>
                  <CardItem cardBody>
                    <Body>
                      <Text>{item.name}</Text>
                      <Text>{item.affiliation}</Text>
                      <Text>{item.gender}</Text>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </Container>
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
    width: width *0.99,
    height: height * 0.5,
  },
  imageNotFound: {
    width: width *0.99,
    height: height * 0.5,
    resizeMode: "contain",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  }
});

export default CharactersListScreen;