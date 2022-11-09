'use strict';

const crypto = require('crypto');
const CHAVE = process.env.CHAVE;
const IV = process.env.IV;
const ALGORITMO = process.env.ALGORITMO;
const METODO_CRIPTOGRAFIA = process.env.METODO_CRIPTOGRAFIA;

const encrypt = ((text) =>  {
  let cipher = crypto.createCipheriv(ALGORITMO, CHAVE, IV);
  let encrypted = cipher.update(text, 'utf8', METODO_CRIPTOGRAFIA);
  encrypted += cipher.final(METODO_CRIPTOGRAFIA);
  return encrypted;
});

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      { nome: 'John Doe', usuario:"John" ,senha: encrypt('Infomatica')},
      { nome: 'Picolo', usuario:"Pic", senha: encrypt('Informatica')},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
