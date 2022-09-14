// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

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

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.post('/logar', async (req, res) => {
  const usuario_cod = await usuario.findOne({where:{usuario: req.body.usuario}});
  
  if(req.body.usuario === usuario_cod.usuario && req.body.senha === usuario_cod.senha){
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 3600 // expires in 1 hour
    });

    res.cookie('token', token, { httpOnly: true });
    return res.json({ auth: true, token: token });
  }

  res.status(500).json({message: 'Login inválido!'});
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
 const usuarios = usuario.create(req.body);
 res.json(usuarios);
});

// listar usuarios
app.get('/usuarios', async function(req, res){
  var resultado = await usuario.findAll();
  res.json(resultado);
 // res.render("listar", {resultado})
})

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});