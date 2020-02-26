import {
   Model,
   Table,
   Column,
   CreatedAt,
   UpdatedAt,
   PrimaryKey,
   HasMany,
   AutoIncrement
} from 'sequelize-typescript';
import { Player } from './player';

@Table
export class Game extends Model<Game> {
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
   deck: number;

   @Column
   hasjoker: boolean;

   @Column
   play: string;

   @Column
   dead: string;

   @Column
   used: string;

   @HasMany(() => Player) players: Player[];
}