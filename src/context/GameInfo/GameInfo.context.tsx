import { createContext, ReactNode, useEffect, useState } from 'react'

export interface IGameContext {
    playerName: string;
    setPlayerName: React.Dispatch<React.SetStateAction<string>>;
    points:  number;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
    clock: string;
    setClock: React.Dispatch<React.SetStateAction<string>>;
    startTimer: () => void;
}

interface Props {
    children: ReactNode;
}

export const GameInfoContext = createContext<IGameContext>({
    playerName: "",
    setPlayerName: () => [],
    clock: "",
    setClock: () => {},
    points: 1000,
    setPoints: () => {},
    startTimer: () => {}
});


export default function GameInfoProvider({children}: Props) {
    const [playerName, setPlayerName] = useState("")
    const [clock, setClock] = useState("")
    const [points, setPoints] = useState(1000)
    const [time, setTime] = useState({minutes: 0, seconds: 0})

    useEffect(() => {
        let isMounted = true;

        return () => {
          isMounted = false;
          
        }
      }, [])

      useEffect(() => {
        let isMounted = true;

        const interval = setInterval(() => {
            if(!!!time.minutes && !!!time.seconds){
                console.log("TIMES UP!")
                clearInterval(interval)
            }else
            if(time.seconds > 0 ){
                setTime(prev => ({...prev, seconds: prev.seconds - 1}))
                
            }else{
                setTime(prev => ({seconds: 59, minutes: prev.minutes - 1}))
            }
            setClock(`${time.minutes.toString().padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`)
        }, 1000)

        return () => {
          isMounted = false
          clearInterval(interval)
        }
      }, [time])

  
      const startTimer = () => {
          setTime({minutes: 10, seconds: 0})
      }
    
    const values:IGameContext = {
        playerName, setPlayerName,
        clock, setClock,
        points, setPoints,
        startTimer
    }

    

  return (
      <GameInfoContext.Provider value={values}>
          {children}
      </GameInfoContext.Provider>
  )
}
