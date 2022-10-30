'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      { nome: 'John Doe', usuario:"John" ,senha: 'Infomatica'},
      { nome: 'Picolo', usuario:"Pic", senha: 'Informatica'},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
