import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { carroDatabase } from '../database/initializeDatabase';
import * as ImagePicker from 'expo-image-picker';

export default function CadastroCarroScreen({ navigation }) {
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [cor, setCor] = useState('');
  const [ano, setAno] = useState('');
  const [disponivel, setDisponivel] = useState('sim');
  const [km, setKm] = useState('');
  const [placa, setPlaca] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState(null);
  const database = useSQLiteContext();

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const handleCadastroCarro = async () => {
    if (!modelo || !marca || !ano || !placa || !preco) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios: Modelo, Marca, Ano, Placa e Preço');
      return;
    }

    const carroData = {
      modelo,
      marca,
      cor,
      ano: parseInt(ano),
      disponivel,
      km: km ? parseInt(km) : 0,
      placa: placa.toUpperCase(),
      preco: parseFloat(preco),
      imagem
    };

    const resultado = await carroDatabase.cadastrarCarro(database, carroData);
    
    if (resultado.success) {
      Alert.alert('Sucesso', `Carro ${modelo} cadastrado!`);
      
      // Limpa os campos
      setModelo('');
      setMarca('');
      setCor('');
      setAno('');
      setDisponivel('sim');
      setKm('');
      setPlaca('');
      setPreco('');
      setImagem(null);

      // Navega de volta para a tela inicial
      navigation.navigate('Inicial');
    } else {
      Alert.alert('Erro', resultado.error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastrar Carro</Text>

      {imagem && (
        <Image source={{ uri: imagem }} style={styles.imagemPreview} />
      )}

      <TouchableOpacity style={styles.imageButton} onPress={selecionarImagem}>
        <Text style={styles.imageButtonText}>
          {imagem ? 'Alterar Imagem' : 'Selecionar Imagem'}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Modelo *"
        value={modelo}
        onChangeText={setModelo}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Marca *"
        value={marca}
        onChangeText={setMarca}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Cor"
        value={cor}
        onChangeText={setCor}
      />

      <TextInput
        style={styles.input}
        placeholder="Ano *"
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
        placeholder="Quilometragem"
        value={km}
        onChangeText={setKm}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Placa *"
        value={placa}
        onChangeText={setPlaca}
        autoCapitalize="characters"
        maxLength={7}
      />

      <TextInput
        style={styles.input}
        placeholder="Preço * (R$)"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastroCarro}>
        <Text style={styles.buttonText}>Cadastrar Carro</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff4dbff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagemPreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  imageButton: {
    backgroundColor: '#8A9A5B',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    color: '#FFFFFF',
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
    padding: 15,
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
    textAlign: 'center',
  },
});