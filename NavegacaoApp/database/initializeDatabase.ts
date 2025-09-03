import * as SQLite from 'expo-sqlite';

// Inicializar banco de dados
export async function initializeDatabase(database) {
  try {
    // Tabela de usuários (clientes)
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        saldo REAL DEFAULT 0
      );
    `);

      await database.execAsync('DROP TABLE IF EXISTS carros;');
    
    await database.execAsync(`
      CREATE TABLE carros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        modelo TEXT NOT NULL,
        marca TEXT NOT NULL,
        ano INTEGER NOT NULL,
        placa TEXT UNIQUE NOT NULL,
        cor TEXT,
        disponivel TEXT DEFAULT 'sim',
        km INTEGER DEFAULT 0,
        preco REAL NOT NULL,
        imagem TEXT,
        data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);


    console.log('Database inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar database:', error);
  }
}

// Funções para manipular usuários
export const usuarioDatabase = {
  // Cadastrar novo usuário
  async cadastrarUsuario(database, usuario) {
    try {
      const result = await database.runAsync(
        'INSERT INTO usuarios (nome, email, senha, saldo) VALUES (?, ?, ?, ?)',
        [usuario.nome, usuario.email, usuario.senha, usuario.saldo || 0]
      );
      return { success: true, id: result.lastInsertRowId };
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        return { success: false, error: 'E-mail já cadastrado' };
      }
      return { success: false, error: error.message };
    }
  },

  // Fazer login
  async fazerLogin(database, email, senha) {
    try {
      const result = await database.getFirstAsync(
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
        [email, senha]
      );
      return result ? { success: true, usuario: result } : { success: false, error: 'Credenciais inválidas' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Buscar usuário por email
  async buscarUsuarioPorEmail(database, email) {
    try {
      return await database.getFirstAsync(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
      );
    } catch (error) {
      return null;
    }
  },

  // Atualizar saldo do usuário
  async atualizarSaldo(database, userId, novoSaldo) {
    try {
      await database.runAsync(
        'UPDATE usuarios SET saldo = ? WHERE id = ?',
        [novoSaldo, userId]
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Funções para manipular carros
export const carroDatabase = {
  // Cadastrar novo carro
  async cadastrarCarro(database, carro) {
    try {
      const result = await database.runAsync(
        'INSERT INTO carros (modelo, marca, ano, placa, cor, disponivel, km, preco, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [carro.modelo, carro.marca, carro.ano, carro.placa, carro.cor, carro.disponivel, carro.km, carro.preco, carro.imagem]
      );
      return { success: true, id: result.lastInsertRowId };
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        return { success: false, error: 'Placa já cadastrada' };
      }
      return { success: false, error: error.message };
    }
  },

  // Buscar todos os carros
  async buscarTodosCarros(database) {
    try {
      return await database.getAllAsync('SELECT * FROM carros ORDER BY data_cadastro DESC');
    } catch (error) {
      return [];
    }
  },

  // Buscar carro por ID
  async buscarCarroPorId(database, id) {
    try {
      return await database.getFirstAsync('SELECT * FROM carros WHERE id = ?', [id]);
    } catch (error) {
      return null;
    }
  }
};
