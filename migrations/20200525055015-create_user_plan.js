'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('usuario_plano', 
      { 
        id_venda: {
          type:Sequelize.INTEGER.UNSIGNED,
          allowNull:false,
          primaryKey:true,
          autoIncrement:true,
          unique: true
        },
        usuario_id: {
          type:Sequelize.INTEGER.UNSIGNED,
          allowNull:false,
          references: {model: 'usuario', key: 'id_usuario'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        plano_id: {
          type:Sequelize.INTEGER.UNSIGNED,
          allowNull:false,
          references: {model: 'plano', key: 'id_plano'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        assinatura_id: {
          type:Sequelize.STRING(50),
          allowNull:false,
        },
        status: {
          type:Sequelize.INTEGER,
          allowNull:false
        },
        created_at: {
          type:Sequelize.DATE,
          allowNull:false
        },
        updated_at: {
          type:Sequelize.DATE,
          allowNull:false,
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('usuario_plano');
  }
};
