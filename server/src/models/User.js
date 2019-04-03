'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: Sequelize.STRING,
    }, {
        timestamps: false
    });
};