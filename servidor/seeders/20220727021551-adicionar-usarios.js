'use strict';

const criptografia = require('../crypto_');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      { nome: 'John Doe', usuario:"John" ,senha: criptografia.encrypt('Infomatica')},
      { nome: 'Picolo', usuario:"Pic", senha: criptografia.encrypt('Informatica')},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
