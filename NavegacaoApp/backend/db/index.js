const { Sequelize } = require('sequelize');
const path = require('path');

// Cria a conexão com o SQLite
// O banco de dados será um arquivo chamado 'financiamento.sqlite'
// na raiz da sua pasta 'backend'
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'financiamento.sqlite'),
  logging: false, // Opcional: para não poluir o console com as queries
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados SQLite estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
}

// Exporta a instância do Sequelize e a função de conexão
module.exports = {
  sequelize,
  connectDB
};