import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import { 
  initDB, 
  addPaciente, 
  getPacientes, 
  deletePaciente,
  updatePaciente,
  addConsulta,
  getConsultas,
  deleteConsulta,
  updateConsulta
} from '../src/database'; 

export default function App() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idade, setIdade] = useState('');
  const [listaPacientes, setListaPacientes] = useState([]);

  const [pacienteId, setPacienteId] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [descricao, setDescricao] = useState('');
  const [listaConsultas, setListaConsultas] = useState([]);

  const [idEdicaoPaciente, setIdEdicaoPaciente] = useState(null);
  const [idEdicaoConsulta, setIdEdicaoConsulta] = useState(null);


  const [aba, setAba] = useState("pacientes");

  // Inicializa o banco ao abrir
  useEffect(() => {
    const setup = async () => {
      try {
        await initDB();
        await atualizarPacientes();
        await atualizarConsultas();
      } catch (e) {
        console.log("Erro ao iniciar banco:", e);
      }
    };
    setup();
  }, []);

  const atualizarPacientes = async () => {
    const pacientes = await getPacientes();
    setListaPacientes(pacientes);
  };

  const atualizarConsultas = async () => {
    const consultas = await getConsultas();
    setListaConsultas(consultas);
  };

  // SALVAR PACIENTE
  const handleSalvarPaciente = async () => {
  if (!nome || !idade) return Alert.alert("Atenção", "Preencha nome e idade");

  try {
    if (idEdicaoPaciente) {
      await updatePaciente(idEdicaoPaciente, nome, telefone, parseInt(idade));
      Alert.alert("Sucesso", "Paciente atualizado!");
      setIdEdicaoPaciente(null);
    } else {
      await addPaciente(nome, telefone, parseInt(idade));
      Alert.alert("Sucesso", "Paciente cadastrado!");
    }

    setNome("");
    setTelefone("");
    setIdade("");

    atualizarPacientes();

  } catch (e) {
    console.log(e);
    Alert.alert("Erro", "Não foi possível salvar");
  }
};


  // EXCLUIR PACIENTE
  const handleExcluirPaciente = async (id) => {
    try {
      await deletePaciente(id);
      await atualizarPacientes();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível excluir.');
    }
  };

  // EDITAR PACIENTE
  const handleEditarPaciente = (pac) => {
    setIdEdicaoPaciente(pac.id);
    setNome(pac.nome);
    setTelefone(pac.telefone);
    setIdade(String(pac.idade));
  };

  

  // SALVAR CONSULTA
  const handleSalvarConsulta = async () => {
    if (!pacienteId || !dataConsulta || !descricao)
    return Alert.alert("Atenção", "Preencha tudo");

  try {
    if (idEdicaoConsulta) {
        await updateConsulta(idEdicaoConsulta, pacienteId, dataConsulta, descricao);
        Alert.alert("Sucesso", "Consulta atualizada!");
        setIdEdicaoConsulta(null);
      } else {
        await addConsulta(parseInt(pacienteId), dataConsulta, descricao);
        Alert.alert("Sucesso", "Consulta cadastrada!");
      }

      setPacienteId("");
      setDataConsulta("");
      setDescricao("");

      atualizarConsultas();

    } catch (e) {
      console.log(e);
      Alert.alert("Erro ao salvar consulta.");
    }
  };

  // EXCLUIR CONSULTA
  const handleExcluirConsulta = async (id) => {
    try {
      await deleteConsulta(id);
      await atualizarConsultas();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível excluir consulta.");
    }
  };

  const handleEditarConsulta = (c) => {
    setIdEdicaoConsulta(c.id);
    setPacienteId(String(c.paciente_id));
    setDataConsulta(c.data);
    setDescricao(c.descricao);
  };


  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Gestão de Clínica</Text>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setAba("pacientes")}>
          <Text style={[styles.navText, aba === "pacientes" && styles.active]}>
            Pacientes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setAba("consultas")}>
          <Text style={[styles.navText, aba === "consultas" && styles.active]}>
            Consultas
          </Text>
        </TouchableOpacity>
      </View>

      {/* ======================== PACIENTES ======================== */}
      {aba === "pacientes" && (
        <>
          <View style={styles.form}>
            <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
            <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} style={styles.input} />
            <TextInput placeholder="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" style={styles.input} />
            <Button title="Salvar Paciente" onPress={handleSalvarPaciente} />
          </View>

          <Text style={styles.subtitle}>Lista de Pacientes:</Text>

          <FlatList
            data={listaPacientes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View >
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text>ID: {item.id} | Idade: {item.idade} | Tel: {item.telefone}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Button title="Editar" onPress={() => handleEditarPaciente(item)} />
                  <Button title="X" color="red" onPress={() => handleExcluirPaciente(item.id)} />
                </View>
              </View>
            )}
          />
        </>
      )}

      {/* ======================== CONSULTAS ======================== */}
      {aba === "consultas" && (
        <>
          <View style={styles.form}>
            <TextInput 
              placeholder="ID do Paciente" 
              value={pacienteId} 
              onChangeText={setPacienteId}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput 
              placeholder="Data (DD/MM/AAAA)" 
              value={dataConsulta} 
              onChangeText={setDataConsulta} 
              style={styles.input}
            />

            <TextInput 
              placeholder="Descrição da consulta" 
              value={descricao} 
              onChangeText={setDescricao} 
              style={styles.input}
            />

            <Button title="Salvar Consulta" onPress={handleSalvarConsulta} />
          </View>

          <Text style={styles.subtitle}>Lista de Consultas:</Text>

          <FlatList
            data={listaConsultas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View>
                  <Text style={styles.nome}>Consulta #{item.id}</Text>
                  <Text>Paciente: {item.nome_paciente}</Text>
                  <Text>Data: {item.data}</Text>
                  <Text>Descrição: {item.descricao}</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Button title="Editar" onPress={() => handleEditarConsulta(item)} />
                  <Button title="X" color="red" onPress={() => handleExcluirConsulta(item.id)} />
                </View>
              </View>
            )}
          />
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  form: { backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 3 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10, borderRadius: 5 },
  item: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 15, 
    backgroundColor: '#fff', 
    marginBottom: 10, 
    borderRadius: 8,
    elevation: 2 
  },
  nome: { fontWeight: 'bold', fontSize: 16 },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    // backgroundColor: "#ffffffff",
    marginBottom: 10,
    // borderWidth: 1, borderColor: '#ddd', borderRadius: 5
  },

  navText: {
    color: "#000000",
    fontSize: 18,
    opacity: 0.6
  },

  active: {
    opacity: 1,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
});
