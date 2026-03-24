import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createPerson } from '../servers/peopleCrud';

export default function AddEditScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSalvar = async () => {
    if (!nome || !email) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      
      await createPerson({ nome, email });
      
      Alert.alert("Sucesso", "Pessoa cadastrada!");
      navigation.goBack(); 
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar os dados.");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome Completo:</Text>
      <TextInput 
        style={styles.input} 
        value={nome} 
        onChangeText={setNome} 
        placeholder="Digite o nome..."
      />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail} 
        placeholder="Digite o e-mail..."
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
        <Text style={styles.textoBotao}>SALVAR CADASTRO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20 },
  botao: { backgroundColor: '#28a745', padding: 15, borderRadius: 5, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});