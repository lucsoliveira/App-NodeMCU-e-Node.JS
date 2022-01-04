/*

*/

// LIBS
const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express')
const bodyParser = require('body-parser')

/* CONFIGURAÇÕES */
const app = express()
app.set('view engine', 'ejs'); //setamos a engine de views para EJS
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // parse application/json
app.use(express.static('static'))
const port = 3000
const hostname = '192.168.0.136';

/* BANCO DE DADOS */
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'banco.sqlite'
});

/* IMPORTAÇÕES DAS ROTAS E DOS MODELOS DO BANCO */
require('./models.js')(sequelize, Model, DataTypes)
require('./routes.js')(app)

app.listen(port, () => {
  console.log(`Aplicação rodando em: http://${hostname}:${port}`)
})