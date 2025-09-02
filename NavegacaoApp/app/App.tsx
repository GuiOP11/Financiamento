import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from '../database/initializeDatabase';

import LoginScreen from '../screens/LoginScreen';
import InicialScreen from '../screens/InicialScreen';
import CadastroScreen from '../screens/CadastroScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import CadastroCarroScreen from '../screens/CadastroCarroScreen'; 
import FinanciamentoScreen from '../screens/FinanciamentoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Inicial" 
            component={InicialScreen} 
            options={{ title: 'Catálogo de Carros' }} 
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
          <Stack.Screen 
            name="CadastroCarro" 
            component={CadastroCarroScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Financiamento" 
            component={FinanciamentoScreen} 
            options={{ title: 'Simular Financiamento' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}