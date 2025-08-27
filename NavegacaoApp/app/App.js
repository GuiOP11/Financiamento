import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import InicialScreen from '../screens/InicialScreen';
import CadastroScreen from '../screens/CadastroScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import CadastroCarroScreen from '../screens/CadastroCarroScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Inicial" 
          component={InicialScreen} 
          options={{ title: 'Catálogo de Carros' }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CarDetails" 
          component={CarDetailsScreen} 
          options={{ title: 'Detalhes do Carro' }} 
        />
        {/* Adicionei a sua nova tela de Cadastro de Carro aqui! */}
        <Stack.Screen 
          name="CadastroCarro" 
          component={CadastroCarroScreen} 
          options={{ headerShown: false }} // Ou customize como desejar
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
