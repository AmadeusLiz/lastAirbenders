//Importar módulos necesarios
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, Dimensions, FlatList, View,StatusBar } from "react-native";
import { Container, Input} from "native-base";
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
      const response = await backend.get(`/random?count=30`);
      setCharacters(response.data);
    } catch (error) {
      // Error al momento de ejecutar la petición a la API
      setError(true);
    }
  }

  //Verificar si hay información en el input para la búsqueda
  const handlerSearch = () => {
    if (!search){
      setSearchError(true);
    }  //Activara el estilo de inputError y no dejara hacer la búsqueda hasta ingresar texto
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
      <View style={styles.loading}>
        <Image 
          source= {require("../../assets/loadingImage.gif")}
          style= {styles.loadingImage}
        />
      </View>
    );
  }

  return (
    <Container style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true}/>
      <View style={styles.header}>
        <View style={styles.headerDesignYellow}></View>
        <View style={styles.headerDesignWhite}>
          <Image
            source={require("../../assets/lastAirbendersLogo.png")}
            style={styles.logo}
          />
          <View style={styles.textInputContainer}>
            <Input
              style={searchError ? styles.inputError : styles.textInput}
              placeholder="Let's search a character!..."
              value={search}
              onChangeText={setSearch}
            />
            {console.log(search)}
            <FontAwesome.Button
              style={{ flex: 1 }}
              backgroundColor="white"
              borderRadius= {50}
              color="#ff9642"
              name="search"
              size={25}
              onPress={handlerSearch}
            />
          </View>
        </View>
      </View>
      <View style={styles.content}>
        {/* //https://reactnative.dev/docs/stylesheet#absolutefillobject*/}
        <View style={styles.contentDesignWhite}></View>
        <View style={styles.contentDesignOrange}></View>
        <View style={styles.contentDesignYellow}></View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerDesignYellow}></View>
        <View style={styles.footerDesignOrange}></View>
      </View>
      <View style= {styles.charactersContainer}>
        <Text style={styles.title}>Characters of the day</Text>
        <FlatList
          data = {characters}
          keyExtractor = {(item) => item._id}
          ListEmptyComponent = {<Text>No characters found!</Text>}
          renderItem = {({ item }) => {
            return (
              <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("charactersDetail", {
                      id: item._id,
                      name: item.name,
                    })
              }>
                <View style={styles.charactersItems}>
                    <Image 
                      source = {
                      item.photoUrl
                        ? { uri: `${item.photoUrl}` }
                        : require("../../assets/unknownCharacter.png")
                      }
                      style = {styles.charactersImage}
                    />
                    <View style={styles.charactersInformationContainer}>
                      <Text style={styles.charactersName}>{item.name}</Text>
                      {
                        item.affiliation
                          ? <Text style={styles.charactersNation}>{item.affiliation}</Text>
                          : null
                      }                  
                    </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />      
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: width,
    height: height * 0.3,
    resizeMode: "contain",
  },
  header: {
    flex: 2,
    backgroundColor: "white",
    borderBottomRightRadius: 100
  },
  headerDesignYellow: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "#ffe05d"
  },
  headerDesignWhite: {
    flex: 2, 
    backgroundColor: "white", 
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems:"center"
  },
  textInputContainer: {
    flexDirection:"row",
    alignContent:"center",
    position:"absolute",
    top: height * 0.25,
    width: width * 0.9,
    paddingLeft: 20,
    borderWidth: 2,
    borderColor: "#ff9642",
    borderRadius:100,
  },
  textInput: {
    flex: 2,
    fontSize: 14,
    color: "#646464"
  },
  content: {
    flex: 1,
    backgroundColor: "#fff8cd",
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 100
  },
  contentDesignWhite: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "white"
  },
  contentDesignOrange: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "#ff9642", 
    borderTopLeftRadius: 100
  },
  contentDesignYellow: {
    flex: 1, 
    backgroundColor: "#ffe05d", 
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 100
  },
  footer: {
    flex: 1,
    backgroundColor: "#ff9642",
    borderTopLeftRadius: 100
  },
  footerDesignYellow: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "#ffe05d"
  },
  footerDesignOrange: {
    flex: 1, 
    backgroundColor: "#ff9642", 
    borderTopLeftRadius:100
  },
  charactersContainer: {
    flex:1,
    position: "absolute",
    width: width * 0.9,
    height: height * 0.6,
    top: height * 0.33,
    left: 20,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#ff9642",
    borderRadius: 50,
    padding:10
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ff9642",
    textAlign: "center",
    marginBottom:2
  },
  charactersItems: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 15
  },
  charactersImage: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: "#ff9642",
    borderRadius: 40,
    marginRight: 10
  },
  charactersInformationContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingRight:12,
  },
  charactersName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#646464",
    textAlign: "center"
  },
  charactersNation: {
    fontSize: 11,
    color: "#646464",
    textAlign: "center"
  },
  logoImage: {
    width: width,
    height: height * 0.15,
    resizeMode: "contain",
  },
  inputError: {
    borderColor: "red",
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  loading: {
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

export default CharactersListScreen;