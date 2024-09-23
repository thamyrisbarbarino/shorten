// src/app.js
const express = require('express');
const swaggerConfig = require('./config/swagger');
import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis do arquivo .env


const app = express();

// Configurações padrão
app.use(express.json());

// Swagger
swaggerConfig(app);

// Rotas
const routes = require('./routes/index');
app.use('/api', routes);

module.exports = app;
