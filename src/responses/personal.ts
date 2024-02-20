import crypto from 'crypto';
import { players } from '../db/db';
import { isPlayerExist } from '../utils/isPlayerExist';
import { IdentificationalWebSocket, Player } from '../db/types';

type UserData = {
  name: string;
  password: string;
};

export const regPlayer = (ws: IdentificationalWebSocket, { name, password }: UserData) => {
  if (!isPlayerExist(name, password)) {
    players.push({ id: ws.id, name, password, wins: 0 });
  }

  const player = players.find(
    (player) => player.id === ws.id
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
