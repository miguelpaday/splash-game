import './Gameinfo.css'
import React from 'react'
import GradientContainer from '../GradientContainer/GradientContainer'
import { IGameInfoEntity } from '../../@types/GameInfo.type'

interface Props {
    data: IGameInfoEntity
}

export default function GameInfo({data}: Props) {
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
