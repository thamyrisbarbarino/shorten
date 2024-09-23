import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './src/config/swagger.json' assert { type: 'json' };
import logger from './src/config/logger.js';
import { metricsMiddleware, metricsRoute } from './src/config/metric.js';
import { shortenUrl, shortenUrlAuth, redirectUrl, updateUrl, deleteUrl } from './src/controllers/urlController.js';
import { authenticate } from './src/middlewares/auth.js';
import { register,login } from './src/controllers/authControllers.js';


const app = express();
app.use(express.json());
app.use(metricsMiddleware);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
metricsRoute(app);
console.log("JWT_SECRET:", process.env.JWT_SECRET);


// Rotas
app.post('/shorten', shortenUrl);
app.post('/shorten/auth', authenticate, shortenUrlAuth);
app.get('/redirect/:shortUrl', redirectUrl);
app.put('/urls/:id', authenticate, updateUrl);
app.delete('/urls/:id', authenticate, deleteUrl);
app.post('/auth/register',register);
app.post('/auth/login',login);


// Inicializando o servidor
app.listen(PORT, () => {
    logger.info('Server is running on http://localhost:3000');
  console.log(`Server is running on http://localhost:${PORT}`);
});
