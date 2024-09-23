// metrics.js
import { register, Gauge } from 'prom-client';

const requestsCounter = new Gauge({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'path'],
});

// Middleware para contar requisições
export const metricsMiddleware = (req, res, next) => {
    requestsCounter.inc({ method: req.method, path: req.path });
    next();
};

// Rota para expor métricas
export const metricsRoute = (app) => {
    app.get('/metrics', async (req, res) => {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    });
};
