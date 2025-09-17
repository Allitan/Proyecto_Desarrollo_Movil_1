const { DataTypes } = require('sequelize');
const sequelize = require('../Connection/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: true
});

module.exports = Usuario;