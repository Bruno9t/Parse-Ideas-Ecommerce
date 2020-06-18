module.exports = (sequelize, DataTypes)=>{

    const User_Plan = sequelize.define(
        'User_Plan',
        {
                id_venda: {
                  type:DataTypes.INTEGER.UNSIGNED,
                  allowNull:false,
                  primaryKey:true,
                  autoIncrement:true,
                  unique: true
                },
                usuario_id: {
                  type:DataTypes.INTEGER.UNSIGNED,
                  allowNull:false,
                },
                plano_id: {
                  type:DataTypes.INTEGER.UNSIGNED,
                  allowNull:false,
                },
                assinatura_id: {
                  type:DataTypes.STRING(50),
                  allowNull:false,
                },
                status: {
                  type:DataTypes.INTEGER,
                  allowNull:false
                }
        },{
            tableName:'usuario_plano'
        }
    )

    User_Plan.associate = models => {
        User_Plan.belongsTo(models.Plan, { foreignKey: 'plano_id', as: 'plano'})
      }

    return User_Plan

}