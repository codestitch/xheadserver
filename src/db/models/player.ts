import {
   Model,
   Table,
   Column,
   CreatedAt,
   UpdatedAt,
   PrimaryKey,
   ForeignKey,
   BelongsTo,
   AutoIncrement
} from 'sequelize-typescript';
import { Game } from './game';

@Table
export class Player extends Model<Player> {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @CreatedAt
   @Column
   createdAt: Date;

   @UpdatedAt
   @Column
   updatedAt: Date;

   @Column
   name: string;

   @Column
   blinds: string;

   @Column
   hands: string;

   @Column
   trumps: string;

   @ForeignKey(() => Game)
   @Column
   gameId: number;

   @BelongsTo(() => Game)
   team: Game;
}