import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions, View } from "react-native";
import { Content, Text, H1, Spinner, Card, CardItem, Body } from "native-base";
import backend from "../api/backend";

const { width, height } = Dimensions.get("window");

const CharactersDetailScreen = ({ route, navigation }) => {
  // Obtener el id de la película
  const { id, name } = route.params;
  const [characters, setCharacters] = useState(null);
  const [error, setError] = useState(false);
  const allies = [];
  const enemies = [];

  // Obtener la información del personaje
  const getCharactersDetail = async () => {
    //Obtener el id del caracter
    try {
      const response = await backend.get(`/${id}`);
      setCharacters(response.data);
      //obtener lista de aliados y enemigos del personaje
      allies.push(await backend.get(`?allies=${name}`));
      //obtener lista de aliados y enemigos del personaje
      enemies.push(await backend.get(`?enemies=${name}`));
    } catch (error) {
      setError(true);
    }
  };

  getCharactersDetail();

  //Efecto secundario que ejecuta la consulta a la API
  useEffect(() => {
    getCharactersDetail();
  }, []);

  //Si todavia no hay datos en characters
  if (!characters) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="#f05454" />
      </View>
    );
  }

  return (
    <Content>
      <H1>{characters.name}</H1>
      <Card>
        <CardItem cardBody>
          <Image
            source={
              characters.photoUrl
                ? { uri: `${characters.photoUrl}` }
                : require("../../assets/lastAirbendersLogo.png")
            }
            style={
              characters.photoUrl ? styles.characterImage : styles.imageNotFound
            }
          />
        </CardItem>
        <CardItem cardBody>
          <Body>
            <Text>{characters.name}</Text>
            <Text>{characters.affiliation}</Text>
            <Text>Gender - {characters.gender}</Text>
            { characters.weapon 
                ? <Text>Weapon - {characters.weapon}</Text>
                : <Text>Weapon not defined</Text>
            }
            {
              allies > 1 
              ? allies.data.forEach(allie => (
                  <Text>{allie.name}</Text>
                ))
              : <Text>Allie - {characters.allies}</Text>
            }
            {
              enemies > 1 ? 
                enemies.data.forEach(enemie => (
                <Text>{enemie.name}</Text>
                ))
              : <Text>Enemie - {characters.enemies}</Text>
            }
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
};

const styles = StyleSheet.create({
  characterImage: {
    width: width, //*0.99
    height: height * 0.5,
  },
  imageNotFound: {
    width: width, //*0.99
    height: height * 0.5,
    resizeMode: "contain",
  },
});

export default CharactersDetailScreen;