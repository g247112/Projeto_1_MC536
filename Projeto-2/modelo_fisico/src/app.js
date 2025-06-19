require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB, url } = require('./config/database');
const models = require('./models/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Conectar ao MongoDB
connectDB()
    .then(() => {
        console.log(`Conectado ao MongoDB em: ${url}`);
    })
    .catch(err => {
        console.error('Erro de conexão MongoDB:', err);
    });

app.get('/', (req, res) => {
    res.send('Bem-vindo à API do Sistema Escolar');
});

// Definir rotas aqui (ex.: para modelos)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});