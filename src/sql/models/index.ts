// export * from './sequelize';
// export * from './todo';
// export * from './todoitem';
// export * from './game.model';
import { sequelize } from './sequelize';
import { Sequelize } from 'sequelize';
import { Todo } from './todo';
import { TodoItemDefineModel } from './todoitem';
import { Game } from './game.model';
import { Player } from './player.model';

export const db = {
   sequelize,
   Sequelize,
   Todo,
   TodoItemDefineModel,
   Game,
   Player
}