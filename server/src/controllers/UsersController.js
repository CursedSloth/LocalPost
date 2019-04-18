const {User} = require('../models');
// const config = require('../config/config')

module.exports = {
    async index (req, res) {
        try {
            const users = await User.findAll({
                limit: 10
            });
            res.send(users)
        } catch (err) {
            res.status(500).send({
                error: 'UserIndex fetch error'
            })
        }
    }
};