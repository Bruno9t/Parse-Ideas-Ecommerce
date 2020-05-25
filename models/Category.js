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
          created_at:{
            type:DataTypes.DATE,
            allowNull:false
           },
          updated_at:{
            type:DataTypes.DATE,
            allowNull:false,
          }
      },
      {
        tableName:'categoria',
      }
    );
  
    Category.associate = models => {
      Category.hasMany(models.Announcement, {
        foreignKey: 'categoria_id',
        as: 'anuncios'
      })
    }

    // User.associate = (models) => {
    //   
    // };
  
    return Category;
  };


 