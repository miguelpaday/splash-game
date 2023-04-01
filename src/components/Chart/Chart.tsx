import './Chart.css'
import React, { useEffect, useMemo, useState } from 'react'
import Container from '../Container/Container'
import { motion } from 'framer-motion';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip } from 'recharts';


interface IChartData {
    count: number
    value: number
}

export default function Chart() {

    const data:IChartData[] = [];
    for(let i = 1, last = 0.1; i <= 10; i++ ){
        last += last*0.5
        data.push({count: i, value: last})
    }
    const multiplier = 0
    const width = 800;
    const height = 400;
    const duration = 10;
    const xOffset = width-8
    const yOffset = height-8
    const xPiece = xOffset/10
    const yPiece = yOffset/10
    const final = Math.floor(multiplier*xPiece);

    const path = `  M 0 ${yOffset} 
                    Q 0 ${yOffset}  ${0.260*final} ${yOffset} 
                    Q ${0.843*final} ${0.938*yOffset} ${final} ${height-(multiplier*yPiece)} `;

    const motionPath = useMemo(() => ({ path, rotate: 90, align: 'self' }), [path]);
  return (
      <Container>
          <div className='chartContainer' >
              <div className='multiplierLabel'>
                {multiplier.toFixed(2)}x
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
                        animate={{
                            pathLength: 1
                        }}
                        transition={{delay: 0.2, duration: duration}}
                            
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
                            return <div><span>0</span>{point.count}</div>
                        }
                        return <div>{point.count}</div>
                    })
                }
                    
            </div>
        </div>
                    
         
         
      </Container>
  )
}
