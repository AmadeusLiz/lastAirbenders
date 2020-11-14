import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions, View, ImageBackground } from "react-native";
import { Text, Spinner} from "native-base";
import backend from "../api/backend";
import { FontAwesome } from '@expo/vector-icons';
import { FlatList } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
let imageRoute = "";

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
      if (response.data.affiliation){
        if (response.data.affiliation.includes("Air"))
          imageRoute =  require("../../assets/airHeader.png");
        else if (response.data.affiliation.includes("Spirit"))
          imageRoute = require("../../assets/spiritHeader.png");
        else if (response.data.affiliation.includes("Earth") || response.data.affiliation.includes("Metal"))
          imageRoute = require("../../assets/earthHeader.png");
        else if (response.data.affiliation.includes("Water"))
          imageRoute = require("../../assets/waterHeader.png");
        else if (response.data.affiliation.includes("Fire"))
          imageRoute = require("../../assets/fireHeader.png");
        else imageRoute = require("../../assets/notDefinedHeader.png");
      }           
      else imageRoute = require("../../assets/notDefinedHeader.png");

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
  if (!characters || !enemies || !allies || !imageRoute ) {
    return (
      
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="#f05454" />
      </View>
    );
  }

//#TODO use the require en la parte de arriba y abajo en el source solo darle el path a source normal.
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageRoute}
        style={{ flex: 1, alignItems: "center" }}
        resizeMode="stretch"
      >
        <View style={styles.imageContainer}>
          <Image
            source={
              characters.photoUrl
                ? { uri: `${characters.photoUrl}` }
                : require("../../assets/lastAirbendersLogo.png")
            }
            style={styles.characterImage}
          />
        </View>        
        <View style={styles.backHome}>
          <FontAwesome
            name="chevron-left"
            size={24}
            color="white"
            onPress={() => navigation.goBack()} //https://reactnavigation.org/docs/navigating/ (Going back)
          />
        </View>
      </ImageBackground>
      <View style={styles.characterInformation}>
        <Text style={styles.characterName}>{characters.name.toUpperCase()}</Text>
        { 
          characters.profession 
          ? <Text style={styles.characterProfession}>{characters.profession}</Text>
          : null
        }
        <View>
          <Text style={styles.titles}>ALLIES</Text>
          <FlatList
            data={allies}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={<Text style={styles.allieNation}>No allies have been found!</Text>}
            renderItem={({ item }) => {
              return (
              <View style={styles.alliesEnemiesContainer}>
                <Image 
                  source = {
                    item.photoUrl
                      ? { uri: `${item.photoUrl}` }
                      : require("../../assets/lastAirbendersLogo.png")
                  }
                  style = {styles.alliesImage}
                />
                <View style={styles.alliesInformationContainer}>
                  <Text style={styles.allieName}>{item.name}</Text>
                  {
                    characters.affiliation 
                      ? <Text style={styles.allieNation}>{item.affiliation}</Text>
                      : null
                  }                  
                </View>
              </View>
              );
            }}
          />
          <Text style={styles.titles}>ENEMIES</Text>
          <FlatList
            data={enemies}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={<Text style={styles.allieNation}>No enemies have been found!</Text>}
            renderItem={({ item }) => {
              return (
              <View style={styles.alliesEnemiesContainer}>
                <View style={styles.enemiesInformationContainer}>
                  <Text style={styles.allieName}>{item.name}</Text>
                  {
                    characters.affiliation 
                      ? <Text style={styles.allieNation}>{item.affiliation}</Text>
                      : null
                  }                  
                </View>
                <Image 
                  source = {
                    item.photoUrl
                      ? { uri: `${item.photoUrl}` }
                      : require("../../assets/lastAirbendersLogo.png")
                  }
                  style = {styles.enemiesImage}
                />
              </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const heightImageCharacter = height * 0.5 * 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  characterInformation: {
    flex:1,
    paddingHorizontal: 20,
    // backgroundColor:"black",
  },
  characterName: {
    color: "#646464",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  characterProfession: {
    color: "#646464",
    fontSize: 15,
    textAlign: "center",
  },
  characterText: {
    color: "#646464",
    fontSize: 15,
    textAlign: "center",
  },
  titles: {
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical:10
  },
  alliesEnemiesContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 20
  },
  alliesImage: {
    width: 80,
    height: 80,
    borderWidth: 5,
    borderColor: "#7ea04d",
    borderRadius: 40,
    marginRight: 10
  },
  alliesInformationContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingRight:12,
    borderRightWidth: 1,
    borderRightColor: "#7ea04d",
  },
  enemiesImage: {
    width: 80,
    height: 80,
    borderWidth: 5,
    borderColor: "#af2d2d",
    borderRadius: 40,
    marginLeft: 10
  },
  enemiesInformationContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft:12,
    borderLeftWidth: 1,
    borderLeftColor: "#af2d2d",
  },
  allieName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center"
  },
  allieNation: {
    fontSize: 13,
    color: "black",
    textAlign: "center"
  },
  imageContainer: {
    width: heightImageCharacter,
    height: heightImageCharacter,
    marginTop: heightImageCharacter/2,
  },
  characterImage: {
    width: "100%",
    height: "100%",
    borderWidth: 5,
    borderColor: "white",
    borderRadius: heightImageCharacter/2
  },
  imageNotFound: {
    width: width *0.99,
    height: height * 0.5,
    resizeMode: "contain",
  },
  backHome: {
    position:'absolute',
    left:0,
    marginTop:30,
    marginLeft:15
  },

});

export default CharactersDetailScreen;