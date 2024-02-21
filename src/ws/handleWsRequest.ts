import { AddUserToRoom, FrontRequest, PlayerReg, WebSocketWithId } from '../db/types';
import { addUserToRoom } from '../responses/addUserToRoom';
import { createRoom } from '../responses/createRoom';
import { regPlayer } from '../responses/personal';
import { updateRoom } from '../responses/updateRoom';
import { updateWinners } from '../responses/updateWinners';

export const handleWsRequest = (ws: WebSocketWithId, request: FrontRequest) => {
  switch (request.type) {
    case 'reg':
      regPlayer(ws, request.data as PlayerReg);
      updateRoom(ws);
      updateWinners(ws);
      break;
    case 'create_room':
      createRoom(ws);
      updateRoom(ws);
      break;
    case 'add_user_to_room':
      addUserToRoom(ws, request.data as AddUserToRoom);
      updateRoom(ws);
      break;
  }
};
