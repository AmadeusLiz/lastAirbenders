import React from 'react';
import CharactersListScreen from './src/screens/CharactersListScreen';
import CharactersResultsScreen from "./src/screens/CharactersResultsScreen";
import CharactersDetailScreen from "./src/screens/CharactersDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Navegacion bajada en stack
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="charactersList" component={CharactersListScreen}/>
        {/* <Stack.Screen name="charactersResults" component={CharactersResultsScreen}/> */}
        <Stack.Screen name="charactersDetail" component={CharactersDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}