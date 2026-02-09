// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';

// import { 
//   initDB, 
//   addPaciente, 
//   getPacientes, 
//   deletePaciente,
//   updatePaciente,
//   addConsulta,
//   getConsultas,
//   deleteConsulta,
//   updateConsulta
// } from '../src/database'; 

// export default function App() {
//   const [nome, setNome] = useState('');
//   const [telefone, setTelefone] = useState('');
//   const [idade, setIdade] = useState('');
//   const [listaPacientes, setListaPacientes] = useState([]);

//   const [pacienteId, setPacienteId] = useState('');
//   const [dataConsulta, setDataConsulta] = useState('');
//   const [descricao, setDescricao] = useState('');
//   const [listaConsultas, setListaConsultas] = useState([]);

//   const [idEdicaoPaciente, setIdEdicaoPaciente] = useState(null);
//   const [idEdicaoConsulta, setIdEdicaoConsulta] = useState(null);


//   const [aba, setAba] = useState("pacientes");

//   // Inicializa o banco ao abrir
//   useEffect(() => {
//     const setup = async () => {
//       try {
//         await initDB();
//         await atualizarPacientes();
//         await atualizarConsultas();
//       } catch (e) {
//         console.log("Erro ao iniciar banco:", e);
//       }
//     };
//     setup();
//   }, []);

//   const atualizarPacientes = async () => {
//     const pacientes = await getPacientes();
//     setListaPacientes(pacientes);
//   };

//   const atualizarConsultas = async () => {
//     const consultas = await getConsultas();
//     setListaConsultas(consultas);
//   };

//   // SALVAR PACIENTE
//   const handleSalvarPaciente = async () => {
//   if (!nome || !idade) return Alert.alert("Atenção", "Preencha nome e idade");

//   try {
//     if (idEdicaoPaciente) {
//       await updatePaciente(idEdicaoPaciente, nome, telefone, parseInt(idade));
//       Alert.alert("Sucesso", "Paciente atualizado!");
//       setIdEdicaoPaciente(null);
//     } else {
//       await addPaciente(nome, telefone, parseInt(idade));
//       Alert.alert("Sucesso", "Paciente cadastrado!");
//     }

//     setNome("");
//     setTelefone("");
//     setIdade("");

//     atualizarPacientes();

//   } catch (e) {
//     console.log(e);
//     Alert.alert("Erro", "Não foi possível salvar");
//   }
// };


//   // EXCLUIR PACIENTE
//   const handleExcluirPaciente = async (id) => {
//     try {
//       await deletePaciente(id);
//       await atualizarPacientes();
//     } catch (e) {
//       Alert.alert('Erro', 'Não foi possível excluir.');
//     }
//   };

//   // EDITAR PACIENTE
//   const handleEditarPaciente = (pac) => {
//     setIdEdicaoPaciente(pac.id);
//     setNome(pac.nome);
//     setTelefone(pac.telefone);
//     setIdade(String(pac.idade));
//   };

  

//   // SALVAR CONSULTA
//   const handleSalvarConsulta = async () => {
//     if (!pacienteId || !dataConsulta || !descricao)
//     return Alert.alert("Atenção", "Preencha tudo");

//   try {
//     if (idEdicaoConsulta) {
//         await updateConsulta(idEdicaoConsulta, pacienteId, dataConsulta, descricao);
//         Alert.alert("Sucesso", "Consulta atualizada!");
//         setIdEdicaoConsulta(null);
//       } else {
//         await addConsulta(parseInt(pacienteId), dataConsulta, descricao);
//         Alert.alert("Sucesso", "Consulta cadastrada!");
//       }

//       setPacienteId("");
//       setDataConsulta("");
//       setDescricao("");

//       atualizarConsultas();

//     } catch (e) {
//       console.log(e);
//       Alert.alert("Erro ao salvar consulta.");
//     }
//   };

//   // EXCLUIR CONSULTA
//   const handleExcluirConsulta = async (id) => {
//     try {
//       await deleteConsulta(id);
//       await atualizarConsultas();
//     } catch (e) {
//       Alert.alert("Erro", "Não foi possível excluir consulta.");
//     }
//   };

