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
  const [allies,setAllies] = useState(null);
  const [enemies, setEnemies] = useState(null);

  // Obtener la información del personaje
  const getCharactersDetail = async () => {
    //Obtener el id del caracter
    try {
      const response = await backend.get(`/${id}`);
      setCharacters(response.data);
      //obtener lista de aliados y enemigos del personaje, a veces en el response solo se brinda un nombre o dos, por eso hacemos busqueda aparte
      const dataAllies = (await backend.get(`?allies=${name}`));
      //si hay datos se colocan en los arreglos correspondientes, de lo contrario seran arreglos vacios para posteriormente comprobar si hay o no datos en ellos
      if (dataAllies.data.length) setAllies(dataAllies.data);
      else setAllies([]);
      const dataEnemies = await backend.get(`?enemies=${name}`);
      if (dataEnemies.data.length) setEnemies(dataEnemies.data);
      else setEnemies([]);
    } catch (error) {
      setError(true);
    }
  };

  //Efecto secundario que ejecuta la consulta a la API
  useEffect(() => {
    getCharactersDetail();
  }, []);

  //Si todavia no hay datos en characters, enemies o allies
  if (!characters || !enemies || !allies) {
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
            <Text>ALLIES</Text>
            {
              allies.length 
                ? allies.map((allie) => (
                  <Text key={allie._id}>{allie.name}</Text>
                ))
                : <Text>Allies not defined</Text>
            }
            <Text>ENEMIES</Text>
            {
              enemies.length 
                ? enemies.map((enemie) => (
                  <Text key={enemie._id}>{enemie.name}</Text>
                ))
                : <Text>Enemies not defined</Text>
            }
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
};

const styles = StyleSheet.create({
  characterImage: {
    width: width *0.99,
    height: height * 0.5,
  },
  imageNotFound: {
    width: width *0.99,
    height: height * 0.5,
    resizeMode: "contain",
  },
});

export default CharactersDetailScreen;