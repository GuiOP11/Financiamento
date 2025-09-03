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
  },

  // Buscar carros por marca
  async buscarCarrosPorMarca(database, marca) {
    try {
      return await database.getAllAsync(
        'SELECT * FROM carros WHERE marca LIKE ? ORDER BY modelo',
        [`%${marca}%`]
      );
    } catch (error) {
      return [];
    }
  },

  // Atualizar carro
  async atualizarCarro(database, id, carroData) {
    try {
      await database.runAsync(
        'UPDATE carros SET modelo = ?, marca = ?, ano = ?, placa = ?, cor = ?, disponivel = ?, km = ?, preco = ?, imagem = ? WHERE id = ?',
        [carroData.modelo, carroData.marca, carroData.ano, carroData.placa, carroData.cor, carroData.disponivel, carroData.km, carroData.preco, carroData.imagem, id]
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Excluir carro
  async excluirCarro(database, id) {
    try {
      await database.runAsync('DELETE FROM carros WHERE id = ?', [id]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// FUNÇÕES DE VISUALIZAÇÃO E DEBUG (adicionadas)
// Função para visualizar todos os usuários
export async function visualizarUsuarios(database) {
  try {
    const usuarios = await database.getAllAsync('SELECT * FROM usuarios');
    console.log('📊 USUÁRIOS CADASTRADOS:');
    console.table(usuarios);
    return usuarios;
  } catch (error) {
    console.error('Erro ao visualizar usuários:', error);
    return [];
  }
}

// Função para visualizar todos os carros
export async function visualizarCarros(database) {
  try {
    const carros = await database.getAllAsync('SELECT * FROM carros');
    console.log('🚗 CARROS CADASTRADOS:');
    console.table(carros);
    return carros;
  } catch (error) {
    console.error('Erro ao visualizar carros:', error);
    return [];
  }
}

// Função para ver estrutura das tabelas
export async function verEstruturaTabelas(database) {
  try {
    const tabelas = await database.getAllAsync(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );
    console.log('📋 TABELAS DO BANCO:');
    
    for (const tabela of tabelas) {
      const estrutura = await database.getAllAsync(
        `PRAGMA table_info(${tabela.name})`
      );
      console.log(`\nEstrutura da tabela ${tabela.name}:`);
      console.table(estrutura);
    }
    
    return tabelas;
  } catch (error) {
    console.error('Erro ao ver estrutura:', error);
    return [];
  }
}

// Função para contar registros
export async function contarRegistros(database) {
  try {
    const usuariosCount = await database.getFirstAsync('SELECT COUNT(*) as total FROM usuarios');
    const carrosCount = await database.getFirstAsync('SELECT COUNT(*) as total FROM carros');
    
    console.log('📈 TOTAL DE REGISTROS:');
    console.log(`- Usuários: ${usuariosCount.total}`);
    console.log(`- Carros: ${carrosCount.total}`);
    
    return { usuarios: usuariosCount.total, carros: carrosCount.total };
  } catch (error) {
    console.error('Erro ao contar registros:', error);
    return { usuarios: 0, carros: 0 };
  }
}

// Função para limpar todas as tabelas (apenas para desenvolvimento)
export async function limparBancoDados(database) {
  try {
    await database.execAsync('DELETE FROM usuarios');
    await database.execAsync('DELETE FROM carros');
    console.log('🗑️ Banco de dados limpo!');
    return { success: true };
  } catch (error) {
    console.error('Erro ao limpar banco:', error);
    return { success: false, error: error.message };
  }
}

// Função para popular com dados de exemplo
export async function popularDadosExemplo(database) {
  try {
    // Dados de exemplo para carros
    const carrosExemplo = [
      {
        modelo: 'Gol',
        marca: 'Volkswagen',
        ano: 2023,
        placa: 'ABC1234',
        cor: 'Vermelho',
        disponivel: 'sim',
        km: 0,
        preco: 45000,
        imagem: 'https://example.com/gol.jpg'
      },
      {
        modelo: 'Civic',
        marca: 'Honda',
        ano: 2024,
        placa: 'XYZ5678',
        cor: 'Prata',
        disponivel: 'sim',
        km: 100,
        preco: 120000,
        imagem: 'https://example.com/civic.jpg'
      }
    ];

    for (const carro of carrosExemplo) {
      await carroDatabase.cadastrarCarro(database, carro);
    }

    console.log('📦 Dados de exemplo inseridos!');
    return { success: true };
  } catch (error) {
    console.error('Erro ao popular dados:', error);
    return { success: false, error: error.message };
  }
}