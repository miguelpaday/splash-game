import './GradientContainer.css'
import React from 'react'

interface Props {
    children: React.ReactNode
}

export default function GradientContainer({children}: Props) {
  return (
    <div className='gradientContainer'>
        {children}
    </div>
  )
}
