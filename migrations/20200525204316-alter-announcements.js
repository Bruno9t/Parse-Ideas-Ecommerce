'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.addColumn('anuncio', 'created_at', {
              type:Sequelize.DATE,
              allowNull:false
            }, { transaction: t }),
            
            queryInterface.removeColumn('anuncio', 'create_at', { transaction: t }),

            queryInterface.addColumn('anuncio', 'updated_at', {
              type:Sequelize.DATE,
              allowNull:false,
            }, { transaction: t }),

            queryInterface.removeColumn('anuncio', 'update_at', { transaction: t }),
        ])
    })
},

down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([

            queryInterface.removeColumn('anuncio', 'created_at', { transaction: t }),

            queryInterface.addColumn('anuncio', 'create_at', {
              type:Sequelize.DATE,
              allowNull:false
            }, { transaction: t }),

            queryInterface.removeColumn('anuncio', 'updated_at', { transaction: t }),

            queryInterface.addColumn('anuncio', 'update_at', {
              type:Sequelize.DATE,
              allowNull:false
            }, { transaction: t }),
        ])
    })
  }
};
