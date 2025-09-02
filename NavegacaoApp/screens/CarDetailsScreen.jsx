import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";

export default function CarDetailsScreen({ route, navigation }) {
  const { carro } = route.params;

  const handleFinanciamento = () => {
    // Navega para a tela de Financiamento passando o carro como parâmetro
    navigation.navigate("Financiamento", { carro });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: carro.imagem }} style={styles.image} />

      <Text style={styles.title}>{carro.titulo}</Text>
      <Text style={styles.price}>{carro.preco}</Text>

      <View style={styles.specs}>
        <Text style={styles.spec}>Ano: {carro.ano || "2025"}</Text>
        <Text style={styles.spec}>Combustível: {carro.combustivel || "Gasolina"}</Text>
        <Text style={styles.spec}>Câmbio: {carro.cambio || "Automático"}</Text>
        <Text style={styles.spec}>KM: {carro.km || "0"}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleFinanciamento}>
        <Text style={styles.buttonText}>Fazer Financiamento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  image: { width: "100%", height: 250, borderRadius: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  price: { fontSize: 20, color: "#ff0000", marginVertical: 10 },
  specs: { marginTop: 15 },
  spec: { fontSize: 16, marginBottom: 5 },
  button: {
    backgroundColor: "#ff0000",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});