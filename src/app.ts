import express, {Request, Response, NextFunction} from 'express';
import todoRouter from './routes/todos';
import { json } from 'body-parser';

const app = express();

// parse the json in the incoming request and attach it to body
app.use(json());

app.use('/todos', todoRouter);

// app.use((req, res, next) => { // middleware without error param
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        'error_message': err.message,
    });
});

app.listen(3000);
