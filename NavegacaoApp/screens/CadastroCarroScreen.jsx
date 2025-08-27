import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function CadastroCarroScreen({ navigation }) {
  // Estados para armazenar os dados do carro
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [cor, setCor] = useState('');
  const [ano, setAno] = useState('');
  const [disponivel, setDisponivel] = useState('');
  const [km, setKm] = useState('');
  const [placa, setPlaca] = useState('');

  // Função para lidar com o cadastro do carro
  const handleCadastroCarro = () => {
    // Verificação básica dos campos
    if (!modelo || !marca || !ano || !placa) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios: Modelo, Marca, Ano e Placa.');
      return;
    }

    // Aqui você pode conectar com seu backend ou banco de dados (ex: Firestore)
    // Exemplo de objeto de dados do carro:
    const carroData = {
      modelo: modelo,
      marca: marca,
      cor: cor,
      ano: parseInt(ano), 
      disponivel: disponivel,
      km: km,
      placa: placa,
    };

    // Demonstrativo de sucesso
    Alert.alert('Sucesso', `Carro ${modelo} (${placa}) cadastrado!`);

    // Aqui você enviaria 'carroData' para o seu banco de dados
    console.log('Dados do carro para cadastro:', carroData);

    // Limpa os campos após o envio
    setModelo('');
    setMarca('');
    setCor('');
    setAno('');
    setDisponivel('');
    setKm('');
    setPlaca('');

    // Exemplo de navegação para a tela inicial após o cadastro
    // navigation.navigate('Inicial'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Carro</Text>

      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Cor"
        value={cor}
        onChangeText={setCor}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Ano"
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
        maxLength={4} 
      />

      <TextInput
        style={styles.input}
        placeholder="Disponível (sim/não)"
        value={disponivel}
        onChangeText={setDisponivel}
      />

      <TextInput
        style={styles.input}
        placeholder="Km"
        value={km}
        onChangeText={setKm}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Placa"
        value={placa}
        onChangeText={setPlaca}
        autoCapitalize="characters"
        maxLength={7} 
      />
      
      <TouchableOpacity style={styles.button} onPress={handleCadastroCarro}>
        <Text style={styles.buttonText}>Cadastrar Carro</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff4dbff', // Padrão de cor de fundo
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
  },
  button: {
    width: '100%',
    backgroundColor: '#0b4200ff', // Padrão de cor do botão
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF', // Cor do texto do botão
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 16,
    color: '#8A9A5B', // Padrão de cor do link
    textDecorationLine: 'underline',
  },
});
