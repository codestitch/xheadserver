import { db } from '../sql/models';
import { NextFunction, Request, Response } from 'express';
import { UpdateOptions, DestroyOptions } from 'sequelize/types';

class TodosController {
   getAll(req: Request, res: Response, next: NextFunction) {
      db.Todo.findAll().then(todos =>
         res.status(200).json({
            data: todos
         })
      );
   }

   get(req: Request, res: Response, next: NextFunction) {
      const id = parseInt(req.params.id, 10);
      db.Todo.findByPk(id).then(todo => {
         if (todo) {
            return res.status(200).json({
               data: todo
            });
         }
         return res.status(404).json({
            data: 'todo does not exist'
         });
      });
   }

   create(req: Request, res: Response, next: NextFunction) {
      if (!req.body.title) {
         return res.status(400).json({
            data: 'title is required'
         });
      }

      db.Todo.findOne({
         where: { title: req.body.title }
      }).then(todoFound => {
         if (todoFound) {
            return res.status(403).json({
               data: `${req.body.title} already exist already`
            });
         }
         const todo = req.body;

         db.Todo.create(todo)
            .then((data) => res.status(201).json(data))
            .catch((err: Error) => res.status(500).json(err));
      });
   }

   update(req: Request, res: Response, next: NextFunction) {
      const todoId: number = parseInt(req.params.id, 10);
      const todo = req.body;
      const update: UpdateOptions = {
         where: { id: todoId },
         limit: 1
      };
      db.Todo.update(todo, update)
         .then(() => res.status(202).json({ data: todo }))
         .catch((err: Error) => res.status(500).json(err));
   }

   delete(req: Request, res: Response) {
      const todoId: number = parseInt(req.params.id, 10);
      const options: DestroyOptions = {
         where: { id: todoId },
         limit: 1
      };

      db.Todo.destroy(options)
         .then(() => res.status(204).json({ data: 'success' }))
         .catch((err: Error) => res.status(500).json(err));
   }
}

const todoController = new TodosController();
export default todoController;
