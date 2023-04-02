export interface IPlayerBet {
  id: number;
  name: string;
  points: number;
  multiplier: number;
  score?: number;
}

export interface IPlayerInfo {
  id: number;
  name: string;
  points: number;
  clock?: string;
}

export interface IPlayerRanking {
  id: number;
  name: string;
  score: number;
}
