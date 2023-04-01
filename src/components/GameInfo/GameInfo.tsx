import './Gameinfo.css'
import React, { useEffect } from 'react'
import GradientContainer from '../GradientContainer/GradientContainer'
import { IGameInfoEntity } from '../../@types/GameInfo.type'

interface Props {
    data: IGameInfoEntity
}

export default function GameInfo({data}: Props) {
    

    useEffect(() => {
      let isMounted = true;

    
      return () => {
        isMounted = false;
      }
    }, [])
    

  return (
    <GradientContainer>
        <div className='gameInfoContent'>
            <div className='gameInfoIcon'>
                <div className="icon">
                    {data.icon}
                </div>
            </div>
            <div className='gameInfoValue'>
                {data.value}
            </div>
        </div>
       
    </GradientContainer>
  )
}
