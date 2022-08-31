# iniciando projeto
npm init
yarn add sequelize express pg
yarn add sequelize-cli nodemon --dev

# Iniciando projeto
yarn sequelize init

# Adicionado modelo
yarn sequelize-cli model:create --name usuario --attributes nome:string
Alterar configurações do banco

# Persistir modelo no banco
yarn sequelize-cli db:create
yarn sequelize-cli db:migrate

# Adicionar dataDefault
defaultValue: Sequelize.fn('NOW')

# Criar um seed
yarn sequelize-cli seed:generate --name adicionar-usarios

# Configurações do git Local
git init
git config user.name "Luiz Picolo"
git config user.email "luizpicolo@gmail.com"  

# GitIgnore
.gitignore

git add . 
git commit -m "Mensagem inicial"
git remote add origin https://github.com/luizpicolo/teste.git

# Criar Token de acesso caso não tenha

# Enviar código
git push origin main