module.exports = (sequelize, DataTypes) => {
    sequelize.define('User', {
        email: {
            type: DataTypes.String,
            unique: true
        },
        password: DataTypes.String
    })
};