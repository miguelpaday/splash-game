import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { IMessage } from "../../@types/Chat.type";
import { GameInfoContext } from "../GameInfo/GameInfo.context";
import { Socket, io } from 'socket.io-client'



export interface ISocketContext {
    messages: IMessage[],
    socket: Socket | null,
    isConnected: boolean;
}

export const SocketContext = createContext<ISocketContext>({
   messages: [],
   socket: null,
   isConnected: false
})

interface Props {
    children: ReactNode;
}

export const useSocket = (): ISocketContext => {
    return useContext(SocketContext);
};


export const SocketProvider = ({children}: Props) => {

    const [messages, setMessages] = useState<IMessage[]>([])
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false)
    

    useEffect(() => {
        const newSocket = io('http://localhost:3000/')
        setSocket(newSocket);
        setIsConnected(true)

        newSocket.emit('findAllMessages', {}, (response: IMessage[])=>{
                setMessages(response)
            })
            
        newSocket.on('message', (response: IMessage)=>{
                setMessages(prev => [...prev, response])
            })
        
            
        return () => {
            newSocket.disconnect();
            setIsConnected(false)
        };
    }, [])
    
    
    const values = {
        messages, socket, isConnected
    }

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    )
    
}

