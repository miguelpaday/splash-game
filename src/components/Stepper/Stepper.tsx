import './Stepper.css'
import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { flexbox, fontSize } from '@mui/system'

interface Props { 
    steps?: number;
    label: string;
    min: number;
    max: number;
    initial: number;
    decimal: boolean;
}

export default function Stepper({label, steps = 1, initial = 1, min = 1, max = 20, decimal}: Props) {

  const [value, setValue] = useState(initial)

  const handleValueChange = (operation: number) => {
      return setValue(prev => operation > 0 ? 
                                (prev + steps):
                                (prev - steps))

  }

  return (
    <div className='stepperContainer'>
        <div className="stepperLabel">
          {label}
        </div>
        <div className='stepper'>
          <Button style={{width: 10, minWidth: 40, display: 'flex', flex: 1, borderColor: "#616b824c"}}
          onClick={()=>handleValueChange(-1)} variant="outlined" className='stepperButton'>
            <div className="triangleDown"></div>
          </Button>
          <TextField 
                inputProps={
                    {
                        style: {
                            color:'white',
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            flexGrow: 0,
                            height: 13,
                            width: 60,
                            margin: 0,
                            fontSize: 24
                        }
                    }
                }
                className='registrationPlayerName'
                value={decimal ? value.toFixed(2) : value}
                
                variant="outlined"/>
          <Button style={{width: 10, minWidth: 40, display: 'flex', flex: 1, borderColor: "#616b824c"}}
          onClick={()=>handleValueChange(1)} variant="outlined" className='stepperButton'>
            <div className="triangleUp"></div>
          </Button>
        </div>
    </div>
  )
}
