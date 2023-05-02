import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { Image } from '@rneui/themed'
import ForecastMiniCard from './ForecastMiniCard'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { MAPS_API_KEY, MAPS_API_SECRET } from '../../keys'

const WeatherDisplay = (props) => {
  const { navigation, weather, forecast, zip, styles, clearData, colors, setColors, isFav, favLoc } = props

  const [ map, setMap ] = useState('')

  useEffect(() => {
    setColors(makeGradient(weather.weather[0].id))
    setMap(getMapImg())
  }, [])

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text>no weather</Text>
      </View>
    )
  }

  function getMapImg () {
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
      size: '400x400',
      scale: 2,
      key: encodeURI(MAPS_API_KEY),
      // signature: encodeURI(MAPS_API_SECRET)
    })
    // %7C
    return `https://maps.googleapis.com/maps/api/staticmap?` + query
  }

  function makeGradient (code, ...temps) {
    let colors
    switch(true) {
      case (200 <= code && code < 300):   // Thunderstorm
      case (300 <= code && code < 400):   // Drizzle
      case (500 <= code && code < 600):   // Rain
        colors = ['#395080', '#3f7590', '#798f9f']
        break
      case (600 <= code && code < 700):   // Snow
        colors = ['#d2eaf9', '#effaff', '#bee8fd']
        break
      case (code === 701):                // Mist
      case (code === 711):                // Smoke
      case (code === 721):                // Haze
      case (code === 741):                // Fog
        colors = ['#bdbdbd', '#d4d4d4', '#afafae']
        break
      case (800 <= code && code < 900):   // Clear or Clouds
      default:
        colors = ['#87c1ff', '#8ed5ff', '#75b0fe']
        break
    }
    return colors
  }
  
  return (
    <React.Fragment>
      {/* <Image style={styles.background} source={{ uri: map }} /> */}
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.wrapper}>


          {/* Location */}
          <View style={{...styles.container, flexDirection: 'row'}}>
            <MaterialIcons name="location-pin" size={32} color='#e86f4c' />
            <View style={{...styles.container}}>
              <Text style={styles.h2}>{forecast.city.name}</Text>
            </View>
            <MaterialCommunityIcons name={isFav ? 'star' : 'star-outline'} size={32} color='#f3c331' onPress={() => favLoc(weather.coord)} />
          </View>

          {/* Main interface */}
          <View style={{...styles.container, flexGrow: 1, justifyContent: 'space-evenly'}}>
            <Image style={styles.weatherIcon} source={{url: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}} />
            <Text style={{...styles.h4, padding: 0, margin: 0}}>{weather.weather[0].main}</Text>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
              <MaterialCommunityIcons name="temperature-fahrenheit" size={12} color="transparent" style={{paddingTop: '10%'}} />
              <Text style={styles.currTemp}>{Math.floor(weather.main.temp)}</Text>
              <MaterialCommunityIcons name="temperature-fahrenheit" size={24} color="black" style={{paddingTop: '10%'}} />
            </View>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', minWidth: 150, width: '50%'}}>
              <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5}}>
                <MaterialCommunityIcons name="thermometer-chevron-up" size={16} color="red" style={styles.miniIcon} />
                <Text>{`${weather.main.temp_max.toFixed(1)}\u00B0`}</Text>
              </View>
              <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5}}>
                <MaterialCommunityIcons name="thermometer-chevron-down" size={16} color="blue" style={styles.miniIcon} />
                <Text>{`${weather.main.temp_min.toFixed(1)}\u00B0`}</Text>
              </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', minWidth: 150, width: '50%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <MaterialCommunityIcons name="weather-rainy" size={16} color="black" style={styles.miniIcon} />
                <Text>{`${forecast.list[0].pop}%`}</Text>
              </View>
              {/* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <MaterialCommunityIcons name="water-percent" size={16} color="black" style={styles.miniIcon} />
                <Text>{`${weather.main.humidity}%`}</Text>
              </View> */}
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <MaterialCommunityIcons name="weather-windy" size={16} color="black" style={styles.miniIcon} />
                <Text>{`${Math.round(weather.wind.speed)} mph`}</Text>
              </View>
            </View>
          </View>

          {/* Forecast Details */}
          <View>
            <Text style={styles.h4}>24-hour forecast</Text>
            <ScrollView horizontal={true}>
              {forecast.list
                .filter(item => { // only display next 24 hours
                  const dt = new Date(item.dt * 1000)
                  const diff = Math.abs(Date.now() - dt)
                  return diff < (86400 * 1000)
                })
                .map(item => {
                  return (
                    <ForecastMiniCard data={item} key={item.dt} styles={styles} />
                  )
                })
              }
            </ScrollView>
          </View>
        
        </View>
      </SafeAreaView>
    </React.Fragment>
  )
}

export default WeatherDisplay