//   const handleEditarConsulta = (c) => {
//     setIdEdicaoConsulta(c.id);
//     setPacienteId(String(c.paciente_id));
//     setDataConsulta(c.data);
//     setDescricao(c.descricao);
//   };


//   return (
//     <View style={styles.container}>
      
//       <Text style={styles.title}>Gestão de Clínica</Text>

//       {/* NAVBAR */}
//       <View style={styles.navbar}>
//         <TouchableOpacity onPress={() => setAba("pacientes")}>
//           <Text style={[styles.navText, aba === "pacientes" && styles.active]}>
//             Pacientes
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => setAba("consultas")}>
//           <Text style={[styles.navText, aba === "consultas" && styles.active]}>
//             Consultas
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* ======================== PACIENTES ======================== */}
//       {aba === "pacientes" && (
//         <>
//           <View style={styles.form}>
//             <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
//             <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} style={styles.input} />
//             <TextInput placeholder="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" style={styles.input} />
//             <Button title="Salvar Paciente" onPress={handleSalvarPaciente} />
//           </View>

//           <Text style={styles.subtitle}>Lista de Pacientes:</Text>

//           <FlatList
//             data={listaPacientes}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.item}>
//                 <View >
//                   <Text style={styles.nome}>{item.nome}</Text>
//                   <Text>ID: {item.id} | Idade: {item.idade} | Tel: {item.telefone}</Text>
//                 </View>
//                 <View style={{ flexDirection: "row", gap: 10 }}>
//                   <Button title="Editar" onPress={() => handleEditarPaciente(item)} />
//                   <Button title="X" color="red" onPress={() => handleExcluirPaciente(item.id)} />
//                 </View>
//               </View>
//             )}
//           />
//         </>
//       )}

//       {/* ======================== CONSULTAS ======================== */}
//       {aba === "consultas" && (
//         <>
//           <View style={styles.form}>
//             <TextInput 
//               placeholder="ID do Paciente" 
//               value={pacienteId} 
//               onChangeText={setPacienteId}
//               keyboardType="numeric"
//               style={styles.input}
//             />

//             <TextInput 
//               placeholder="Data (DD/MM/AAAA)" 
//               value={dataConsulta} 
//               onChangeText={setDataConsulta} 
//               style={styles.input}
//             />

//             <TextInput 
//               placeholder="Descrição da consulta" 
//               value={descricao} 
//               onChangeText={setDescricao} 
//               style={styles.input}
//             />

//             <Button title="Salvar Consulta" onPress={handleSalvarConsulta} />
//           </View>

//           <Text style={styles.subtitle}>Lista de Consultas:</Text>

//           <FlatList
//             data={listaConsultas}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <View style={styles.item}>
//                 <View>
//                   <Text style={styles.nome}>Consulta #{item.id}</Text>
//                   <Text>Paciente: {item.nome_paciente}</Text>
//                   <Text>Data: {item.data}</Text>
//                   <Text>Descrição: {item.descricao}</Text>
//                 </View>

//                 <View style={{ flexDirection: "row", gap: 10 }}>
//                   <Button title="Editar" onPress={() => handleEditarConsulta(item)} />
//                   <Button title="X" color="red" onPress={() => handleExcluirConsulta(item.id)} />
//                 </View>
//               </View>
//             )}
//           />
//         </>
//       )}

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#f5f5f5' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
//   form: { backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 3 },
//   input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10, borderRadius: 5 },
//   item: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     padding: 15, 
//     backgroundColor: '#fff', 
//     marginBottom: 10, 
//     borderRadius: 8,
//     elevation: 2 
//   },
//   nome: { fontWeight: 'bold', fontSize: 16 },

//   navbar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 12,
//     // backgroundColor: "#ffffffff",
//     marginBottom: 10,
//     // borderWidth: 1, borderColor: '#ddd', borderRadius: 5
//   },

