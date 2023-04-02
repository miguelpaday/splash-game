import { createContext, ReactNode, useEffect, useState } from 'react'
import { IPlayerInfo } from '../../@types/Player.type';
import { useSocket } from '../Socket/Socket.context';

export interface IGameContext {
   player1: IPlayerInfo,
   setPlayer1: React.Dispatch<React.SetStateAction<IPlayerInfo>>,
   startTimer: Function,
   slider: number;
   setSlider: React.Dispatch<React.SetStateAction<number>>;
}

interface Props {
    children: ReactNode;
}

export const GameInfoContext = createContext<IGameContext>({
    player1: {
        id: 0,
        name: '',
        points: 1000,
        clock: ""
    },
    startTimer: ()=>{},
    setPlayer1: ()=>{},
    slider: 1,
    setSlider: ()=>{}
});


export default function GameInfoProvider({children}: Props) {
    const [player1, setPlayer1] = useState<IPlayerInfo>({
        id: 0,
        name: '',
        points: 1000,
        clock: ""
    })
    const [time, setTime] = useState({minutes: 10, seconds: 0})
    const [slider, setSlider] = useState(1)
    const [timeStart, setTimeStart] = useState(false)
    const {socket} = useSocket();

    // useEffect(() => {
    //     let isMounted = true;

    //     if(!!player1.name){
    //         socket!.emit('join', player1)
    //     }

    //     return () => {
    //       isMounted = false;
          
    //     }
    //   }, [player1.name])

      useEffect(() => {
        let isMounted = true;

        const interval = setInterval(() => {
            if(!!!time.minutes && !!!time.seconds){
                clearInterval(interval)
            }else
            if(time.seconds > 0 ){
                setTime(prev => ({...prev, seconds: prev.seconds - 1}))
                
            }else{
                setTime(prev => ({seconds: 59, minutes: prev.minutes - 1}))
            }
            setPlayer1(prev => ({...prev, clock: `${time.minutes.toString().padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}))
                
        }, 1000)

        return () => {
          isMounted = false
          clearInterval(interval)
        }
      }, [timeStart, time])

  
      const startTimer = () => {
        setTimeStart(true)
      }
    
    const values:IGameContext = {
        player1, setPlayer1,
        startTimer,
        slider, setSlider
    }

    

  return (
      <GameInfoContext.Provider value={values}>
          {children}
      </GameInfoContext.Provider>
  )
}
