import './ChatSection.css'
import React, { ChangeEvent, useState } from 'react'
import { Button, TextField } from '@mui/material'

export default function ChatSection() {
    const [chatContent, setChatContent] = useState("")

    const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
        setChatContent(e.target.value)
    }

    const handleSend = () => {
       
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
                    onChange={handleTyping}
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
