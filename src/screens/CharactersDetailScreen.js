import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions, View, ImageBackground, ScrollView, StatusBar } from "react-native";
import { Text, Container} from "native-base";
import backend from "../api/backend";
import { FontAwesome } from '@expo/vector-icons';
import {getRoute} from "../api/getRoute";

const { width, height } = Dimensions.get("window");
const imageRoute = { route: "", color: ""};

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
      //Petición para obtener la información del personaje seleccionado, id enviado a través del navigator.navigate()
      const response = await backend.get(`/${id}`);
      setCharacters(response.data);

      //Definir la imagen de fondo para el personaje dependiendo de la nación a la que pertenece   
      const responseFunction = getRoute(response.data.affiliation);
      imageRoute.route = responseFunction[0];
      imageRoute.color = responseFunction[1];

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
  if (!characters || !enemies || !allies || !imageRoute.route ) {
    return (
      <View style = {styles.loadingContainer}>
        <Image 
          source= {require("../../assets/loadingImage.gif")}
          style= {styles.loadingImage}
        />
      </View>
    );
  }

  //https://reactnative.dev/docs/imagebackground -> para utilizar una imagen de fondo, documentación de react native.
  return (
    <Container style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={imageRoute.route}
        style={styles.imageBackgroundContainer}
      >
        <View style={styles.characterImageContainer}>
          <Image
            source={
              characters.photoUrl
                ? { uri: `${characters.photoUrl}` }
                : require("../../assets/unknownCharacter.png")
            }
            style={styles.characterImage}
          />
        </View>
        <View style={styles.backHomeButton}>
          <FontAwesome
            name="chevron-left"
            size={24}
            color="white"
            onPress={() => navigation.goBack()} //https://reactnavigation.org/docs/navigating/ (Going back)
          />
        </View>
      </ImageBackground>
      <View style={styles.characterInformationContainer}>
        <Text style={[styles.characterName, { color: imageRoute.color }]}>
          {characters.name.toUpperCase()}
        </Text>
        {characters.profession ? (
          <Text
            style={[styles.characterProfession, { color: imageRoute.color }]}
          >
            {characters.profession}
          </Text>
        ) : null}
        <ScrollView>
          <Text style={styles.titles}>ALLIES</Text>
          {allies.length ? (
            allies.map((allie) => (
              <View style={styles.alliesEnemiesItems} key={allie._id}>
                <Image
                  source={
                    allie.photoUrl
                      ? { uri: `${allie.photoUrl}` }
                      : require("../../assets/unknownCharacter.png")
                  }
                  style={styles.alliesImage}
                />
                <View style={styles.alliesInformationContainer}>
                  <Text style={styles.alliesEnemiesName}>{allie.name}</Text>
                  {allie.affiliation ? 
                    <Text style={styles.allieEnemieNation}>{allie.affiliation}</Text>
                    : null
                  }
                </View>
              </View>
            ))
          ) 
          : <Text style={styles.noDataFound}>No allies found!</Text>
          }
          <Text style={styles.titles}>ENEMIES</Text>
          {enemies.length ? 
            enemies.map((enemie) => (
              <View style={styles.alliesEnemiesItems} key={enemie._id}>
                <View style={styles.enemiesInformationContainer}>
                  <Text style={styles.alliesEnemiesName}>{enemie.name}</Text>
                  {enemie.affiliation ? 
                    <Text style={styles.allieEnemieNation}>{enemie.affiliation}</Text>
                    : null}
                </View>
                <Image
                  source={
                    enemie.photoUrl
                      ? { uri: `${enemie.photoUrl}` }
                      : require("../../assets/unknownCharacter.png")
                  }
                  style={styles.enemiesImage}
                />
              </View>
            ))
            : <Text style={styles.noDataFound}>No enemies found!</Text>
          }
        </ScrollView>
      </View>
    </Container>
  );
};

const heightImageCharacter = height * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageBackgroundContainer: {
    flex: 1, 
    alignItems: "center",    
    resizeMode: "stretch",
    paddingHorizontal: 10
  },
  characterImage: {
    width: "100%",
    height: "100%",
    borderWidth: 5,
    borderColor: "white",
    borderRadius: heightImageCharacter/2
  },
  backHomeButton: {
    position: 'absolute',
    left: 0,
    marginTop: 30,
    marginLeft: 15
  },
  characterInformationContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  characterName: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -30
  },
  characterProfession: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20
  },
  titles: {
    fontWeight: "bold",
    color: "#646464",
    paddingLeft: 20,
    marginBottom: 5
  },
  alliesEnemiesItems: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  alliesImage: {
    width: 80,
    height: 80,
    borderWidth: 3,
    borderColor: "#7ea04d",
    borderRadius: 40,
    marginRight: 10
  },
  alliesInformationContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: "#7ea04d"
  },
  enemiesImage: {
    width: 80,
    height: 80,
    borderWidth: 3,
    borderColor: "#af2d2d",
    borderRadius: 40,
    marginLeft: 10
  },
  enemiesInformationContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: "#af2d2d"
  },
  alliesEnemiesName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#646464",
    textAlign: "center"
  },
  allieEnemieNation: {
    fontSize: 13,
    color: "#646464",
    textAlign: "center"
  },
  noDataFound: {
    fontSize: 20,
    color: "#646464",
    textAlign: "center",
    marginVertical: 20
  },
  characterImageContainer: {
    width: heightImageCharacter,
    height: heightImageCharacter,
    marginTop: heightImageCharacter/2
  },
  loadingContainer: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff8cd"
  },
  loadingImage: {
    width: width * 0.70,
    height: height * 0.70,
    resizeMode: "contain"
  }
});

export default CharactersDetailScreen;