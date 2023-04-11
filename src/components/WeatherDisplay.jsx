import React, { useEffect } from 'react'
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import ForecastMiniCard from './ForecastMiniCard'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const WeatherDisplay = (props) => {
  const { navigation, weather, forecast, zip, styles, clearData, colors, setColors } = props

  useEffect(() => {
    setColors(makeGradient(weather.weather[0].id))
  }, [])

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
  
  return (
    <React.Fragment>
      <LinearGradient colors={colors} style={styles.background} />
      <SafeAreaView style={styles.container}>

        {/* Location */}
        <View style={{...styles.container, flexDirection: 'row'}}>
          <MaterialIcons name="location-pin" size={24} color="black" />
          <Text style={styles.h2}>{forecast.city.name}</Text>
        </View>

        {/* Main interface */}
        <View style={styles.container}>
          <Image style={styles.weatherIcon} source={{url: weather.iconUrl}} />
          <Text>{weather.weather[0].description}</Text>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
            <Text style={styles.currTemp}>{Math.floor(weather.main.temp)}</Text>
            <MaterialCommunityIcons name="temperature-fahrenheit" size={24} color="black" style={{paddingTop: '10%'}} />
          </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', minWidth: 150, width: '50%'}}>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5}}>
              <MaterialCommunityIcons name="thermometer-chevron-up" size={16} color="black" style={styles.miniIcon} />
              <Text>{`${weather.main.temp_max.toFixed(1)}\u00B0`}</Text>
            </View>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5}}>
              <MaterialCommunityIcons name="thermometer-chevron-down" size={16} color="black" style={styles.miniIcon} />
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
              <Text>{`${Math.round(weather.wind.speed)} mi/hr`}</Text>
            </View>
          </View>
        </View>

        {/* Additional Details */}
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
        

      </SafeAreaView>
    </React.Fragment>
  )
}

export default WeatherDisplay