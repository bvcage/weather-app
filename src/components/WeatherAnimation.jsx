import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import WeatherAnimationIcon from './WeatherAnimationIcon'

const WeatherAnimation = (props) => {
  const { code, weather } = props

  const icons = []
  let numIcons = 0
  switch (true) {
    case (500 <= code && code < 600):   // rain
      numIcons = Math.ceil((Math.random() * 100) + 20)
      for (let i=0; i < numIcons; ++i) {
        const props= {}
        props.name = 'water'
        props.start = 'top'
        props.speed = Math.ceil(Math.random() * 3) + 5
        props.size = Math.ceil(Math.random() * 30) + 10
        props.startX = props.endX = Math.round(Math.random() * Dimensions.get('window').width)
        props.startY = -50
        props.endY = Dimensions.get('window').height + 50
        props.delay = Math.random() * 20000
        icons.push(props)
      }
      break
    case (801 <= code && code < 810):   // clouds
      numIcons = Math.ceil((Math.random() * 5) + 5)
      for (let i=0; i < numIcons; ++i) {
        const props = {}
        props.name = 'cloud'
        props.size = Math.ceil(Math.random() * 20 + 10) * 10
        props.speed = Math.ceil(Math.random() * (props.size / 8)) + 25
        const leftX = 0 - props.size
        const rightX = Dimensions.get('window').width
        const side = Math.round(Math.random()) ? 'left' : 'right'
        props.startX = (side === 'left' ? leftX : rightX)
        props.endX = (side === 'left' ? rightX : leftX)
        props.startY = props.endY = Math.round(Math.random() * (Dimensions.get('window').height - props.size - 150))
        props.delay = Math.random() * 1000
        icons.push(props)
      }
      break
    default:
      console.log('default')
  }


  return (
    <View style={styles.background}>
      {icons.map((props, idx) => <WeatherAnimationIcon key={idx} {...props} />)}
    </View>
  )
}

export default WeatherAnimation

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
  }
})