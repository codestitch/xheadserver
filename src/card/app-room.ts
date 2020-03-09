import { Room, Client } from 'colyseus';
import { GameState } from './game-state';
import { RoomMetaData } from './models/room-metadata';
import { StateActionEnum } from './models/state-action-enum';
import { StateAction } from './models/state-action';

export class AppRoom extends Room<GameState, RoomMetaData> {
   maxClients = 4;

   onCreate(options: RoomMetaData) {
      this.maxClients = options.maxPlayer;
      this.setMetadata(options);
      this.setState(new GameState(options.hasJoker));

      console.log('ROOM CREATED!', options);
   }

   onJoin(client: Client, options: RoomMetaData) {
      this.state.createPlayer(client.sessionId, `${options.playerName}`);

      console.log('CLIENT JOINED!', client.sessionId, options);
      this.broadcast(`${client.sessionId} joined.`);
   }

   onMessage(client: Client, message: StateAction) {
      console.log(
         'ON MESSAGE received message from',
         client.sessionId,
         ':',
         message
      );
      switch (message.action) {
         case StateActionEnum.START:
            this.state.start();
            break;

         case StateActionEnum.DRAW:
            this.state.drawCard(client.sessionId, message.data.count);
            break;
      }
   }

   onLeave(client: Client, consented: boolean) {
      this.state.removePlayer(client.sessionId);
      this.broadcast(`${client.sessionId} left.`);
   }

   onDispose() {
      console.log('Dispose BasicRoom');
   }
}
