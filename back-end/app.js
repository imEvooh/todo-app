import dotenv from 'dotenv';
import express from 'express';
import databasePool from './src/config/db.js';

dotenv.config();

// Environment variables
const serverPort = process.env.PORT || 3000;
const host = process.env.DB_HOST || 'localhost';

const app = express();

app.use(express.urlencoded({ extended: false }));

// Ping the database to check the connection ( temporary for testing )
app.get('/ping_database', (req, res) => {
    databasePool.query('SELECT id, username, "password" FROM public.users;', (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Database connection error');
        } else {
            console.log('Database connected:', result.rows[0]);
            res.send(`Database connected: username is ${result.rows[0].username} and password is ${result.rows[0].password}`);
        }
    });
});

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API Todo !');
});

app.listen(serverPort, () => {
    console.log(`Server is running on http://${host}:${serverPort}`);
});