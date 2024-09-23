import express from 'express';
import {
  shortenUrl,
  redirectUrl,
  updateUrl,
  deleteUrl,
  shortenUrlAuth
} from '../controllers/urlController.js'; // Importando as funções do controlador
import { register, login } from '../controllers/authControllers.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Autenticação
router.post('/register', register);
router.post('/login', login);

// Encurtamento de URLs
router.post('/shorten', shortenUrl);
router.post('/auth/shorten', authenticate, shortenUrlAuth);
router.put('/urls/:id', authenticate, updateUrl); // Verifique se updateUrl está importado corretamente
router.delete('/urls/:id', authenticate, deleteUrl);
router.get('/:shortId',   redirectUrl);

export default router;