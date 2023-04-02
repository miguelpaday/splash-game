import './Chart.css'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import Container from '../Container/Container'
import { motion } from 'framer-motion';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip } from 'recharts';
import { GameRoundContext } from '../../context/GameRound/GameRound.context';
import { GameInfoContext } from '../../context/GameInfo/GameInfo.context';


interface IChartData {
    count: number
    value: number
}

interface Props {
    chosenMultiplier: number;
    speed: number;
}

export default function Chart({chosenMultiplier = 0, speed}: Props) {

    const data:IChartData[] = [];
    for(let i = 1, last = 0.1; i <= 10; i++ ){
        last += last*0.5
        data.push({count: i, value: last})
    }
    const [config, setConfig] = useState({
        duration: 10,
        done: false
    })

    const {animationDone, setAnimationDone, hasStarted} = useContext(GameRoundContext)
    
    const width = 800;
    const height = 400;
    const xOffset = width-8
    const yOffset = height-8
    const xPiece = xOffset/10
    const yPiece = yOffset/10
    const final = Math.floor(chosenMultiplier*xPiece);

    const path = `  M 0 ${yOffset} 
                    Q 0 ${yOffset}  ${0.260*final} ${yOffset} 
                    Q ${0.843*final} ${0.938*yOffset} ${final} ${height-(chosenMultiplier*yPiece)} `;

    const motionPath = useMemo(() => ({ path, rotate: 90, align: 'self' }), [path]);
    const [countUp, setCountUp] = useState(0)

    useEffect(() => {
      let isMounted = true;
        setConfig(prev => ({...prev, duration: 10/speed}))
      return () => {
        isMounted = false;
      }
    }, [speed])

    useEffect(() => {
      let isMounted = true;
        if(!!chosenMultiplier){
            setTimeout(()=>{
                setAnimationDone(true)
            }, config.duration*1000)
        }

      return () => {
        isMounted = false;
      }
    }, [chosenMultiplier])


    useEffect(() => {
      let isMounted = true

      
      if(!chosenMultiplier){
          return;
      }
      
      let rate = ((chosenMultiplier / (config.duration)/55))
        const countInterval = setInterval(()=>{
           
            if ((countUp+rate) < chosenMultiplier) {
                setCountUp(countUp => countUp + rate);
              } else if (animationDone) {
                setCountUp(chosenMultiplier)
                clearInterval(countInterval);     
              }else{
                setCountUp(chosenMultiplier)
                clearInterval(countInterval);
              }
        }, 1000/60)
    
      return () => {
        isMounted = false
        clearInterval(countInterval)
      }
    }, [countUp, chosenMultiplier])
    
    useEffect(() => {
      if(animationDone){

          setTimeout(() => {
              setCountUp(0)
              setConfig(config => ({...config, done: false}))
            }, 10000);
        }
    }, [animationDone])
    



    
    
  return (
      <Container>
          <div className='chartContainer' >
              <div className='multiplierLabel' style={{color: hasStarted && animationDone ? "#fa5b4b" : 'white'}}>
                {countUp.toFixed(2)}x
              </div>
            <div style={{width: width, height: height}}>
                <svg width="100%" height="100%">
                    <g>

                    <motion.path
                        stroke={'#fa5b4b'}
                        strokeWidth={7}
                        strokeLinecap={'round'}
                        fill={'transparent'}
                        d={path}
                        initial={{
                            pathLength: 0
                        }}
                        animate={chosenMultiplier > 0 ? {
                            pathLength: 1
                        }: {}}
                        transition={{delay: 0.2, duration: config.duration}}
                        >
                    <motion.circle
                        cx="50"
                        cy="150"
                        r="40"
                        fill={'green'}
                        animate={motionPath}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    ></motion.circle>
                        </motion.path>
                
                        </g>
                </svg>
            </div>
            <div className='chartLine'>
                
                {
                    !!data && data.map((point: IChartData) => {
                        if(point.count === 1){
                            return <div key={point.count}><span>0</span>{point.count}</div>
                        }
                        return <div key={point.count}>{point.count}</div>
                    })
                }
                    
            </div>
        </div>
                    
         
         
      </Container>
  )
}
