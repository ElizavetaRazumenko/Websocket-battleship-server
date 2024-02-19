export type Player = {
  name: string;
  password: string;
  wins: number;
}

export type FrontRequest = {
  type: string,
  data: PlayerRegRequest;
  id: number,
}

type PlayerRegRequest = {
  name: string;
  password: string;
}
