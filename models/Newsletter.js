
module.exports = (sequelize, DataTypes) => {
    const Newsletter = sequelize.define(
      "Newsletter",
      {
        id_newsletter:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
            unique: true
           },
           nome:{
            type:DataTypes.STRING,
            allowNull:false
           },
           email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true
          }
        },
      {
        tableName:'newsletter',
      }
    );
  
    return Newsletter;
  };


 