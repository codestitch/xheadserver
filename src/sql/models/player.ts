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
import Game from './game';

@Table
export default class Player extends Model<Player> {
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

// export interface PlayerAttributes {
//    name?: string;
//    blinds?: string;
//    hands?: string;
//    trumps?: string;
// }

// export interface PlayerInstance extends Model<PlayerAttributes>, PlayerAttributes {
//    id: number;
//    createdAt: Date;
//    updatedAt: Date;

//    name: string;
//    blinds: string;
//    hands: string;
//    trumps: string;
// }

// export const PlayerFactory = (sequelize: Sequelize, dataType: typeof DataTypes): Model<PlayerInstance, PlayerAttributes> => {
//    const attributes: SequelizeAttributes
// }

// type PlayerModelStatic = typeof Model &
//    (new (values?: object, options?: BuildOptions) => PlayerInstance);

// const Player = sequelize.define('Player', {
//    id: {
//       primaryKey: true,
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//       autoIncrement: true
//    },
//    name: {
//       type: DataTypes.STRING
//    },
//    blinds: {
//       type: DataTypes.STRING
//    },
//    hands: {
//       type: DataTypes.STRING
//    },
//    trumps: {
//       type: DataTypes.STRING
//    }
// }) as PlayerModelStatic;

// export { Player, PlayerAttributes }
