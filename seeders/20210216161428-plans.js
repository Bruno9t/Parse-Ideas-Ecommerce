'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('plano', [
    {
      nome:"BASIC",
      valor:9.99,
      numero_de_anuncios:5,
      numero_de_fotos:5,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome:"MASTER",
      valor:19.99,
      numero_de_anuncios:12,
      numero_de_fotos:12,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome:"PREMIUM",
      valor:99.99,
      numero_de_anuncios:100,
      numero_de_fotos:100,
      created_at: new Date(),
      updated_at: new Date()
    }
  ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('plano', null, {});
  }
};
