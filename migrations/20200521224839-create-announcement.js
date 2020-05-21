'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('anuncio', { 
        id_anuncio:{
          type:Sequelize.INTEGER.UNSIGNED,
          allowNull:false,
          primaryKey:true,
          autoIncrement:true,
          unique: true
         },
         categoria_id:{
          type:Sequelize.INTEGER.UNSIGNED,
          allowNull:false
         },
         usuario_id:{
          type:Sequelize.INTEGER.UNSIGNED,
          allowNull:false
         },
         preco:{
           type:Sequelize.DECIMAL(10,2),
           allowNull:false
         },
         valor_estimado_estoque:{
           type:Sequelize.DECIMAL(10,2),
           allowNull:true
         },
         faturamento_mm:{
           type:Sequelize.DECIMAL(10,2),
           allowNull:true
         },
         lucro_mensal:{
           type:Sequelize.DECIMAL(10,2),
           allowNull:true
         },
         data_fundacao:{
           type:Sequelize.DATE,
         },
         motivo_venda:{
          type:Sequelize.STRING(500),
        },
        descricao:{
          type:Sequelize.STRING(2000),
        },
        qtd_funcionarios:{
          type:Sequelize.INTEGER,
        },
        prioridade:{
          type:Sequelize.BOOLEAN
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
      return queryInterface.dropTable('anuncio');
  }
};
