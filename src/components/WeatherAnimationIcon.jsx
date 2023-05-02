import { Animated } from 'react-native'
import React, { useRef } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const WeatherAnimationIcon = (props) => {
  const { startX, endX, startY, endY, speed, size, name, delay } = props

  const posIconX = useRef(new Animated.Value(startX)).current
  const posIconY = useRef(new Animated.Value(startY)).current

  const animX = Animated.sequence([
    Animated.delay(delay),
    Animated.timing(posIconX, {
      toValue: endX,
      duration: speed * 1000,
      useNativeDriver: false,
    })
  ])

  const animY = Animated.sequence([
    Animated.delay(delay),
    Animated.loop(
      Animated.timing(posIconY, {
        toValue: endY,
        duration: speed * 1000,
        useNativeDriver: false,
      })
    )
  ])

  if (startX !== endX) animX.start()
  if (startY !== endY) animY.start()

  return (
    <Animated.View style={{position: 'absolute', top: posIconY, left: posIconX}}>
      <MaterialCommunityIcons name={name} size={size} color='rgba(255,255,255,0.25)' />
    </Animated.View>
  )
}

export default WeatherAnimationIcon