module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
      "Message",
      {
        id_anuncio:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
            unique: true
           },
        usuario_id:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
           },
        anuncio_id:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
           },
        nome:{
            type:DataTypes.STRING(45),
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING(45),
            allowNull:false,
        },
        celular:{
            type:DataTypes.STRING(30),
        },
        telefone:{
            type:DataTypes.STRING(30),
        },
        mensagem:{
            type:DataTypes.TEXT,
            allowNull:false
        }
        },
        {
            tableName:'mensagem',
        }
    );

    Message.associate = models =>{

        Message.belongsTo(models.User,{
            foreignKey:'usuario_id',
            as:'usuario'
        })

        Message.belongsTo(models.Announcement,{
            foreignKey:'anuncio_id',
            as:'anuncio'
        })

    }

    return Message;
  };