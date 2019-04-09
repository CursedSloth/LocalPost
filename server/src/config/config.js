//const crudOps = require('pg');
const Sequelize = require('sequelize');
const crudOps = new Sequelize({
   user: 'postgres',
   host: 'localhost',
   database: 'localpost',
   password: '1337Post',
   port: 5432,
   dialect: 'postgres'
});

const getUsers = (req,res) => {

    crudOps.query('SELECT * FROM "Users" ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error.stack);
        }
        res.status(200).json(results.rows);
    });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    crudOps.query('SELECT * FROM "Users" WHERE id = $1', [id], (error, results) =>{
        if (error) {
            console.log(error.stack);
        }
        res.status(200).json(results.rows);
    });
};

const createUser = (req, res) => {
    const {email, password} = req.body;

    crudOps.query('INSERT INTO Users (email, password) VALUES ($1, $2)', [email, password], (error, results) => {
        if (error) {
            console.log(error.stack);
        }
        res.status(201).send('User added with ID: ' + results.insertId);
    });
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const {email, password} = req.body;

    crudOps.query(
        'UPDATE Users SET email = $1, password = $2 WHERE id = $3',
        [email, password, id],
        (error, results) => {
            if (error) {
                console.log(error.stack);
            }
            res.status(200).send('User modified with ID: ' + results.insertId);
        }
    );
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    crudOps.query('DELETE FROM Users WHERE id = $1', [id], (error, results) => {
        if (error){
            console.log(error.stack);
        }
        res.status(200).send('User deleted with ID: ' + results.insertId);
    });
};

module.exports = {
    port: process.env.PORT || 8080,
    db: {
        database: process.env.DB_NAME || 'localpost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || '1337Post',
        /*options: {
            dialect: process.env.DIALECT || 'postgres',
            host: process.env.HOST || 'localhost',
        }*/
        dialect: 'postgres',
        host: 'localhost'
    },
    crudOps: {
        getUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
};