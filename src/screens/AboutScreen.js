import React from "react";
import { Image, StyleSheet, Dimensions, View, StatusBar, Text, Linking } from "react-native";
import { Container } from "native-base";
import { data } from "../api/data";
import { FontAwesome } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get("window");

const AboutScreen = ({ navigation }) => {
  // Mostrar pantalla solo con gif de carga si no se ha importado la información
  if (!data) {
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
  //https://github.com/leecade/react-native-swiper -> Swiper y sus propiedades
  //https://reactnative.dev/docs/statusbar         -> StatusBar y sus propiedades
  //https://reactnative.dev/docs/linking           -> Colocar links a páginas externas
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
      <View style={styles.dataContainer}>
        <Text style={styles.title}>Avatar: The Last Airbender</Text>
        <Swiper activeDotColor="#ff9642">
        <View style={styles.dataItems}>
            <Image source={data[0].image} style={styles.synopsisImage} />
            <Text style={styles.information}>{data[0].information}</Text>
          </View>
          <View style={styles.dataItems}>
            <Image source={data[1].image} style={styles.informationImage} />
            <Text style={styles.informationTitle}>{data[1].title}</Text>
            <Text style={styles.information}>{data[1].information}</Text>
          </View>
          <View style={styles.dataItems}>
            <Image source={data[2].image} style={styles.informationImage} />
            <Text style={styles.informationTitle}>{data[2].title}</Text>
            <Text style={styles.information}>{data[2].information}</Text>
          </View>
          <View style={styles.dataItems}>
            <Image source={data[3].image} style={styles.informationImage} />
            <Text style={styles.informationTitle}>{data[3].title}</Text>
            <Text style={styles.information}>{data[3].information}</Text>
          </View>
          <View style={styles.dataItems}>
            <Image source={data[4].image} style={styles.informationImage} />
            <Text style={styles.informationTitle}>{data[4].title}</Text>
            <Text style={styles.information}>{data[4].information}</Text>
          </View>
          <View style={styles.dataItems}>
            <Image source={data[5].image} style={styles.informationImage} />
            <Text style={styles.informationTitle}>{data[5].title}</Text>
            <Text style={styles.information}>{data[5].information}</Text>
            
          </View>
          <View style={styles.dataItems}>
            <Image source={data[6].image} style={styles.informationImage} />
            <Text style={styles.informationTitle}>{data[6].title}</Text>
            <Text style={styles.information}>{data[6].information}</Text>
            <Text style={[styles.links, {marginTop: 40}]} onPress={() => Linking.openURL('https://github.com/AmadeusLiz/lastAirbenders')}>GitHub Project</Text>
            <Text style={styles.links} onPress={() => Linking.openURL('https://github.com/AmadeusLiz')}>Follow my GitHub account! :)</Text>
          </View>
        </Swiper>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  dataContainer: {
    position: "absolute",
    width: width * 0.9,
    height: height * 0.75,
    top: height * 0.21,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 2,
    borderColor: "#ff9642",
    borderRadius: 50,
    padding:10,
    justifyContent: "center"
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ff9642",
    textAlign: "center",
    marginBottom:2
  },
  dataItems: {
    paddingHorizontal: 10,
    alignItems: "center"
  },
  synopsisImage: {
    width: 300,
    height: 200,
    marginTop: 10
  },
  informationImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: 15
  },
  informationTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#646464",
    textAlign: "center"
  },
  information: {
    fontSize: 12,
    color: "#646464",
    textAlign: "justify"
  },
  links: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "bold",
    color: "#646464",
    textAlign: "center"
  }
});

export default AboutScreen;