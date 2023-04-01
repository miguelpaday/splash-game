import './Registration.css'
import { ChangeEvent, useContext, useEffect, useState, KeyboardEvent } from 'react'
import { Button, TextField } from '@mui/material'
import Container from '../Container/Container'
import { GameInfoContext, IGameContext } from '../../context/GameInfo/GameInfo.context'

export default function Registration() {
    const {setPlayerName, startTimer}: IGameContext = useContext(GameInfoContext)
    const [_playerName, _setPlayerName] = useState("")
    

    useEffect(() => {
      let isMounted = true;
        
      return () => {
        isMounted = false;
      }
    }, [])

    const handleSubmit = () => {
        setPlayerName(_playerName)
        startTimer();
    }

    const handleEnterKey = (e: KeyboardEvent) => {
        if(e.key === 'Enter'){
            handleSubmit();
        }
    }
    

    const handlePlayerName = (e: ChangeEvent<HTMLInputElement>) => {
        _setPlayerName(e.target.value)
    }

  return (
    <Container>

    
        <div className='registrationTop'>
            <label className='registrationPrimaryText'>Welcome</label>
        </div>
        <div className='registrationBottom'>
            <label className='registrationSecondaryText'>Please insert your name</label>
            <TextField 
                inputProps={
                    {
                        style: {
                            color:'white'
                        }
                    }
                }
                className='registrationPlayerName'
                onKeyDown={handleEnterKey}
                value={_playerName}
                onChange={handlePlayerName} 
                variant="outlined"/>

            <Button 
                className='registrationAccept'
                style={ !!_playerName ? 
                    {
                        background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
                        padding: 12, 
                        marginTop: 16
                    } :
                    {
                        background: '#686868', color: 'gray'
                    }}
                    
                onClick={handleSubmit}
                disabled={!!!_playerName} 
                variant='contained'>
                    Accept
                    </Button>

        </div>
    </Container>
  )
}
