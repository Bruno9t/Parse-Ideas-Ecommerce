'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plano', 
    { 
      id_plano: {
        type:Sequelize.INTEGER.UNSIGNED,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
        unique: true
      },
      nome: {
        type:Sequelize.STRING(45),
        allowNull:false
      },
      valor: {
        type:Sequelize.DECIMAL(4,2),
        allowNull:false
      },
      numero_de_anuncios: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      numero_de_fotos: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      create_at:{
        type:Sequelize.DATE,
        allowNull:false
      },
      update_at:{
        type:Sequelize.DATE,
        allowNull:false,
     }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('plano');
  }
};
