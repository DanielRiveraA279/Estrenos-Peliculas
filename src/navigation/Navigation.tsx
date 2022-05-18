import * as React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { Movie } from '../interfaces/movieInteface';

//interface para la data que van a manejar cada screens
export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Movie //recibe el tipado para utilizar las propiedades de las interfaces
}

const Stack = createNativeStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
  
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>

  );
}
