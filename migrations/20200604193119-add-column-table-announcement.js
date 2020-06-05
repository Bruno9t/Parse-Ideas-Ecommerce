'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return  queryInterface.addColumn('anuncio', 'titulo', {
        type: Sequelize.DataTypes.STRING
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('anuncio', 'titulo')
  }
};
