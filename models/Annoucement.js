module.exports = (sequelize, DataTypes) => {
    const Announcement = sequelize.define(
      "Announcement",
      {
        id_anuncio:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
            unique: true
           },
           categoria_id:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false
           },
           usuario_id:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false
           },
           preco:{
             type:DataTypes.DECIMAL,
             allowNull:false
           },
           valor_estimado_estoque:{
             type:DataTypes.DECIMAL,
             allowNull:true
           },
           faturamento_mm:{
             type:DataTypes.DECIMAL,
             allowNull:true
           },
           lucro_mensal:{
             type:DataTypes.DECIMAL,
             allowNull:true
           },
           data_fundacao:{
             type:DataTypes.DATE,
           },
           motivo_venda:{
            type:DataTypes.STRING(500),
          },
          descricao:{
            type:DataTypes.STRING(2000),
          },
          qtd_funcionarios:{
            type:DataTypes.INTEGER,
          },
          prioridade:{
            type:DataTypes.BOOLEAN
          }
      },
      {
        tableName:'anuncio',
      }
    );
  
    Announcement.associate = models => {
      Announcement.belongsTo(models.Category, {
        foreignKey: 'categoria_id',
        as: 'categoria'
      })
    }

    // User.associate = (models) => {
    //   
    // };
  
    return Announcement;
  };