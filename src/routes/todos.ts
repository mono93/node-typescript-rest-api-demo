import { Router } from 'express';
const router = Router();

import { Todo } from '../models/todos';

type RequestBody = { text: string };
type RequestParams = { todoId: string };
let todo: Todo[] = [];

router.get('/', (req, res, next) => {
    res.status(200).send({
        data: todo
    })
});

router.post('/todo', (req, res, next) => {
    const newTodo: Todo = { id: new Date().toISOString(), text: req.body.text };
    todo.push(newTodo);
    res.status(201).json({ message: 'Added Todo', todo: newTodo, todos: todo });
});

router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    const tid = params.todoId;
    const body = req.body as RequestBody;
    const todoIndex = todo.findIndex((todoItem) => todoItem.id === tid);
    if (todoIndex >= 0) {
        todo[todoIndex] = { id: todo[todoIndex].id, text: body.text };
        return res.status(200).json({ message: 'Updated todo', todos: todo });
    }
    res.status(404).json({ message: 'Could not find todo for this id.' });
});

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    todo = todo.filter((todoItem) => todoItem.id !== params.todoId);
    res.status(200).json({ message: 'Deleted todo', todos: todo });
});

export default router