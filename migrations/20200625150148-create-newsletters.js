'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('newsletter', { 
        id_newsletter:{
          type:Sequelize.INTEGER.UNSIGNED,
          allowNull:false,
          primaryKey:true,
          autoIncrement:true,
          unique: true
         },
         nome:{
          type:Sequelize.STRING,
          allowNull:false
         },
         email:{
          type:Sequelize.STRING,
          allowNull:false,
          unique: true
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
      return queryInterface.dropTable('newsletter');
  }
};
