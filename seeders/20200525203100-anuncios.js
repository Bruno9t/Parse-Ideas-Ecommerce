'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('anuncio', [{
      categoria_id: 1,
      usuario_id: 12,
      preco: 5500,
      valor_estimado_estoque: 4000,
      faturamento_mm: 10500,
      lucro_mensal: 2500,
      data_fundacao: '1990/01/10',
      motivo_venda: 'Testando a plataforma Parse Ideas',
      descricao: 'E-Commerce de produtos farmaceuticos',
      qtd_funcionarios: 62,
      prioridade: 0,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      categoria_id: 2,
      usuario_id: 13,
      preco: 60000,
      valor_estimado_estoque: 0,
      faturamento_mm: 10000,
      lucro_mensal: 4500,
      data_fundacao: '1991/03/05',
      motivo_venda: 'Testando a plataforma Parse Ideas',
      descricao: 'Redes Sociais sobre tecnologia',
      qtd_funcionarios: 70,
      prioridade: 0,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      categoria_id: 3,
      usuario_id: 2,
      preco: 270000,
      valor_estimado_estoque: 0,
      faturamento_mm: 20000,
      lucro_mensal: 1000,
      data_fundacao: '2000/05/10',
      motivo_venda: 'Testando a plataforma Parse Ideas',
      descricao: 'Solução desenvolvido para análise de dados',
      qtd_funcionarios: 10,
      prioridade: 1,
      created_at: new Date(),
      updated_at: new Date()
    },{
      categoria_id: 1,
      usuario_id: 12,
      preco: 5500,
      valor_estimado_estoque: 4000,
      faturamento_mm: 10500,
      lucro_mensal: 2500,
      data_fundacao: '1990/01/10',
      motivo_venda: 'Testando a plataforma Parse Ideas',
      descricao: 'E-Commerce de produtos farmaceuticos',
      qtd_funcionarios: 62,
      prioridade: 0,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      categoria_id: 2,
      usuario_id: 13,
      preco: 60000,
      valor_estimado_estoque: 0,
      faturamento_mm: 10000,
      lucro_mensal: 4500,
      data_fundacao: '1991/03/05',
      motivo_venda: 'Testando a plataforma Parse Ideas',
      descricao: 'Redes Sociais sobre tecnologia',
      qtd_funcionarios: 70,
      prioridade: 0,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      categoria_id: 3,
      usuario_id: 2,
      preco: 270000,
      valor_estimado_estoque: 0,
      faturamento_mm: 20000,
      lucro_mensal: 1000,
      data_fundacao: '2000/05/10',
      motivo_venda: 'Testando a plataforma Parse Ideas',
      descricao: 'Solução desenvolvido para análise de dados',
      qtd_funcionarios: 10,
      prioridade: 1,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('anuncio', null, {});
  }
};
