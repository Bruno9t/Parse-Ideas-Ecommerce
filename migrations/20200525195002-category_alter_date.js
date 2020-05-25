'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.addColumn('categoria', 'created_at', {
              type:Sequelize.DATE,
              allowNull:false
            }, { transaction: t }),
            
            queryInterface.removeColumn('categoria', 'create_at', { transaction: t }),

            queryInterface.addColumn('categoria', 'updated_at', {
              type:Sequelize.DATE,
              allowNull:false,
            }, { transaction: t }),

            queryInterface.removeColumn('categoria', 'update_at', { transaction: t }),
        ])
    })
},

down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([

            queryInterface.removeColumn('categoria', 'created_at', { transaction: t }),

            queryInterface.addColumn('categoria', 'create_at', {
              type:Sequelize.DATE,
              allowNull:false
            }, { transaction: t }),

            queryInterface.removeColumn('categoria', 'updated_at', { transaction: t }),

            queryInterface.addColumn('categoria', 'update_at', {
              type:Sequelize.DATE,
              allowNull:false
            }, { transaction: t }),
        ])
    })
  }
};
