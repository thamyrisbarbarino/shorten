import User from '../models/User.js'; // Ajuste o caminho conforme necessário
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Função de registro
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    logger.info(`Registration attempt for: ${email}`);
    res.status(201).json({ message: 'User registered successfully' });
};

// Função de login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Iniciando login para:", email);
        
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log("Usuário não encontrado");
            return res.status(401).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log("Credenciais inválidas");
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            const newToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token: newToken });
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET);
            return res.json({ token });
        } catch (err) {
            console.log("Token inválido, gerando um novo");
            const newToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token: newToken });
        }
    } catch (error) {
        console.error("Erro interno:", error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

