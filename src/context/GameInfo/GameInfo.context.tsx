import { createContext, ReactNode, useState } from 'react'

export interface IGameContext {
    playerName: string;
    setPlayerName: React.Dispatch<React.SetStateAction<string>>;
    points:  number;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
    clock: Date;
    setClock: React.Dispatch<React.SetStateAction<Date>>;
}

interface Props {
    children: ReactNode;
}

export const GameInfoContext = createContext<IGameContext>({
    playerName: "",
    setPlayerName: () => [],
    clock: new Date(),
    setClock: () => {},
    points: 1000,
    setPoints: () => {}
});


export default function GameInfoProvider({children}: Props) {
    const [playerName, setPlayerName] = useState("")
    const [clock, setClock] = useState( new Date())
    const [points, setPoints] = useState(0)

    
    const values:IGameContext = {
        playerName, setPlayerName,
        clock, setClock,
        points, setPoints
    }

  return (
      <GameInfoContext.Provider value={values}>
          {children}
      </GameInfoContext.Provider>
  )
}
