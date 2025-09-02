import { type SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabase(database: SQLiteDatabase) {
  // Cria a tabela 'carros' se ela não existir
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS carros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      modelo TEXT,
      marca TEXT,
      ano INTEGER,
      placa TEXT
    );
  `);
}
