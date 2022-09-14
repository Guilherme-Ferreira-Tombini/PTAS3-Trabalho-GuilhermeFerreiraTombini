'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      { nome: 'John Doe', usuario:"John" ,senha: '123' },
      { nome: 'Picolo', usuario:"Pic", senha: '123' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
