const Joi = require('joi');

module.exports = {
    register(req, res, next){
        const schema = {
          email: Joi.string().email(),
          password: Joi.string().regex(
              new RegExp(/^[a-zA-Z0-9]{8,32}$/)
          )
        };

        const {error} = Joi.validate(req.body, schema);
        if(error){
            switch(error.details[0].context.key){
                case 'email':
                    res.status(400).send({
                        error: 'Not valid email'
                    });
                    break;
                case 'password':
                    res.status(400).send({
                        error: `Password needs to:
                        <br>
                        1. Only contain valid characters(a-z, A-Z, 0-9)
                        <br>
                        2. Be 8 characters or longer`
                    });
                    break;
                default:
                    res.status(400).send({error: 'invalid credentials'});
                    break;
            }
        } else {
            next()
        }
    }
};