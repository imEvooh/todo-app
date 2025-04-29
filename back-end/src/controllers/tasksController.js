import dotenv from 'dotenv';
import databasePool from '../config/db.js';
import asyncHandler from 'express-async-handler';

dotenv.config();

const taskController = {

    //GET all tasks for a user
    getTasks: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const selectQuery = `
            SELECT * FROM tasks
            WHERE user_id = $1;
        `;

        databasePool.query(selectQuery, [userId], (err, result) => {
            if (err)
                return res.status(500).json({ message: 'Database error' });
            res.status(200).json(result.rows);
        });
    }),

    createTask: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const { content } = req.body;
        const insertQuery = `
            INSERT INTO tasks (user_id, content)
            VALUES ($1, $2);
        `;

        databasePool.query(insertQuery, [userId, content], (err, result) => {
            if (err)
                return res.status(500).json({ message: 'Database error' });
            res.status(201).json({ message: 'Task created successfully' });
        });
    }),

    updateTask: asyncHandler(async (req, res) => {
        const { content, done } = req.body;
        const userId = req.user.id;
        const taskId = req.params.id;
        const updateQuery = `
            UPDATE tasks
            SET content = $1, done = $2
            WHERE id = $3 AND user_id = $4;
        `;

        databasePool.query(updateQuery, [content, done, taskId, userId], (err, result) => {
            if (err)
                return res.status(500).json({ message: 'Database error' });
            if (result.rowCount === 0)
                return res.status(404).json({ message: 'Task not found' });
            res.status(200).json({ message: 'Task updated successfully' });
        });
    }),

    deleteTask: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const taskId = req.params.id;
        const deleteQuery = `
            DELETE FROM tasks
            WHERE id = $1 AND user_id = $2;
        `;

        databasePool.query(deleteQuery, [taskId, userId], (err, result) => {
            if (err)
                return res.status(500).json({ message: 'Database error' });
            if (result.rowCount === 0)
                return res.status(404).json({ message: 'Task not found' });
            res.status(200).json({ message: 'Task deleted successfully' });
        });
    }),

    deleteAllTasks: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const deleteQuery = `
            DELETE FROM tasks
            WHERE user_id = $1;
        `;

        databasePool.query(deleteQuery, [userId], (err, result) => {
            if (err)
                return res.status(500).json({ message: 'Database error' });
            res.status(200).json({ message: 'All tasks deleted successfully' });
        });
    }),

};

export default taskController;