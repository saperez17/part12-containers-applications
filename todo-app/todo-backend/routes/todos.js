const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const mongoose = require('mongoose')
const { getAsync, setAsync } = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  const currentTodosCounter = await getAsync('added_todos'); 
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });
  const currentTodosCounter = await getAsync('added_todos'); 
  const todoCounterResult = await setAsync('added_todos', parseInt(currentTodosCounter ?? 0)+1);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.status(200).send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const body = req.body
  const todo = {
    text: body.text || req.todo.text,
    done: body.done
  }
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo._id, todo, { new:true });
  res.send(updatedTodo); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
