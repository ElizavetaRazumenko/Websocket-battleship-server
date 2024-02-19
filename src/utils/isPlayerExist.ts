import { players } from '../db/db';

export const isPlayerExist = (name: string, password: string): boolean => {
  return !!players.find((player) => player.name === name && player.password === password);
};