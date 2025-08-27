// Exemplo de código no backend/server.js
const { sequelize, connectDB } = require('./db');

// Importe seus modelos para que o Sequelize saiba quais tabelas criar
require('./models/carro');
require('./models/moto');
require('./models/usuario');

async function startServer() {
  // Conecta ao banco de dados
  await connectDB();

  // Sincroniza os modelos. Esta linha é a mágica!
  // `force: false` não apaga tabelas existentes.
  await sequelize.sync({ force: false });

  console.log('Tabelas criadas com sucesso ou já existentes.');

// Importa as bibliotecas necessárias para o seu servidor
const express = require('express');
const cors = require('cors'); // Para permitir requisições do seu app Expo
const app = express();

// Importa a conexão com o banco de dados e os modelos
const { sequelize, connectDB } = require('./db');
const Carro = require('./models/carro');
const Moto = require('./models/moto');
const User = require('./models/user');

// Importa as rotas da sua API
const carroRoutes = require('./routes/carroRoutes');
const motoRoutes = require('./routes/motoRoutes');
const userRoutes = require('./routes/userRoutes');

// --- Middleware ---
// Essas linhas processam as requisições antes de chegarem nas suas rotas.
app.use(cors()); // Permite que seu aplicativo (frontend) acesse a API
app.use(express.json()); // Permite que seu servidor entenda JSON

// --- Definição das Rotas ---
// Conecta os arquivos de rota da sua API ao servidor
app.use('/api/carros', carroRoutes);
app.use('/api/motos', motoRoutes);
app.use('/api/users', userRoutes);

// --- Início do Servidor e Sincronização do Banco de Dados ---
async function startServer() {
  try {
    // 1. Conecta ao banco de dados PostgreSQL
    await connectDB();

    // 2. Sincroniza os modelos com o banco de dados
    // Isso cria as tabelas se elas não existirem
    await sequelize.sync({ force: false });

    console.log('Tabelas criadas ou já existentes!');

    // 3. Inicia o servidor Express para ouvir as requisições
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}

// Chama a função para iniciar tudo
startServer();
}

startServer();