'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categoria', [{
      nome: 'E-Commerce',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Redes Sociais',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Soluções',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categoria', null, {});
  }
};
