import React, { useContext } from 'react'
import { IGameInfoEntity } from '../../@types/GameInfo.type'
import { GameInfoContext, IGameContext } from '../../context/GameInfo/GameInfo.context'
import { GameRoundContext } from '../../context/GameRound/GameRound.context'
import Chart from '../Chart/Chart'
import ChatSection from '../ChatSection/ChatSection'
import Controls from '../Controls/Controls'
import GameInfo from '../GameInfo/GameInfo'
import GradientContainer from '../GradientContainer/GradientContainer'
import Ranking from '../Ranking/Ranking'
import Registration from '../Registration/Registration'
import './GameContainer.css'

export default function GameContainer() {
  const {player1, slider}:IGameContext = useContext(GameInfoContext)
  const {selectedMultiplier} = useContext(GameRoundContext)

  const gameInfoEntities: IGameInfoEntity[] = [
    {
      icon: "🏅",
      value: !!player1.id ? player1.points : ''
    },
    {
      icon: "🙋🏻‍♂️",
      value: player1.name
    },
    {
      icon: "🧭",
      value: !!player1.id ? player1.clock : ''
    },
  ]
  
  return (
    <div className='container'>

      <div className="game">
        
        <div className="topHalf">
          <div className="topLeft">
            {
              !!player1.id ?
              <Controls/> :
              <Registration/>

            }
          </div>
          <div className="topRight">
            <div className='gameInfo'>
              {
                gameInfoEntities.map((entity: IGameInfoEntity, _: number) => {
                  return <div key={_}><GameInfo  data={entity}/></div>
                })
              }
            </div>
            <div className='gameChart'>
              <Chart chosenMultiplier={selectedMultiplier} speed={slider} />
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
