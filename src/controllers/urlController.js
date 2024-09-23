import { nanoid } from 'nanoid'; // Importação estática
import Url from '../models/Url.js'; // Importação do modelo de URL

// Função para encurtar URL
export const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;
    const shortId = nanoid(6); // Gera um ID de 6 caracteres

    try {
        const newUrl = await Url.create({ originalUrl, shortUrl: shortId });
        res.status(201).json({
            originalUrl,
            shortUrl: `http://seu-dominio.com/${shortId}`,
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao encurtar a URL' });
    }
};

// Função para encurtar URL com autenticação
export const shortenUrlAuth = async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = nanoid(6);
    
    try {
        const url = await Url.create({ originalUrl, shortUrl, userId: req.user.userId });
        res.json({ shortUrl: `${process.env.BASE_URL}/${shortUrl}` });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao encurtar a URL com autenticação' });
    }
};

// Função para redirecionar URL
export const redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;
    
    try {
        const url = await Url.findOne({ where: { shortUrl, isDeleted: false } });
        if (!url) return res.status(404).json({ error: 'URL not found' });

        url.clicks += 1;
        await url.save();
        
        // Retornar a URL original no corpo da resposta
        res.json({ originalUrl: url.originalUrl });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao redirecionar a URL' });
    }
};


// Função para atualizar URL
export const updateUrl = async (req, res) => {
    const { id } = req.params;
    const { newOriginalUrl } = req.body;
  
    try {
      const url = await Url.findOne({ where: { id, userId: req.user.userId, isDeleted: false } });
      if (!url) return res.status(404).json({ error: 'URL not found' });
  
      url.originalUrl = newOriginalUrl;
      url.updatedAt = new Date();
      await url.save();
      res.json({ message: 'URL updated' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar a URL' });
    }
  };
  

// Função para excluir URL
export const deleteUrl = async (req, res) => {
    const { id } = req.params;

    try {
        const url = await Url.findOne({ where: { id, userId: req.user.userId, isDeleted: false } });
        if (!url) return res.status(404).json({ error: 'URL not found' });

        url.isDeleted = true;
        await url.save();
        res.json({ message: 'URL deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir a URL' });
    }
};
