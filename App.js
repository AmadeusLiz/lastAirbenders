import React from 'react';
import CharactersListScreen from './src/screens/CharactersListScreen';
import CharactersResultsScreen from "./src/screens/CharactersResultsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Navegacion bajada en stack
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="pantallaPrincipal" component={CharactersListScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}