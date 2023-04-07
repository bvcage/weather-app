import { Text, View } from 'react-native'
import React from 'react'

const WeatherDisplay = (props) => {
  const { navigation, weather, zip, styles, clearData } = props

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text>no weather</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>weather for {weather.zipCode}</Text>
      <Text>{`current: ${weather.main.temp}\u00B0F`}</Text>
      <Text>{`today's low: ${weather.main.temp_min}\u00B0`}</Text>
      <Text>{`today's high: ${weather.main.temp_max}\u00B0`}</Text>
      <Text>{`humidity: ${weather.main.humidity}%`}</Text>
    </View>
  )
}

export default WeatherDisplay