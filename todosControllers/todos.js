import db from '../db/db';
class TodosController{
  getAllTodos(req, res){
    res.status(200).send({ //res.send sends back a response to the client
      success: 'true', //res.status is used to send back the status of the request
      message: 'todo received successfully',
      todos: db
    });
  }

  getTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    db.map((todo) => {
      if (todo.id === id) {
        res.status(200).send({
          success: 'true',
          message: 'todo retrieved successfully',
          todo,
        });
      }
    });
    res.status(404).send({
      success: 'false',
      message: 'todo does not exist',
    });
  }

  createTodo(req, res){
    if(!req.body.title){
      return res.status(400).send({
        success: 'false',
        message: 'title is required!'
      });
    } else if(!req.body.description){
      return res.status(400).send({
        success: 'false',
        message: 'decription is required!'
      });
    }
    const todo = {
      id: db.length + 1,
      title: req.body.title,
      description: req.body.description
    }
    db.push(todo);
    return res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      todo
    });
  }

  updateTodo(req, res){
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
      if(todo.id === id){
        todoFound = todo;
        itemIndex = index;
      }
    });
    if(!todoFound){
      res.status(404).send({
        success: 'false',
        message: 'todo not found!'
      });
    }

    if(!req.body.title){
      return res.status(400).send({
        success: 'false',
        message: 'title is required'
      });
    } else if(!req.body.description){
      return res.status(400).send({
        success: 'false',
        message: 'description is required'
      });
    }

    const updatedTodo = {
      id: todoFound.id,
      title: req.body.title,
      description: req.body.description
    };
    db.splice(itemIndex, 1, updatedTodo);

    return res.status(201).send({
      success: 'true',
      message: 'todo added successfully',
      updatedTodo,
    });
  }
  deleteTodo(req, res){
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'false',
        message: 'todo not found',
      });
    }
    db.splice(itemIndex, 1);

    return res.status(200).send({
      success: 'true',
      message: 'Todo deleted successfuly',
    });
  }
}
const todoController = new TodosController();
export default todoController;
