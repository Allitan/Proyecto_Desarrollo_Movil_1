const { DataTypes } = require('sequelize');
const sequelize = require('../Connection/database');

const Evento = sequelize.define('Evento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  fechaHora: {
    type: DataTypes.DATE,
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING,
  }
},{
    tableName: 'eventos',
    timestamp: false
});

module.exports = Evento;