'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.addColumn('usuario', 'created_at', {
              type:Sequelize.DATE,
              allowNull:false
            }, { transaction: t }),
            
            queryInterface.removeColumn('usuario', 'create_at', { transaction: t }),

            queryInterface.addColumn('usuario', 'updated_at', {
              type:Sequelize.DATE,
              allowNull:false
            }, { transaction: t }),

            queryInterface.removeColumn('usuario', 'update_at', { transaction: t }),
        ])
    })
},

down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([

            queryInterface.removeColumn('usuario', 'created_at', { transaction: t }),

            queryInterface.addColumn('usuario', 'create_at', {
              type:Sequelize.DATE,
              allowNull:false
            }, { transaction: t }),

            queryInterface.removeColumn('usuario', 'updated_at', { transaction: t }),

            queryInterface.addColumn('usuario', 'update_at', {
              type:Sequelize.DATE,
              allowNull:false
            }, { transaction: t }),
        ])
    })
}


};
