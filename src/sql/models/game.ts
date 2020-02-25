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
import Player from './player';

@Table
export default class Game extends Model<Game> {
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
   remaining: number;

   @Column
   dead: string;

   @Column
   used: string;

   @HasMany(() => Player) players: Player[];
}

// interface GameAttributes {
//    deck?: number;
//    hasjoker?: boolean;
//    remaining?: number;
//    dead?: string;
//    used?: string;
// }

// interface GameInstance extends Model {
//    id: number;
//    createdAt: Date;
//    updatedAt: Date;

//    deck: number;
//    hasjoker: boolean;
//    remaining: number;
//    dead: string;
//    used: string;
// }

// type GameModelStatic = typeof Model &
//    (new (values?: object, options?: BuildOptions) => GameInstance);

// const Game = sequelize.define('Game', {
//    id: {
//       primaryKey: true,
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//       autoIncrement: true
//    },
//    deck: {
//       type: DataTypes.INTEGER
//    },
//    hasjoker: {
//       type: DataTypes.BOOLEAN
//    },
//    remaining: {
//       type: DataTypes.NUMBER
//    },
//    dead: {
//       type: DataTypes.STRING
//    },
//    used: {
//       type: DataTypes.STRING
//    }
// }) as GameModelStatic;

// Game.hasMany(Player, { sourceKey: 'id', foreignKey: 'gameId', as: 'players' });
// Player.belongsTo(Game, { foreignKey: 'gameId', targetKey: 'id', onDelete: 'CASCADE' });

// export { Game, GameAttributes }
