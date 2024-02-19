import WebSocket from 'ws';
import { FrontRequest } from '../db/types';
import { regPlayer } from '../responses/personal';

export const handleWsRequest = (ws: WebSocket, request: FrontRequest) => {
  switch (request.type) {
    case 'reg':
      regPlayer(ws, request.data);
      break;
  }
};