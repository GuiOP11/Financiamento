import { Sequelize, DataTypes } from 'sequelize';
import db from '../db/index.js';

const Car = db.define('Car', {
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
  tableName: 'cars',
  timestamps: true,
});

export default Car;