import * as SQLite from 'expo-sqlite';

// Abre o banco
const getDB = async () => {
  return await SQLite.openDatabaseAsync('clinica.db');
};

// Inicializa tabelas
export const initDB = async () => {
  const db = await getDB();
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS pacientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      idade INTEGER
    );

    CREATE TABLE IF NOT EXISTS consultas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      paciente_id INTEGER,
      data TEXT,
      descricao TEXT,
      FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
    );
  `);
};

/* ============================================================
                    PACIENTES (CRUD)
   ============================================================ */

export const addPaciente = async (nome, telefone, idade) => {
  const db = await getDB();
  const result = await db.runAsync(
    'INSERT INTO pacientes (nome, telefone, idade) VALUES (?, ?, ?)',
    [nome, telefone, idade]
  );
  return result.lastInsertRowId;
};

export const getPacientes = async () => {
  const db = await getDB();
  const allRows = await db.getAllAsync('SELECT * FROM pacientes');
  return allRows;
};

export const deletePaciente = async (id) => {
  const db = await getDB();
  await db.runAsync('DELETE FROM pacientes WHERE id = ?', [id]);
};

/* ============================================================
                    CONSULTAS (CRUD)
   ============================================================ */

// ADICIONAR CONSULTA
export const addConsulta = async (paciente_id, data, descricao) => {
  const db = await getDB();
  const result = await db.runAsync(
    'INSERT INTO consultas (paciente_id, data, descricao) VALUES (?, ?, ?)',
    [paciente_id, data, descricao]
  );
  return result.lastInsertRowId;
};

// LISTAR CONSULTAS
export const getConsultas = async () => {
  const db = await getDB();
  const rows = await db.getAllAsync(`
    SELECT 
      consultas.id,
      consultas.paciente_id,
      consultas.data,
      consultas.descricao,
      pacientes.nome AS nome_paciente
    FROM consultas
    JOIN pacientes ON pacientes.id = consultas.paciente_id
    ORDER BY consultas.data DESC
  `);
  return rows;
};

// DELETAR CONSULTA
export const deleteConsulta = async (id) => {
  const db = await getDB();
  await db.runAsync('DELETE FROM consultas WHERE id = ?', [id]);
};

export const updatePaciente = async (id, nome, telefone, idade) => {
  const db = await getDB(); 
  await db.runAsync(
    "UPDATE pacientes SET nome = ?, telefone = ?, idade = ? WHERE id = ?",
    [nome, telefone, idade, id]
  );
};

export const updateConsulta = async (id, paciente_id, data, descricao) => {
  const db = await getDB(); 
  await db.runAsync(
    "UPDATE consultas SET paciente_id = ?, data = ?, descricao = ? WHERE id = ?",
    [paciente_id, data, descricao, id]
  );
}; 