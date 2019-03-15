const Pool = require('pg').Pool;
const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'localpost',
   password: '1337Post',
   port: 5432
});

const getUsers = (req,res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error.stack);
        }
        res.status(200).json(results.rows);
    });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) =>{
        if (error) {
            console.log(error.stack);
        }
        res.status(200).json(results.rows);
    });
};

const createUser = (req, res) => {
    const {email, password} = req.body;

    pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password], (error, results) => {
        if (error) {
            console.log(error.stack);
        }
        res.status(201).send('User added with ID: ' + results.insertId);
    });
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const {email, password} = req.body;

    pool.query(
        'UPDATE users SET email = $1, password = $2 WHERE id = $3',
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

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
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
        options: {
            dialect: process.env.DIALECT || 'postgres',
            host: process.env.HOST || 'localhost',
        }
    },
    pool: {
        getUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser
    }
};