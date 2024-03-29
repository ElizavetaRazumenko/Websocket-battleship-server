import {
  AddUserToRoom,
  FrontRequest,
  PlayerReg,
  WebSocketWithId,
} from '../types/core';
import { AddShips, Attack, RandomAttack } from '../types/game';
import { startGame } from '../responses/startGame';
import { addUserToRoom } from '../responses/addUserToRoom';
import { createGame } from '../responses/createGame';
import { createRoom } from '../responses/createRoom';
import { regPlayer } from '../responses/regPlayer';
import { updateRoom } from '../responses/updateRoom';
import { updateWinners } from '../responses/updateWinners';
import { attack } from '../responses/attack';
import { randomAttack } from '../responses/randomAttack';
import { gameWithBot } from '../gameWithBot/gameWithBot';
import { singlePlayers } from '../db/db';

export const handleWsRequest = (ws: WebSocketWithId, request: FrontRequest) => {
  const isItSimpleGame = singlePlayers.find((player) => player.wsId === ws.id);
  console.log(`Received command: ${request.type}`);
  try {
    if (isItSimpleGame) {
      gameWithBot(ws, request);
    } else {
      switch (request.type) {
        case 'reg':
          regPlayer(ws, JSON.parse(request.data as string) as PlayerReg);
          updateRoom();
          updateWinners();
          break;
        case 'create_room':
          createRoom(ws);
          updateRoom();
          break;
        case 'add_user_to_room':
          addUserToRoom(
            ws,
            JSON.parse(request.data as string) as AddUserToRoom
          );
          updateRoom();
          createGame(JSON.parse(request.data as string) as AddUserToRoom);
          break;
        case 'add_ships':
          startGame(ws, JSON.parse(request.data as string) as AddShips);
          break;
        case 'attack':
          attack(JSON.parse(request.data as string) as Attack);
          break;
        case 'randomAttack':
          randomAttack(JSON.parse(request.data as string) as RandomAttack);
          break;
        case 'single_play':
          gameWithBot(ws, request);
          break;
      }
    }
  } catch (error) {
    console.log(`The following error occurred: ${error}`);
  }
};
