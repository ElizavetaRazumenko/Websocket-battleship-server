import { WebSocketServer } from 'ws';
import crypto from 'crypto';
import { handleWsRequest } from './handleWsRequest';
import { usersConnections } from '../db/db';
import { IdentificationalWebSocket } from '../db/types';

const wsPort = 3000;

export const wsServer = new WebSocketServer({
  port: wsPort,
});

wsServer.on('connection', (ws: IdentificationalWebSocket) => {
  console.log('WebSocket connection established');

  const id = crypto.randomBytes(16).toString("hex");
  ws.id = id;

  usersConnections.push(ws)

  ws.on('message', (message: string) => {
    const request = JSON.parse(message);
    handleWsRequest(ws, request);
  });

  ws.on('close', () => {
    console.log('Connection interrupted');
  });
});
