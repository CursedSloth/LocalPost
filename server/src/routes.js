const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
// const UsersController = require('./controllers/UsersController')
// const config = require('./config/config');

module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register);

    app.post('/login', AuthenticationController.login);

    // app.get('/users', UsersController.index())
};
