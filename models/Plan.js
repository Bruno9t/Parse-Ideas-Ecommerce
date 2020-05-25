module.exports = (sequelize, DataTypes) => {
    const Plan = sequelize.define(
      "Plan",
      {
        id_plano:{
          type:DataTypes.INTEGER.UNSIGNED,
          allowNull:false,
          primaryKey:true,
          autoIncrement:true,
          unique: true
        },
        nome: {
          type:DataTypes.STRING(45),
          allowNull:false
        },
        valor: {
          type:DataTypes.DECIMAL(4,2),
          allowNull:false
        },
        numero_de_anuncios: {
          type:DataTypes.INTEGER,
          allowNull:false
        },
        numero_de_fotos: {
          type:DataTypes.INTEGER,
          allowNull:false
        } 
      },
      {
        tableName:'plano',
      }
    );
    return Plan;
  };