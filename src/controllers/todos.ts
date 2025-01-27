// import {Request, Response, NextFunction } from 'express';
import {RequestHandler} from 'express';
import {Todo} from '../models/todo';
import {v4 as UuidV4} from 'uuid';

const TodoStorage:Todo[] = [];

// const todoCreateHandler = (req: Request, res:Response, next: NextFunction) => {
export const todoCreateHandler: RequestHandler = (req, res, next) => {
    const text:string = (req.body as {text:string}).text;
    const newTodo = new Todo(UuidV4(), text);

    TodoStorage.push(newTodo);

    res.status(201).json({
        'message': 'Todo created successfully!',
        'data': newTodo,
    });
};

export const todoListHandler: RequestHandler = (req, res, next) => {
    res.status(200).json({'data': TodoStorage});
}

export const todoPatchHandler:RequestHandler<{id:string}> = (req, res, next) => {
    const todoId:string = req.params.id;
    const todoUpdateText = (req.body as {'text':string}).text;

    const todoUpdateIndex = TodoStorage.findIndex(todo => todo.id === todoId);
    if (todoUpdateIndex == -1) {
        throw new Error('Todo ID not found!');
    }

    TodoStorage[todoUpdateIndex].text = todoUpdateText;

    res.status(200).json({
        'message': 'Todo updated successfully!',
        'data': TodoStorage[todoUpdateIndex],
    });
};

export const todoDeleteHandler:RequestHandler = (req,res,next) => {
    const todoId:string = (req.params as {id:string}).id;

    const todoDeleteIndex:number = TodoStorage.findIndex(todo => todo.id === todoId);
    if (todoDeleteIndex === -1) {
        throw new Error('Todo ID not found!');
    }

    TodoStorage.splice(todoDeleteIndex, 1);

    res.status(200).json({'message': 'Todo deleted successfully!'});
};
