// database/initializeDatabase.js
import * as SQLite from 'expo-sqlite';

export async function initializeDatabase(database) {
  try {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS carros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        modelo TEXT,
        marca TEXT,
        ano INTEGER,
        placa TEXT,
        preco REAL,
        imagem TEXT
      );
    `);
    console.log('Database inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar database:', error);
  }
}