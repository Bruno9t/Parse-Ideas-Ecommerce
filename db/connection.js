const Sequelize = require('sequelize')

const config = require('../config/database')

const connection = new Sequelize(config)



connection
  .authenticate()
  .then(() => {
    console.log('Conexão estabilizada com sucesso ;)');
  })
  .catch(err => {
    console.error('=( Não foi possível conectar com o banco de dados: ', err);
  });