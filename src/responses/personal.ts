import WebSocket from 'ws';
import { players } from '../db/db';
import { isPlayerExist } from '../utils/isPlayerExist';
import { Player } from '../db/types';

type UserData = {
  name: string;
  password: string;
};

export const regPlayer = (ws: WebSocket, { name, password }: UserData) => {
  if (!isPlayerExist(name, password)) {
    players.push({ name, password, wins: 0 });
  }

  const player = players.find(
    (player) => player.name === name && player.password === password
  ) as Player;
  const responseData = {
    type: 'reg',
    data: JSON.stringify({
      name,
      index: players.indexOf(player),
      error: false,
      errorText: '',
    }),
    id: 0,
  };

  ws.send(JSON.stringify(responseData));
};
