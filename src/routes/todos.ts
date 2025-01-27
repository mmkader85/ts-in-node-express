import { Router } from 'express';
import { todoCreateHandler, todoListHandler, todoPatchHandler, todoDeleteHandler } from '../controllers/todos';

const router = Router();

// Create a new todo
router.post('/', todoCreateHandler);

// Get all todos
router.get('/', todoListHandler);

// Update a todo
router.patch('/:id', todoPatchHandler);

// Delete a todo
router.delete('/:id', todoDeleteHandler);

export default router;
