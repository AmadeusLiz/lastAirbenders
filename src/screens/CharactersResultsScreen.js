import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Image, StatusBar } from "react-native";
import { Container } from "native-base";
import backend from "../api/backend";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

const CharactersResultsScreen = ({ route, navigation }) => {
  // Obtener desde los parámetros de la navegación el término de búsqueda
  const { search } = route.params;

  //Hook de estado para los personajes
  const [characters, setCharacters] = useState(null);
  const [error, setError] = useState(false);

  // Obtiene los personajes que coinciden con el término de búsqueda
  const getSearchCharacters = async () => {
    try {
      const response = await backend.get(`?name=${search}`);
      setCharacters(response.data);
    } catch (error) {
      setError(true);
    }
  };

  // Efecto para comunicarnos con el API y buscar los personajes
  useEffect(() => {
    getSearchCharacters();
  }, []);

  // Mostrar pantalla solo con gif de carga si la API no ha dado respuesta
  if (!characters) {
    return (
      <View style={styles.loading}>
        <Image
          source={require("../../assets/loadingImage.gif")}
          style={styles.loadingImage}
        />
      </View>
    );
  }

  //https://reactnative.dev/docs/stylesheet#absolutefillobject -> Cómo usar la propiedad
  //https://reactnavigation.org/docs/navigating/ -> (Going back) para no especificar el nombre de la pantalla a regresar, sino solo hacerlo directamente a la pantlala anterior.
  return (
    <Container style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true} />
      <View style={styles.header}>
        <View style={styles.headerDesignYellow}/>
        <View style={styles.headerDesignWhite}>
          <Image
            source={require("../../assets/lastAirbendersLogo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.backHomeButton}>
          <FontAwesome
            name="chevron-left"
            size={24}
            color="#ff9642"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.contentDesignWhite}/>
        <View style={styles.contentDesignOrange}/>
        <View style={styles.contentDesignYellow}/>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerDesignYellow}/>
        <View style={styles.footerDesignOrange}/>
      </View>
      <View style={styles.charactersContainer}>
        <Text style={styles.title}>Characters found: {characters.length}</Text>
        <FlatList
          data={characters}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<Text style={styles.noDataFound}>No characters found!</Text>}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("charactersDetail", {
                    id: item._id,
                    name: item.name,
                  })
                }
              >
                <View style={styles.charactersItems}>
                  <Image
                    source={
                      item.photoUrl
                        ? { uri: `${item.photoUrl}` }
                        : require("../../assets/unknownCharacter.png")
                    }
                    style={styles.charactersImage}
                  />
                  <View style={styles.charactersInformationContainer}>
                    <Text style={styles.charactersName}>{item.name}</Text>
                    {item.affiliation ? (
                      <Text style={styles.charactersNation}>
                        {item.affiliation}
                      </Text>
                    ) : null}
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff8cd",
  },
  loadingImage: {
    width: width * 0.7,
    height: height * 0.7,
    resizeMode: "contain",
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
  backHomeButton: {
    position: 'absolute',
    left: 0,
    marginTop: 40,
    marginLeft: 15
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
    height: height * 0.75,
    top: height * 0.21,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
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
  noDataFound: {
    fontSize: 20,
    color: "#646464",
    textAlign: "center",
    marginVertical: 20
  }
});

export default CharactersResultsScreen;