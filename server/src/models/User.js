'use strict';
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const Sequelize = require('sequelize');

function hashPassword (user) {
    const SALT_FACTOR = 8;

    if(!user.changed('password')){
        return;
    }

    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashSync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash);
            console.log(user.password)
        });
}

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
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
        timestamps: true,
        hooks: {
            beforeSave: hashPassword
        }
    });

    User.prototype.comparePassword = function (password) {
        return bcrypt.compare(password, this.password);
    };

    return User;
};