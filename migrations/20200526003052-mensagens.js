'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('mensagem', { 
        id_mensagem:{
          type:Sequelize.INTEGER.UNSIGNED,
          allowNull:false,
          primaryKey:true,
          autoIncrement:true,
          unique: true
         },
         usuario_id:{
          type:Sequelize.INTEGER.UNSIGNED,
          allowNull:false,
          references: {model: 'usuario', key: 'id_usuario'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
         },
         anuncio_id:{
          type:Sequelize.INTEGER.UNSIGNED,
          allowNull:false,
          references: {model: 'anuncio', key: 'id_anuncio'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
         },
         nome:{
           type:Sequelize.STRING(45),
           allowNull:false,
         },
         email:{
          type:Sequelize.STRING(45),
          allowNull:false,
         },
         celular:{
          type:Sequelize.STRING(30),
         },
         telefone:{
          type:Sequelize.STRING(30)
         },
         mensagem:{
          type:Sequelize.TEXT,
          allowNull:false
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
      return queryInterface.dropTable('mensagem');
  }
};
