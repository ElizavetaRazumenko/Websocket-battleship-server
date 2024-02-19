import WebSocket, { WebSocketServer } from 'ws';
import { handleWsRequest } from './handleWsRequest';

const wsPort = 3000;

export const wsServer = new WebSocketServer({
  port: wsPort,
});

wsServer.on('connection', (ws: WebSocket) => {
  console.log('WebSocket connection established');

  ws.on('message', (message: string) => {
    const request = JSON.parse(message);
    handleWsRequest(ws, request);
  });

  ws.on('close', () => {
    console.log('Connection interrupted');
  });
});
