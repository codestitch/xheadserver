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

/**
 * @typedef Game
 * @property {integer} deckcount - number of deck
 * @property {integer} playercount - number of deck
 * @property {boolean} hasjoker - if it has joker
 * @property {string} play - cards in play pile
 * @property {string} dead - cards in dead pile
 * @property {string} used - cards in used by players
 */
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
   playercount: number;

   @Column
   deckcount: number;

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
