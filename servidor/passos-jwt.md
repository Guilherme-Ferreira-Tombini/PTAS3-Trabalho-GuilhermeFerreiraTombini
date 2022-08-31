# Adicionando ejs
yarn add ejs

# Adicionar no index.js
app.set('view engine', 'ejs');

# Criar Rotas
/
Post /autenticar
Post /logar
Post /deslogar

# Criar Formulário

# JWT
yarn add jsonwebtoken dotenv-safe
yarn add express-jwt cors  

# Adicionando CORS
const cors = require('cors');

# Arquivo index
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

# Criar arquivo .env.example
.env.example
