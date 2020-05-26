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
            type:Sequelize.INTEGER.UNSIGNED,
            allowNull:false,
           },
        anuncio_id:{
            type:Sequelize.INTEGER.UNSIGNED,
            allowNull:false,
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
            type:Sequelize.STRING(30),
        },
        mensagem:{
            type:Sequelize.TEXT,
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