'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('User', {
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
};