import React from 'react'
import { ImageBackground, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import WeatherDisplay from '../components/WeatherDisplay'

import { MAPS_API_KEY } from '../../keys'
import WeatherAnimation from '../components/WeatherAnimation'

const WeatherScreen = (props) => {
  const { weather, styles } = props

  function genMapSrc () {
    const latlon = Object.values(weather.coord).map(val => val.toFixed(6)).join(',')
    const zoom = 13
    const size = '400x400'
    const mapStyle = [
      [
        "feature:all",
        "element:labels.text",
        "visibility:off"
      ],
      [
        "feature:all",
        "element:labels.icon",
        "visibility:off"
      ],
    ]
    const query = new URLSearchParams({
      center: encodeURI(weather.coord.lat + ',' + weather.coord.lon),
      zoom: 13,
      size: '500x640',
      scale: 2,
      style: "feature:all|element:labels|visibility:off",
      key: encodeURI(MAPS_API_KEY),
      // signature: encodeURI(MAPS_API_SECRET)
    })
    // %7C
    return `https://maps.googleapis.com/maps/api/staticmap?` + query
  }

  if (!!MAPS_API_KEY) return (
    <ImageBackground source={{uri: genMapSrc()}} resizeMode='cover' style={styles.backgroundMap}>
      <View style={styles.wrapper}>
        <LinearGradient colors={props.colors} style={{...styles.backgroundGradient, opacity: 0.75}} />
        <WeatherAnimation code={weather.weather[0].id} {...props} />
        <WeatherDisplay {...props} styles={styles} />
      </View>
    </ImageBackground>
  )
  else return (
    <View style={styles.wrapper}>
      <LinearGradient colors={props.colors} style={styles.backgroundGradient} />
      <WeatherAnimation code={weather.weather[0].id} {...props} />
      <WeatherDisplay {...props} styles={styles} />
    </View>
  )
}

export default WeatherScreen