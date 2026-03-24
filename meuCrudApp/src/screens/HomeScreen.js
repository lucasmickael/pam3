import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import api from '../servers/configApi'; 

export default function HomeScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [lista, setLista] = useState([]);

  // LISTAR (GET)
  const carregarDados = async () => {
    try {
      const response = await api.get('/people');
      setLista(response.data); 
    } catch (error) {
      console.log("Erro ao carregar lista");
    }
  };

  // CADASTRAR (POST)
  const salvar = async () => {
    if (!nome || !email) {
      Alert.alert("Atenção", "Preencha o nome e o e-mail.");
      return;
    }

    try {
      await api.post('/people', { nome, email });
      Alert.alert("Sucesso", "Dados salvos no JSON-Server!");
      setNome('');
      setEmail('');
      carregarDados(); 
    } catch (error) {
      Alert.alert("Erro", "A API não respondeu.");
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro ETEC (Axios)</Text>
      
      <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput placeholder="E-mail" style={styles.input} value={email} onChangeText={setEmail} />
      
      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.textoBotao}>CADASTRAR</Text>
      </TouchableOpacity>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{fontWeight: 'bold'}}>{item.nome}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, paddingTop: 50, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8, borderColor: '#ccc' },
  botao: { backgroundColor: '#0055ff', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  textoBotao: { color: 'white', fontWeight: 'bold' },
  card: { padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 5 }
});