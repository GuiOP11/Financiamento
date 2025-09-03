import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { usuarioDatabase, visualizarUsuarios, visualizarCarros, verEstruturaTabelas } from '../database/initializeDatabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const database = useSQLiteContext();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const resultado = await usuarioDatabase.fazerLogin(database, email, senha);
    
    if (resultado.success) {
      Alert.alert('Sucesso', 'Login realizado!');
      navigation.navigate('Inicial', { usuario: resultado.usuario });
    } else {
      Alert.alert('Erro', resultado.error);
    }
  };

  // Função para debug do banco de dados
  const handleDebug = async () => {
    try {
      await verEstruturaTabelas(database);
      await visualizarUsuarios(database);
      await visualizarCarros(database);
      Alert.alert('Debug', 'Dados do banco exibidos no console!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao acessar banco de dados');
      console.error('Erro no debug:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão de debug */}
      <TouchableOpacity 
        style={styles.debugButton}
        onPress={handleDebug}
      >
        <Text style={styles.debugText}>👁️ Ver Banco</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>    
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>

      {/* Botão extra para teste rápido */}
      <TouchableOpacity 
        style={styles.testButton}
        onPress={() => {
          setEmail('teste@email.com');
          setSenha('123456');
        }}
      >
        <Text style={styles.testText}>Preencher Teste</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff4dbff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#0b4200ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 16,
    color: '#8A9A5B',
    textDecorationLine: 'underline',
  },
  debugButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  debugText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  testButton: {
    marginTop: 20,
    backgroundColor: '#8A9A5B',
    padding: 8,
    borderRadius: 5,
  },
  testText: {
    color: '#fff',
    fontSize: 12,
  },
});