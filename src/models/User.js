import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Ajuste o caminho se necessário

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default User; // Exportação padrão do modelo User
