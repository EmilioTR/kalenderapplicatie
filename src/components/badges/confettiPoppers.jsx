import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function ConfettiPoppers() {
  const { width, height } = useWindowSize()
  return (
    <Confetti
      width={width}
      height={height}
      confettiSource={{x: (width-200)/2 , y: 50, w: 200, h:10}}
      gravity={0.15}
    />
  )
}