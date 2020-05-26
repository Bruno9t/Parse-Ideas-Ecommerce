module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define(
      "File",
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
        arquivo:{
            type:DataTypes.STRING(50),
           },
        },
        
        {
            tableName:'arquivo_anuncio',
        }
    );

    File.associate = models =>{

        File.belongsTo(models.Announcement,{
            foreignKey:'anuncio_id',
            as:'anuncio'
        })

    }

    return File;
  };