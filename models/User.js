module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        id_usuario:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
            unique: true
           },
           nome:{
             type:DataTypes.STRING(45),
             allowNull:false
           },
           sobrenome:{
            type:DataTypes.STRING(45)
           },
           email:{
             type:DataTypes.STRING,
             unique: true,
             allowNull:false
           },
           senha:{
             type:DataTypes.STRING,
           },
           provider_id:{
             type:DataTypes.STRING,
           },
           provider:{
             type:DataTypes.STRING(30),
           },
           thumbnail:{
             type:DataTypes.STRING(2000),
           },
           password_reset_token:{
             type: DataTypes.STRING(50),
           },
           expires_token:{
             type: DataTypes.DATE,
           } 
      },
      {
        tableName:'usuario',
      }
    );
  
    User.associate = (models) => {
      User.belongsToMany(models.Plan, { foreignKey: 'usuario_id', through: 'usuario_plano', as: 'user_plan'})
      User.hasMany(models.Message,{
        foreignKey:'usuario_id',
        as:'mensagens'
      })
      
    };
  
    return User;
  };