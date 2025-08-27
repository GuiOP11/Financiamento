import { Sequelize, DataTypes } from 'sequelize';
import db from '../db/index.js';

const Moto = db.define('Moto', {
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'moto',
  timestamps: true,
});

export default Moto;