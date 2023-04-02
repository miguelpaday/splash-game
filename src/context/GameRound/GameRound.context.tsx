import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { IPlayerBet } from "../../@types/Player.type";
import { GameInfoContext } from "../GameInfo/GameInfo.context";
import { useSocket } from "../Socket/Socket.context";

export interface IGameRoundContext {
    playerBet: IPlayerBet;
    setPlayerBet: React.Dispatch<React.SetStateAction<IPlayerBet>>,
    hasStarted: boolean;    
    setHasStarted: React.Dispatch<React.SetStateAction<boolean>>,
    selectedMultiplier: number;
    animationDone: boolean;
    setAnimationDone: React.Dispatch<React.SetStateAction<boolean>>
    allPlayers: IPlayerBet[];
    setAllPlayers:  React.Dispatch<React.SetStateAction<IPlayerBet[]>>
}

export const GameRoundContext = createContext<IGameRoundContext>({
    playerBet: {
        id: 0,
        name: "",
        points: 0,
        multiplier: 0
    },
    setPlayerBet: ()=>{},
    hasStarted: false,
    setHasStarted: ()=>{},
    selectedMultiplier: 0,
    animationDone: false,
    setAnimationDone: ()=>{},
    allPlayers: [],
    setAllPlayers: ()=>{},
})

interface Props {
    children: ReactNode;
}

export const GameRoundProvider = ({children}: Props) => {
    const {player1} = useContext(GameInfoContext)
    const {socket, isConnected} = useSocket();
    const [hasStarted, setHasStarted] = useState(false)
    const [animationDone, setAnimationDone] = useState(false)
    const [selectedMultiplier, setSelectedMultiplier] = useState(0)
    const [allPlayers, setAllPlayers] = useState<IPlayerBet[]>([])
    const [playerBet, setPlayerBet] = useState<IPlayerBet>({
        id: player1.id,
        name: player1.name,
        points: 50,
        multiplier: 1
    });

    const values: IGameRoundContext= {
        playerBet, setPlayerBet,
        hasStarted, setHasStarted,
        selectedMultiplier,
        animationDone, setAnimationDone,
        allPlayers, setAllPlayers
    }

    useEffect(() => {
        if(animationDone){
            setTimeout(()=>{
                setAnimationDone(false)
                setHasStarted(false)
                setSelectedMultiplier(0)
            }, 10000)
            
        }
    
    }, [animationDone])
    

    useEffect(() => {
      let isMounted = true;
        
        if(!!player1.name){
            setPlayerBet({...playerBet, name: player1.name})
            console.log(playerBet)
            const entry:IPlayerBet = {
                id: player1.id,
                name: player1.name,
                points: playerBet.points,
                multiplier: playerBet.multiplier,
                score: player1.points
            }
            socket!.emit('join', entry)
            socket!.emit('rankingInit', entry)
            
        }

      return () => {
        isMounted = false
      }
    }, [player1.name])
    

    useEffect(() => {
      let isMounted = true
          if(isConnected && hasStarted){
            const entry:IPlayerBet = {
                id: player1.id,
                name: player1.name,
                points: playerBet.points,
                multiplier: playerBet.multiplier
            }
              socket!.emit('betStart', entry,  (response: {players: IPlayerBet[], multiplier: number})=>{
                setSelectedMultiplier(response.multiplier)
                setAllPlayers(response.players)
              })

            }
            
      return () => {
        isMounted = false
      }
    }, [hasStarted, isConnected])
    

    return (
        <GameRoundContext.Provider value={values}>
            {children}
        </GameRoundContext.Provider>
    )
}