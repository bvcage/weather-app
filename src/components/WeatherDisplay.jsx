import React from 'react'
import { Image, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const WeatherDisplay = (props) => {
  const { navigation, weather, zip, styles, clearData } = props

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text>no weather</Text>
      </View>
    )
  }

  function makeGradient (code, ...temps) {
    let colors
    switch(Math.floor(code / 100)) {
      case 2:   // Thunderstorm
      case 3:   // Drizzle
      case 5:   // Rain
        colors = ['#1d4199', '#011752']
        break
      case 6:   // Snow
        colors = ['#d2eaf9', '#effaff', '#bee8fd']
        break
      case 8:   // Clear or Clouds
      default:
        colors = ['#87c1ff', '#8ed5ff', '#75b0fe']
        break
    }
    return colors
  }

  const colors = makeGradient(weather.weather[0].id, weather.main.temp_max, weather.main.temp_min)

  return (
    <React.Fragment>
      <LinearGradient colors={colors} style={styles.background} />
      <View style={styles.container}>
        <Image style={styles.weatherIcon} source={{url: weather.iconUrl}} />
        <Text>{weather.weather[0].main}</Text>
        <Text />
        <Text style={styles.h2}>weather for {weather.zipCode}</Text>
        <Text>{`current: ${weather.main.temp}\u00B0F`}</Text>
        <Text>{`today's low: ${weather.main.temp_min}\u00B0`}</Text>
        <Text>{`today's high: ${weather.main.temp_max}\u00B0`}</Text>
        <Text>{`humidity: ${weather.main.humidity}%`}</Text>
      </View>
    </React.Fragment>
  )
}

export default WeatherDisplay