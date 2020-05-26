'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const config = require('../config/database')
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize
  .authenticate()
  .then(() => {
    let hours = new Date().getHours()
    let message;

    if(hours >=5 && hours < 12) {
      message = 'Tenha um bom dia ;)'
  }else if(hours >= 12 && hours < 18){
      message = 'Tenha uma boa tarde ;)'
  }else if(hours >= 18 && hours < 0){
      message = 'Tenha uma boa noite ;)'
  }else if(hours >= 0 && hours < 5){
      message = 'Tenha uma boa madrugada ;)'
  }

    console.log(`
+----------------------------------------------------------------+
Parabéns! Conexão com o banco de dados estabilizada com sucesso!!!
${message}
+----------------------------------------------------------------+
`);
  })
  .catch(err => {
    console.error('=( Não foi possível conectar com o banco de dados: ', err);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
