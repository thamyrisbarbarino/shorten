import { Sequelize } from 'sequelize';

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize('shorten-api', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // ou o que você estiver usando (postgres, sqlite, etc.)
});

// Teste a conexão (opcional)
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi bem-sucedida.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
})();

// Exporta a instância do Sequelize como default
export default sequelize;
