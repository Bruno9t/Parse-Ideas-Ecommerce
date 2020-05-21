'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('usuario', { 
     id_usuario:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
      unique: true,
     },
     nome:{
       type:Sequelize.STRING(45),
       allowNull:false
     },
     sobrenome:{
      type:Sequelize.STRING(45)
     },
     email:{
       type:Sequelize.STRING,
       unique: true,
       allowNull:false
     },
     senha:{
       type:Sequelize.STRING,
     },
     provider_id:{
       type:Sequelize.STRING,
     },
     provider:{
       type:Sequelize.STRING(30),
     },
     thumbnail:{
       type:Sequelize.STRING(2000),
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

    return queryInterface.dropTable('usuario');

  }
};
