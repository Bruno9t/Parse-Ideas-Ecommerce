'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('categoria', { 
        id_categoria: {
          type:Sequelize.INTEGER.UNSIGNED,
          allowNull:false,
          primaryKey:true,
          autoIncrement:true,
          unique: true
        },
        nome: {
          type:Sequelize.STRING(45),
          allowNull:false,
        },
        created_at:{
          type:Sequelize.DATE,
          allowNull:false
         },
        updated_at:{
          type:Sequelize.DATE,
          allowNull:false,
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('categoria');
  }
};
