import './ChatSection.css'
import React, { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { IMessage } from '../../@types/Chat.type'
import { GameInfoContext } from '../../context/GameInfo/GameInfo.context'
import { SocketContext } from '../../context/Socket/Socket.context'


export default function ChatSection() {
    const {player1} = useContext(GameInfoContext)
    const {messages, socket, isConnected} = useContext(SocketContext)
    const [chatContent, setChatContent] = useState("")

    const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
        setChatContent(e.target.value)
    }
    

    const handleSend = () => {
       const msg: IMessage = {
           name: player1.name,
           message: chatContent
       }

       socket!.emit('createMessage', msg)
       
       setChatContent('');
    }

    const handleEnterKey = (e: KeyboardEvent) => {
        if(e.key === 'Enter' && !!chatContent){
            handleSend();
        }
    }

  return (
    <div className="chatSection">
            <div className='chatHeader'>
                <div className="chatIcon">
                    💬
                </div>
                <div className="chatName">
                    Chat
                </div>
            </div>
            <div className='chat'>
                <div className="chatContainer">
                {
                    !!player1.id && !!messages && messages.map((message: IMessage, index)=>{

                    return <div key={message.message+index} className='chatMessage'>
                            <div className='chatSender'>{`${message.name}: `}</div>
                            <div className='chatContent'>{`${message.message}`}</div>
                        </div>
                    })
                }
                </div>
                <div className="chatInput">
                    <TextField 
                    inputProps={
                        {
                            style: {
                                color:'white',
                                height: 8,
                                fontSize: '0.8em'
                            },
                            
                        }
                    }
                    value={chatContent}
                    onChange={handleTyping}
                    onKeyDown={handleEnterKey}
                    className="chatField" variant='outlined'/>
                    <Button 
                        sx={
                            !!chatContent ? 
                                {background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)'} :
                                {color: 'white'}
                        }

                        style={!!chatContent ? 
                            {background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)'} :
                            {background: '#686868', color: 'gray'}}
                        onClick={handleSend}
                        className='sendButton' 
                        disabled={!!!chatContent} 
                        variant='contained'>
                            Send
                    </Button>
                </div>
            </div>
        </div>
  )
}
