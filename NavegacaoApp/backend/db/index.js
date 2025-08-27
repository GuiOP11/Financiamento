const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('financiamento', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432, // Porta padrão do PostgreSQL
  logging: false, // Define para 'true' se quiser ver as queries SQL no console
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1); // Sai do processo em caso de erro na conexão
  }
}

// Exporta a instância do Sequelize e a função de conexão
module.exports = {
  sequelize,
  connectDB
};