import { Express } from 'express';
import todoController from '../controllers/todos';

export function routes(app: Express) {
   app.get('/api/v1/todos', todoController.getAll);
   app.get('/api/v1/todos/:id', todoController.get);
   app.post('/api/v1/todos', todoController.create);
   app.put('/api/v1/todos/:id', todoController.update);
   app.delete('/api/v1/todos/:id', todoController.delete);
}
