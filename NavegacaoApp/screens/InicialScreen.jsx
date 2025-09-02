import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";



export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const anuncios = [
    {
      id: "1",
      titulo: "Chevrolet Caravan",
      preco: "R$ 85.000",
      imagem:
        "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202501/20250122/chevrolet-caravan-4.1-comodoro-sle-12v-alcool-2p-manual-wmimagem11333234950.jpg?s=fill&w=1920&h=1440&q=75",
    },
    {
      id: "2",
      titulo: "Porsche 911",
      preco: "R$ 1.200.000",
      imagem:
        "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202508/20250802/porsche-911-3-0-24v-h6-gasolina-carrera-gts-pdk-wmimagem12135584128.webp?s=fill&w=1920&h=1440&q=75",
    },
    {
      id: "3",
      titulo: "BMW 320i",
      preco: "R$ 280.000",
      imagem:
        "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202508/20250812/bmw-320i-2.0-16v-turbo-flex-sport-gp-automatico-wmimagem10270734397.jpg?s=fill&w=1920&h=1440&q=75",
    },
    {
      id: "4",
      titulo: "Chevrolet Chevette",
      preco: "R$ 40.000",
      imagem:
        "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202405/20240531/chevrolet-chevette-1.6-se-8v-gasolina-2p-automatico-wmimagem17241779296.jpg?s=fill&w=1920&h=1440&q=75",
    },
    {
      id: "5",
      titulo: "Volkswagen Voyage",
      preco: "R$ 55.000",
      imagem:
        "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202508/20250805/volkswagen-voyage-1.0-mi-trendline-8v-flex-4p-manual-wmimagem15262932415.jpg?s=fill&w=1920&h=1440&q=75",
    },
    {
      id: "6",
      titulo: "Hyundai Azera",
      preco: "R$ 150.000",
      imagem:
        "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202508/20250806/hyundai-azera-3.0-mpfi-gls-v6-24v-gasolina-4p-automatico-wmimagem09533408036.jpg?s=fill&w=1920&h=1440&q=75",
    },
    {
      id: "7",
      titulo: "Toyota Corolla",
      preco: "R$ 120.000",
      imagem:
        "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202506/20250603/toyota-corolla-2-0-vvtie-flex-altis-premium-direct-shift-wmimagem13444811042.webp?s=fill&w=1920&h=1440&q=75",
    },
    {
      id: "8",
      titulo: "Chevrolet Onix",
      preco: "R$ 75.000",
      imagem:
        "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202508/20250813/chevrolet-onix-1.0-flex-lt-manual-wmimagem01264882023.jpg?s=fill&w=1920&h=1440&q=75",
    },
    {
      id: "9",
      titulo: "Volkswagen Jetta",
      preco: "R$ 160.000",
      imagem:
        "https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202508/20250809/volkswagen-jetta-2.0-tsi-highline-200cv-gasolina-4p-tiptronic-wmimagem11162028568.jpg?s=fill&w=1920&h=1440&q=75",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Barra de busca */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar carros..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Categorias */}
      <View style={styles.categories}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Novos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Usados</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={anuncios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("CarDetails", { carro: item })}
          >
            <Image source={{ uri: item.imagem }} style={styles.carImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.carTitle}>{item.titulo}</Text>
              <Text style={styles.carPrice}>{item.preco}</Text>
            </View>
          </TouchableOpacity>
        )}
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
  },
  carPrice: {
    fontSize: 15,
    color: "#ff0000",
    marginTop: 5,
  },
});
