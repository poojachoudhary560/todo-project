import express from 'express';
import TodoController from '../todosControllers/todos';

const router = express.Router();  // create router handler


// get all todos
router.get('/api/v1/todos', TodoController.getAllTodos);

// add a todo
router.post('/api/v1/todos', TodoController.createTodo);

// get a single todo
router.get('/api/v1/todos/:id', TodoController.getTodo);

//delete todo
router.delete('/api/v1/todos/:id', TodoController.deleteTodo);

//update todo
router.put('/api/v1/todos/:id', TodoController.updateTodo);


export default router;
