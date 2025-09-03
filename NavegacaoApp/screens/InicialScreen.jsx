import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useSQLiteContext } from 'expo-sqlite';
import { carroDatabase } from '../database/initializeDatabase';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [carros, setCarros] = useState([]);
  const database = useSQLiteContext();

  // Carros padrão que já estavam no código
  const carrosPadrao = [
    {
      id: "1",
      titulo: "Chevrolet Caravan",
      modelo: "Caravan",
      marca: "Chevrolet",
      preco: 85000,
      ano: 2025,
      cor: "Prata",
      imagem: "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202501/20250122/chevrolet-caravan-4.1-comodoro-sle-12v-alcool-2p-manual-wmimagem11333234950.jpg?s=fill&w=1920&h=1440&q=75",
      placa: "ABC1D23"
    },
    {
      id: "2",
      titulo: "Porsche 911",
      modelo: "911",
      marca: "Porsche",
      preco: 1200000,
      ano: 2025,
      cor: "Vermelho",
      imagem: "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202508/20250802/porsche-911-3-0-24v-h6-gasolina-carrera-gts-pdk-wmimagem12135584128.webp?s=fill&w=1920&h=1440&q=75",
      placa: "XYZ9W87"
    },
    {
      id: "3",
      titulo: "BMW 320i",
      modelo: "320i",
      marca: "BMW",
      preco: 280000,
      ano: 2025,
      cor: "Preto",
      imagem: "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202508/20250812/bmw-320i-2.0-16v-turbo-flex-sport-gp-automatico-wmimagem10270734397.jpg?s=fill&w=1920&h=1440&q=75",
      placa: "BMW3A45"
    },
    {
      id: "4",
      titulo: "Chevrolet Chevette",
      modelo: "Chevette",
      marca: "Chevrolet",
      preco: 40000,
      ano: 2024,
      cor: "Azul",
      imagem: "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202405/20240531/chevrolet-chevette-1.6-se-8v-gasolina-2p-automatico-wmimagem17241779296.jpg?s=fill&w=1920&h=1440&q=75",
      placa: "CHEV789"
    },
    {
      id: "5",
      titulo: "Volkswagen Voyage",
      modelo: "Voyage",
      marca: "Volkswagen",
      preco: 55000,
      ano: 2025,
      cor: "Branco",
      imagem: "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202508/20250805/volkswagen-voyage-1.0-mi-trendline-8v-flex-4p-manual-wmimagem15262932415.jpg?s=fill&w=1920&h=1440&q=75",
      placa: "VWG0A12"
    },
    {
      id: "6",
      titulo: "Hyundai Azera",
      modelo: "Azera",
      marca: "Hyundai",
      preco: 150000,
      ano: 2025,
      cor: "Cinza",
      imagem: "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202508/20250806/hyundai-azera-3.0-mpfi-gls-v6-24v-gasolina-4p-automatico-wmimagem09533408036.jpg?s=fill&w=1920&h=1440&q=75",
      placa: "HYU6B54"
    },
    {
      id: "7",
      titulo: "Toyota Corolla",
      modelo: "Corolla",
      marca: "Toyota",
      preco: 120000,
      ano: 2025,
      cor: "Prata",
      imagem: "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202506/20250603/toyota-corolla-2-0-vvtie-flex-altis-premium-direct-shift-wmimagem13444811042.webp?s=fill&w=1920&h=1440&q=75",
      placa: "TOY7C89"
    },
    {
      id: "8",
      titulo: "Chevrolet Onix",
      modelo: "Onix",
      marca: "Chevrolet",
      preco: 75000,
      ano: 2025,
      cor: "Vermelho",
      imagem: "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202508/20250813/chevrolet-onix-1.0-flex-lt-manual-wmimagem01264882023.jpg?s=fill&w=1920&h=1440&q=75",
      placa: "ONX8D23"
    },
    {
      id: "9",
      titulo: "Volkswagen Jetta",
      modelo: "Jetta",
      marca: "Volkswagen",
      preco: 160000,
      ano: 2025,
      cor: "Preto",
      imagem: "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202508/20250809/volkswagen-jetta-2.0-tsi-highline-200cv-gasolina-4p-tiptronic-wmimagem11162028568.jpg?s=fill&w=1920&h=1440&q=75",
      placa: "JET9E45"
    }
  ];

  // Carregar carros do banco de dados
  useEffect(() => {
    carregarCarros();
  }, []);

  const carregarCarros = async () => {
    try {
      const carrosDoBanco = await carroDatabase.buscarTodosCarros(database);
      
      // Combinar carros do banco com carros padrão
      const todosCarros = [...carrosDoBanco, ...carrosPadrao];
      setCarros(todosCarros);
    } catch (error) {
      console.error('Erro ao carregar carros:', error);
      // Se der erro, usa apenas os carros padrão
      setCarros(carrosPadrao);
    }
  };

  const filtrarCarros = carros.filter(carro =>
    carro.modelo?.toLowerCase().includes(search.toLowerCase()) ||
    carro.marca?.toLowerCase().includes(search.toLowerCase()) ||
    carro.titulo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Barra de busca */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar carros..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Botão para cadastrar novo carro */}
      <TouchableOpacity 
        style={styles.cadastrarButton}
        onPress={() => navigation.navigate('CadastroCarro')}
      >
        <Text style={styles.cadastrarButtonText}>+ Cadastrar Novo Carro</Text>
      </TouchableOpacity>

      {/* Categorias */}
      <View style={styles.categories}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Disponíveis</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtrarCarros}
        keyExtractor={(item) => item.id.toString() + item.placa}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("CarDetails", { carro: item })}
          >
            <Image 
              source={{ uri: item.imagem || 'https://via.placeholder.com/300x200?text=Sem+Imagem' }} 
              style={styles.carImage} 
            />
            <View style={styles.cardInfo}>
              <Text style={styles.carTitle}>
                {item.marca} {item.modelo}
                {item.titulo && ` - ${item.titulo}`}
              </Text>
              <Text style={styles.carDetails}>
                {item.ano} • {item.cor || 'Cor não informada'}
              </Text>
              <Text style={styles.carPrice}>
                R$ {item.preco?.toLocaleString('pt-BR')}
              </Text>
              <Text style={styles.carPlaca}>
                Placa: {item.placa || 'Não informada'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum carro encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  searchBar: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  cadastrarButton: {
    backgroundColor: "#0b4200ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  cadastrarButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: "#ff0000",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  categoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  carImage: {
    width: "100%",
    height: 180,
  },
  cardInfo: {
    padding: 10,
  },
  carTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  carDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  carPrice: {
    fontSize: 15,
    color: "#ff0000",
    fontWeight: "bold",
    marginBottom: 4,
  },
  carPlaca: {
    fontSize: 12,
    color: "#888",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});