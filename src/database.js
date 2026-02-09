import * as SQLite from "expo-sqlite";

// Abre o banco
const getDB = async () => {
  return await SQLite.openDatabaseAsync("concessionaria.db");
};

// Inicializa tabelas
export const initDB = async () => {
  const db = await getDB();
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS carros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      marca TEXT NOT NULL,
      modelo TEXT NOT NULL,
      ano INTEGER NOT NULL,
      preco REAL NOT NULL,
      vendido INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS vendas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      carro_id INTEGER NOT NULL,
      data TEXT NOT NULL,
      descricao TEXT NOT NULL,
      FOREIGN KEY (carro_id) REFERENCES carros(id)
    );
  `);
};

/* ============================================================
                    CARROS (CRUD)
   ============================================================ */

export const addCarro = async (marca, modelo, ano, preco) => {
  const db = await getDB();
  const result = await db.runAsync(
    "INSERT INTO carros (marca, modelo, ano, preco, vendido) VALUES (?, ?, ?, ?, 0)",
    [marca, modelo, ano, preco]
  );
  return result.lastInsertRowId;
};

export const getCarros = async () => {
  const db = await getDB();
  const allRows = await db.getAllAsync("SELECT * FROM carros ORDER BY id DESC");
  return allRows;
};

export const deleteCarro = async (id) => {
  const db = await getDB();
  await db.runAsync("DELETE FROM carros WHERE id = ?", [id]);
};

export const updateCarro = async (id, marca, modelo, ano, preco) => {
  const db = await getDB();
  await db.runAsync(
    "UPDATE carros SET marca = ?, modelo = ?, ano = ?, preco = ? WHERE id = ?",
    [marca, modelo, ano, preco, id]
  );
};

// Alterna status vendido (0/1)
export const toggleVendido = async (id, vendido) => {
  const db = await getDB();
  await db.runAsync("UPDATE carros SET vendido = ? WHERE id = ?", [vendido, id]);
};

/* ============================================================
                    VENDAS (CRUD)
   ============================================================ */

export const addVenda = async (carro_id, data, descricao) => {
  const db = await getDB();
  const result = await db.runAsync(
    "INSERT INTO vendas (carro_id, data, descricao) VALUES (?, ?, ?)",
    [carro_id, data, descricao]
  );
  return result.lastInsertRowId;
};

export const getVendas = async () => {
  const db = await getDB();
  const rows = await db.getAllAsync(`
    SELECT
      vendas.id,
      vendas.carro_id,
      vendas.data,
      vendas.descricao,
      carros.marca AS marca_carro,
      carros.modelo AS modelo_carro,
      carros.ano AS ano_carro,
      carros.preco AS preco_carro
    FROM vendas
    JOIN carros ON carros.id = vendas.carro_id
    ORDER BY vendas.data DESC
  `);
  return rows;
};

export const deleteVenda = async (id) => {
  const db = await getDB();
  await db.runAsync("DELETE FROM vendas WHERE id = ?", [id]);
};

export const updateVenda = async (id, carro_id, data, descricao) => {
  const db = await getDB();
  await db.runAsync(
    "UPDATE vendas SET carro_id = ?, data = ?, descricao = ? WHERE id = ?",
    [carro_id, data, descricao, id]
  );
};
