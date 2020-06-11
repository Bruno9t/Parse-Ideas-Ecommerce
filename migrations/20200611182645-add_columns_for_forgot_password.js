'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'usuario',
        'password_reset_token',
        {
          type: Sequelize.DataTypes.STRING(50),
        },
        { transaction }
      );

      await queryInterface.addColumn(
        'usuario',
        'expires_token',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('usuario', 'password_reset_token', { transaction });
      await queryInterface.removeColumn('usuario', 'expires_token', { transaction });
      
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
