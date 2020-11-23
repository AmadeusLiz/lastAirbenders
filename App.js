import React from 'react';
import CharactersListScreen from './src/screens/CharactersListScreen';
import CharactersResultsScreen from "./src/screens/CharactersResultsScreen";
import AboutScreen from "./src/screens/AboutScreen";
import CharactersDetailScreen from "./src/screens/CharactersDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Navegacion bajada en stack
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="charactersList">
        <Stack.Screen name="charactersList" component={CharactersListScreen} options={{headerShown:false}}/>
        <Stack.Screen name="charactersResults" component={CharactersResultsScreen} options={{headerShown:false}}/>
        <Stack.Screen name="charactersDetail" component={CharactersDetailScreen} options={{headerShown:false}}/>
        <Stack.Screen name="about" component={AboutScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}