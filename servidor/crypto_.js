const crypto = require('crypto');
const CHAVE = process.env.CHAVE;
const IV = process.env.IV;
const ALGORITMO = process.env.ALGORITMO;
const METODO_CRIPTOGRAFIA = process.env.METODO_CRIPTOGRAFIA;
const METODO_DESCRIPTOGRAFIA = process.env.METODO_DESCRIPTOGRAFIA;

const encrypt = ((text) =>  {
  let cipher = crypto.createCipheriv(ALGORITMO, CHAVE, IV);
  let encrypted = cipher.update(text, 'utf8', METODO_CRIPTOGRAFIA);
  encrypted += cipher.final(METODO_CRIPTOGRAFIA);
  return encrypted;
});

const decrypt = ((text) => {
    let decipher = crypto.createDecipheriv(ALGORITMO, CHAVE, IV);
    let decrypted = decipher.update(text, METODO_DESCRIPTOGRAFIA, 'utf8');
    return (decrypted + decipher.final('utf8'));
 });

 module.exports = {encrypt, decrypt};