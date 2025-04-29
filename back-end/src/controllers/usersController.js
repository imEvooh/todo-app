import databasePool from '../config/db.js';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const userController = {

    // POST request to register a new user
    user_register: asyncHandler(async (req, res) => {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = `
                            INSERT INTO users(username, password)
                            VALUES ($1, $2)
                            ON CONFLICT (username) DO NOTHING
                            RETURNING id;`;
    
        databasePool.query(insertQuery, [username, hashedPassword], (err, result) => {
                if (err)
                    return res.status(500).json({ message: 'Database error' });
                if (result.rows.length === 0)
                    return res.status(409).json({ message: 'User already exists' });

                const userId = result.rows[0].id;
                const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.cookie('token', token, { httpOnly: true });
                console.log(`User created successfully: ${username}`);
                res.status(201).json({
                    message: 'User created successfully',
                    username: username,
                });
        });
    }),

    // POST request to login a user
    user_login: asyncHandler( async (req, res) => {
        const { username, password } = req.body;
        const selectQuery = `SELECT * FROM users WHERE username = $1;`;

        databasePool.query(selectQuery, [username], async (err, result) => {
            if (err)
                return res.status(500).json({ message: 'Database error' });
            if (result.rows.length === 0)
                return res.status(404).json({ message: 'User not found' });

            const user = result.rows[0];
            const isPasswordMatching = await bcrypt.compare(password, user.password);
            
            console.log('User found:', user);
            if (isPasswordMatching) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.cookie('token', token, { httpOnly: true });
                res.status(200).json({
                    message: 'Login successful',
                    username: username,
                });
            } else
                res.status(401).json({ message: 'Invalid credentials' });
        });
    }),

};

export default userController;