module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
      "Category",
      {
        id_categoria: {
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
            unique: true
          },
          nome: {
            type:DataTypes.STRING(45),
            allowNull:false,
          },
          create_at:{
            type:DataTypes.DATE,
            allowNull:false
           },
          update_at:{
            type:DataTypes.DATE,
            allowNull:false,
          }
      },
      {
        tableName:'categoria',
      }
    );
  
    // User.associate = (models) => {
    //   
    // };
  
    return Category;
  };


 