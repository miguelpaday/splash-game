import React, { useContext } from 'react'
import { IGameInfoEntity } from '../../@types/GameInfo.type'
import { GameInfoContext, IGameContext } from '../../context/GameInfo/GameInfo.context'
import Chart from '../Chart/Chart'
import ChatSection from '../ChatSection/ChatSection'
import Controls from '../Controls/Controls'
import GameInfo from '../GameInfo/GameInfo'
import GradientContainer from '../GradientContainer/GradientContainer'
import Ranking from '../Ranking/Ranking'
import Registration from '../Registration/Registration'
import './GameContainer.css'

export default function GameContainer() {
  const {playerName}:IGameContext = useContext(GameInfoContext)

  const gameInfoEntities: IGameInfoEntity[] = [
    {
      icon: "🏅",
      value: "1,000"
    },
    {
      icon: "🙋🏻‍♂️",
      value: "Miguel"
    },
    {
      icon: "🧭",
      value: "11:30"
    },
  ]
  
  return (
    <div className='container'>

      <div className="game">
        
        <div className="topHalf">
          <div className="topLeft">
            {
              !!playerName ?
              <Controls/> :
              <Registration/>

            }
          </div>
          <div className="topRight">
            <div className='gameInfo'>
              {
                gameInfoEntities.map((entity: IGameInfoEntity) => {
                  return <div key={entity.value}><GameInfo  data={entity}/></div>
                })
              }
            </div>
            <div className='gameChart'>
              <Chart/>
            </div>
          </div>
        </div>
        <div className="bottomHalf">
          <div className="bottomLeft">
              <Ranking/>
          </div>
          <div className="bottomRight">
            <ChatSection/>
          </div>
        </div>
      </div>

    </div>
  )
}
