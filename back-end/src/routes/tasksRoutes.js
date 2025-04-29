import express from 'express';
import taskController from '../controllers/tasksController.js';
import cookieJwtAuth from '../middleware/cookieJwtAuth.js';

const taskRouter = express.Router();

taskRouter.use(cookieJwtAuth);

/// ROUTES FOR TASKS ///

// GET all tasks for an user
taskRouter.get('/', taskController.getTasks);

// POST a new task for an user
taskRouter.post('/create_task', taskController.createTask);

// PUT to update a task for an user
taskRouter.put('/update_task/:id', taskController.updateTask);

// DELETE a task for an user
taskRouter.delete('/delete_task/:id', taskController.deleteTask);

// DELETE all tasks for an user
taskRouter.delete('/delete_all_tasks', taskController.deleteAllTasks);

export default taskRouter;