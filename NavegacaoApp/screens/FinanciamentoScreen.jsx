// screens/FinanciamentoScreen.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";

function parseCurrency(brl) {
  if (!brl && brl !== 0) return 0;
  let s = String(brl).replace(/\s/g, "").replace("R$", "").trim();
  s = s.replace(/[^0-9,.-]/g, "");
  // remover pontos de milhares e transformar vírgula decimal em ponto
  if (s.indexOf(",") !== -1 && s.indexOf(".") !== -1) {
    s = s.replace(/\./g, "").replace(",", ".");
  } else {
    s = s.replace(/\./g, "").replace(",", ".");
  }
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

function formatBRL(value) {
  try {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  } catch (e) {
    return "R$ " + Number(value).toFixed(2);
  }
}

// PRICE (parcela fixa)
function calcMonthlyPaymentPrice(principal, annualRatePercent, months) {
  const r = annualRatePercent / 100 / 12;
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return principal * ((r * factor) / (factor - 1));
}

function generateAmortizationPrice(principal, annualRatePercent, months) {
  const r = annualRatePercent / 100 / 12;
  const payment = calcMonthlyPaymentPrice(principal, annualRatePercent, months);
  let balance = principal;
  const schedule = [];
  for (let i = 1; i <= months; i++) {
    const interest = balance * r;
    const amortization = payment - interest;
    balance = Math.max(0, balance - amortization);
    schedule.push({
      parcela: i,
      pagamento: Number(payment),
      amortizacao: Number(amortization),
      juros: Number(interest),
      saldo: Number(balance),
    });
  }
  return schedule;
}

// SAC (amortização constante)
function generateAmortizationSAC(principal, annualRatePercent, months) {
  const r = annualRatePercent / 100 / 12;
  const amortConst = principal / months;
  let balance = principal;
  const schedule = [];
  for (let i = 1; i <= months; i++) {
    const interest = balance * r;
    const payment = amortConst + interest;
    balance = Math.max(0, balance - amortConst);
    schedule.push({
      parcela: i,
      pagamento: Number(payment),
      amortizacao: Number(amortConst),
      juros: Number(interest),
      saldo: Number(balance),
    });
  }
  return schedule;
}

export default function FinanciamentoScreen({ navigation, route }) {
  const carro = route?.params?.carro || null;
  const usuario = route?.params?.usuario || null; // 👈 recebendo usuário logado
  const precoOriginal = carro?.preco ?? "R$ 0";
  const precoNumber = parseCurrency(precoOriginal);

  // se o usuário tiver saldo, já usar como entrada inicial
  const [entradaStr, setEntradaStr] = useState(
    usuario ? String(usuario.saldo) : "0"
  );
  const [taxaStr, setTaxaStr] = useState("10"); // taxa anual default 10%
  const [prazoStr, setPrazoStr] = useState("48"); // meses default
  const [tipo, setTipo] = useState("PRICE"); // 'PRICE' ou 'SAC'
  const [resultado, setResultado] = useState(null);
  const [mostrarTabelaCompleta, setMostrarTabelaCompleta] = useState(false);

  function calcular() {
    const entrada = parseCurrency(entradaStr);
    const taxa = parseFloat(taxaStr) || 0;
    const prazo = parseInt(prazoStr, 10) || 1;
    const principal = precoNumber - entrada;

    if (principal <= 0) {
      Alert.alert(
        "Entrada inválida",
        "A entrada deve ser menor que o preço do carro."
      );
      return;
    }
    if (prazo <= 0) {
      Alert.alert("Prazo inválido", "Coloque um número de meses válido.");
      return;
    }

    let schedule = [];
    if (tipo === "SAC") {
      schedule = generateAmortizationSAC(principal, taxa, prazo);
    } else {
      schedule = generateAmortizationPrice(principal, taxa, prazo);
    }
    const totalPaid = schedule.reduce((s, p) => s + p.pagamento, 0);
    const totalInterest = totalPaid - principal;

    setResultado({
      principal,
      parcela: schedule[0]?.pagamento ?? 0,
      totalPaid,
      totalInterest,
      schedule,
    });
    setMostrarTabelaCompleta(false);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Financiamento</Text>

      {usuario && (
        <View style={styles.card}>
          <Text style={styles.label}>Saldo disponível</Text>
          <Text style={styles.value}>{formatBRL(usuario.saldo)}</Text>
        </View>
      )}

      {carro && (
        <View style={styles.card}>
          <Text style={styles.label}>{carro.titulo}</Text>
          <Text style={styles.price}>{carro.preco}</Text>
        </View>
      )}

      <Text style={styles.label}>Preço do veículo</Text>
      <Text style={styles.value}>{formatBRL(precoNumber)}</Text>

      <Text style={styles.label}>Entrada (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        keyboardType="numeric"
        value={entradaStr}
        onChangeText={setEntradaStr}
      />

      <Text style={styles.label}>Taxa anual (%)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 10"
        keyboardType="numeric"
        value={taxaStr}
        onChangeText={setTaxaStr}
      />

      <Text style={styles.label}>Prazo (meses)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 48"
        keyboardType="numeric"
        value={prazoStr}
        onChangeText={setPrazoStr}
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.typeButton, tipo === "PRICE" && styles.typeButtonActive]}
          onPress={() => setTipo("PRICE")}
        >
          <Text
            style={tipo === "PRICE" ? styles.typeTextActive : styles.typeText}
          >
            PRICE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, tipo === "SAC" && styles.typeButtonActive]}
          onPress={() => setTipo("SAC")}
        >
          <Text
            style={tipo === "SAC" ? styles.typeTextActive : styles.typeText}
          >
            SAC
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.calcButton} onPress={calcular}>
        <Text style={styles.calcButtonText}>Calcular</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            Principal: {formatBRL(resultado.principal)}
          </Text>
          <Text style={styles.resultText}>
            Parcela (1ª): {formatBRL(resultado.parcela)}
          </Text>
          <Text style={styles.resultText}>
            Total pago: {formatBRL(resultado.totalPaid)}
          </Text>
          <Text style={styles.resultText}>
            Juros totais: {formatBRL(resultado.totalInterest)}
          </Text>

          <Text style={[styles.subHeader, { marginTop: 12 }]}>
            Primeiras parcelas
          </Text>
          <View style={styles.tableHeader}>
            <Text style={styles.col}>#</Text>
            <Text style={styles.col}>Pago</Text>
            <Text style={styles.col}>Amort.</Text>
            <Text style={styles.col}>Juros</Text>
            <Text style={styles.col}>Saldo</Text>
          </View>

          {resultado.schedule.slice(0, 6).map((p) => (
            <View key={p.parcela} style={styles.tableRow}>
              <Text style={styles.col}>{p.parcela}</Text>
              <Text style={styles.col}>{formatBRL(p.pagamento)}</Text>
              <Text style={styles.col}>{formatBRL(p.amortizacao)}</Text>
              <Text style={styles.col}>{formatBRL(p.juros)}</Text>
              <Text style={styles.col}>{formatBRL(p.saldo)}</Text>
            </View>
          ))}

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => setMostrarTabelaCompleta((s) => !s)}
          >
            <Text style={styles.smallButtonText}>
              {mostrarTabelaCompleta ? "Ocultar tabela" : "Ver tabela completa"}
            </Text>
          </TouchableOpacity>

          {mostrarTabelaCompleta && (
            <FlatList
              data={resultado.schedule}
              keyExtractor={(i) => String(i.parcela)}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.col}>{item.parcela}</Text>
                  <Text style={styles.col}>{formatBRL(item.pagamento)}</Text>
                  <Text style={styles.col}>{formatBRL(item.amortizacao)}</Text>
                  <Text style={styles.col}>{formatBRL(item.juros)}</Text>
                  <Text style={styles.col}>{formatBRL(item.saldo)}</Text>
                </View>
              )}
            />
          )}
        </View>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 10,
  },
  label: { fontSize: 14, marginTop: 8, marginBottom: 4 },
  value: { fontSize: 16, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
  },
  row: { flexDirection: "row", marginTop: 10, marginBottom: 10 },
  typeButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    alignItems: "center",
    marginRight: 6,
  },
  typeButtonActive: { backgroundColor: "#222" },
  typeText: { color: "#222" },
  typeTextActive: { color: "#fff" },
  calcButton: {
    backgroundColor: "#ff0000ff",
    padding: 12,
    marginTop: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  calcButtonText: { color: "#fff", fontWeight: "bold" },
  resultBox: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "#fafafa",
    borderRadius: 8,
  },
  resultText: { fontSize: 15, marginBottom: 6 },
  subHeader: { fontWeight: "bold" },
  tableHeader: { flexDirection: "row", marginTop: 8, marginBottom: 6 },
  tableRow: { flexDirection: "row", marginBottom: 4 },
  col: { flex: 1, fontSize: 12 },
  smallButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 6,
    alignItems: "center",
  },
  smallButtonText: { color: "#333" },
  backButton: { marginTop: 12, alignItems: "center" },
  backText: { color: "#007bff" },
  price: { fontWeight: "700", marginTop: 6 },
});
