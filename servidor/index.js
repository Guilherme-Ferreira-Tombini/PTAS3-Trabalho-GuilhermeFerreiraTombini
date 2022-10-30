// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

const crypto = require('crypto');
const CHAVE = process.env.CHAVE;
const IV = process.env.IV;
const ALGORITMO = process.env.ALGORITMO;
const METODO_CRIPTOGRAFIA = process.env.METODO_CRIPTOGRAFIA;
const METODO_DESCRIPTOGRAFIA = process.env.METODO_DESCRIPTOGRAFIA;

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar"] })
);

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

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.post('/logar', async (req, res) => {
  const usuario_cod = await usuario.findOne({where:{usuario: req.body.usuario}});
  const usuario_senha = decrypt(usuario_cod.senha);
  if(usuario_cod === null){
    res.status(500).json({message: 'Login inválido!'});
  } else if(req.body.usuario === usuario_cod.usuario && req.body.senha === usuario_senha){
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 3600 // expires in 1 hour
    });

    res.cookie('token', token, { httpOnly: true });
    return res.json({ auth: true, token: token });
  } else{
    res.status(500).json({message: 'Login inválido!'});
  }

})

app.post('/deslogar', function(req, res) {
  res.cookie('token', null, { httpOnly: true });
  res.json({deslogado: true})
})

// Cadastro de usuarios
app.get('/inscrever', async function(req, res){
  res.render("inscrever")
});

app.post('/cadastro', async function(req, res){
 const dados = encrypt(req.body.senha);
 const usuarios = usuario.create(
   {
     nome: req.body.nome,
     usuario: req.body.usuario,
     senha: dados
   });
 console.log(req.body.nome, req.body.usuario, dados);
 res.render("home");
});

// listar usuarios
app.get('/usuarios', async function(req, res){
  var resultado = await usuario.findAll();
  res.render("usuarios", {resultado});
})

app.listen(4000, function() {
  console.log('App de Exemplo escutando na porta 4000!')
});