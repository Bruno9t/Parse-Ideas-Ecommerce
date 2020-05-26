'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('arquivo_anuncio', { 
        id_arquivo: {
          type:Sequelize.INTEGER.UNSIGNED,
          allowNull:false,
          primaryKey:true,
          autoIncrement:true,
          unique: true
        },
        anuncio_id:{
          type:Sequelize.INTEGER.UNSIGNED,
          allowNull:false,
          references: {model: 'anuncio', key: 'id_anuncio'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        arquivo:{
          type:Sequelize.STRING(50),
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
      return queryInterface.dropTable('arquivo_anuncio');
  }
};