//   navText: {
//     color: "#000000",
//     fontSize: 18,
//     opacity: 0.6
//   },

//   active: {
//     opacity: 1,
//     fontWeight: "bold",
//     textDecorationLine: "underline"
//   },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

import {
  initDB,
  addCarro,
  getCarros,
  deleteCarro,
  updateCarro,
  toggleVendido,

  addVenda,
  getVendas,
  deleteVenda,
  updateVenda,
} from "../src/database";

export default function App() {
  // ====== CARROS ======
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [preco, setPreco] = useState("");
  const [listaCarros, setListaCarros] = useState<any[]>([]);
  const [idEdicaoCarro, setIdEdicaoCarro] = useState<number | null>(null);

  // ====== VENDAS ======
  const [carroId, setCarroId] = useState("");
  const [dataVenda, setDataVenda] = useState("");
  const [descricao, setDescricao] = useState("");
  const [listaVendas, setListaVendas] = useState<any[]>([]);
  const [idEdicaoVenda, setIdEdicaoVenda] = useState<number | null>(null);

  const [aba, setAba] = useState("carros");

  useEffect(() => {
    const setup = async () => {
      try {
        await initDB();
        await atualizarCarros();
        await atualizarVendas();
      } catch (e) {
        console.log("Erro ao iniciar banco:", e);
      }
    };
    setup();
  }, []);

  const atualizarCarros = async () => {
    const carros = await getCarros();
    setListaCarros(carros);
  };

  const atualizarVendas = async () => {
    const vendas = await getVendas();
    setListaVendas(vendas);
  };

  // ====== SALVAR CARRO ======
  const handleSalvarCarro = async () => {
    if (!marca || !modelo || !ano || !preco) {
      return Alert.alert("Atenção", "Preencha marca, modelo, ano e preço");
    }

    const anoNum = parseInt(ano, 10);
    const precoNum = Number(String(preco).replace(",", "."));

    if (Number.isNaN(anoNum) || anoNum < 1900) {
      return Alert.alert("Atenção", "Ano inválido");
    }
    if (Number.isNaN(precoNum) || precoNum <= 0) {
      return Alert.alert("Atenção", "Preço inválido");
    }

    try {
      if (idEdicaoCarro) {
        await updateCarro(idEdicaoCarro, marca, modelo, anoNum, precoNum);
        Alert.alert("Sucesso", "Carro atualizado!");
        setIdEdicaoCarro(null);
      } else {
        await addCarro(marca, modelo, anoNum, precoNum);
        Alert.alert("Sucesso", "Carro cadastrado!");
      }

      setMarca("");
      setModelo("");
      setAno("");
      setPreco("");

      atualizarCarros();
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Não foi possível salvar");
    }
  };

  // ====== EXCLUIR CARRO ======
  const handleExcluirCarro = async (id: number) => {
    try {
      await deleteCarro(id);
      await atualizarCarros();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível excluir.");
    }
  };

  // ====== EDITAR CARRO ======
  const handleEditarCarro = (car: any) => {
    setIdEdicaoCarro(car.id);
    setMarca(car.marca);
    setModelo(car.modelo);
    setAno(String(car.ano));
    setPreco(String(car.preco));
  };

  // ====== TOGGLE VENDIDO ======
  const handleToggleVendido = async (id: number, vendidoAtual: number) => {
    try {
      await toggleVendido(id, vendidoAtual ? 0 : 1);
      await atualizarCarros();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível atualizar status.");
    }
  };

  // ====== SALVAR VENDA ======
  const handleSalvarVenda = async () => {
    if (!carroId || !dataVenda || !descricao) {
      return Alert.alert("Atenção", "Preencha tudo");
    }

    try {
      if (idEdicaoVenda) {
        await updateVenda(idEdicaoVenda, parseInt(carroId, 10), dataVenda, descricao);
        Alert.alert("Sucesso", "Venda atualizada!");
        setIdEdicaoVenda(null);
      } else {
        await addVenda(parseInt(carroId, 10), dataVenda, descricao);
        Alert.alert("Sucesso", "Venda cadastrada!");
      }

      setCarroId("");
      setDataVenda("");
      setDescricao("");

      atualizarVendas();
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Erro ao salvar venda.");
    }
  };

  // ====== EXCLUIR VENDA ======
  const handleExcluirVenda = async (id: number) => {
    try {
      await deleteVenda(id);
      await atualizarVendas();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível excluir venda.");
    }
  };

  // ====== EDITAR VENDA ======
  const handleEditarVenda = (v: any) => {
    setIdEdicaoVenda(v.id);
    setCarroId(String(v.carro_id));
    setDataVenda(v.data);
    setDescricao(v.descricao);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestão de Concessionária</Text>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setAba("carros")}>
          <Text style={[styles.navText, aba === "carros" && styles.active]}>
            Carros
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setAba("vendas")}>
          <Text style={[styles.navText, aba === "vendas" && styles.active]}>
            Vendas
          </Text>
        </TouchableOpacity>
      </View>

      {/* ======================== CARROS ======================== */}
      {aba === "carros" && (
        <>
          <View style={styles.form}>
            <TextInput placeholder="Marca" value={marca} onChangeText={setMarca} style={styles.input} />
            <TextInput placeholder="Modelo" value={modelo} onChangeText={setModelo} style={styles.input} />

            <TextInput
              placeholder="Ano"
              value={ano}
              onChangeText={setAno}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              placeholder="Preço (ex: 45000)"
              value={preco}
              onChangeText={setPreco}
              keyboardType="numeric"
              style={styles.input}
            />

            <Button title="Salvar Carro" onPress={handleSalvarCarro} />
          </View>

          <Text style={styles.subtitle}>Lista de Carros:</Text>

          <FlatList
            data={listaCarros}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View>
                  <Text style={styles.nome}>
                    {item.marca} {item.modelo}
                  </Text>
                  <Text>
                    ID: {item.id} | Ano: {item.ano} | Preço: R$ {Number(item.preco).toFixed(2)}
                  </Text>
                  <Text>Status: {item.vendido ? "Vendido ✅" : "Disponível"}</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Button title="Editar" onPress={() => handleEditarCarro(item)} />
                  <Button
                    title={item.vendido ? "Desfazer" : "Vender"}
                    onPress={() => handleToggleVendido(item.id, item.vendido)}
                  />
                  <Button title="X" color="red" onPress={() => handleExcluirCarro(item.id)} />
                </View>
              </View>
            )}
          />
        </>
      )}

      {/* ======================== VENDAS ======================== */}
      {aba === "vendas" && (
        <>
          <View style={styles.form}>
            <TextInput
              placeholder="ID do Carro"
              value={carroId}
              onChangeText={setCarroId}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              placeholder="Data (DD/MM/AAAA)"
              value={dataVenda}
              onChangeText={setDataVenda}
              style={styles.input}
            />

            <TextInput
              placeholder="Descrição da venda"
              value={descricao}
              onChangeText={setDescricao}
              style={styles.input}
            />

            <Button title="Salvar Venda" onPress={handleSalvarVenda} />
          </View>

          <Text style={styles.subtitle}>Lista de Vendas:</Text>

          <FlatList
            data={listaVendas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View>
                  <Text style={styles.nome}>Venda #{item.id}</Text>
                  <Text>Carro: {item.marca_carro} {item.modelo_carro}</Text>
                  <Text>Data: {item.data}</Text>
                  <Text>Descrição: {item.descricao}</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Button title="Editar" onPress={() => handleEditarVenda(item)} />
                  <Button title="X" color="red" onPress={() => handleExcluirVenda(item.id)} />
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
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  form: { backgroundColor: "#fff", padding: 15, borderRadius: 10, elevation: 3 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, marginBottom: 10, borderRadius: 5 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  nome: { fontWeight: "bold", fontSize: 16 },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    marginBottom: 10,
  },

  navText: {
    color: "#000000",
    fontSize: 18,
    opacity: 0.6,
  },

  active: {
    opacity: 1,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
