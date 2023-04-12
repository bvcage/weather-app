import React, { useEffect } from 'react'
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import ForecastMiniCard from './ForecastMiniCard'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const WeatherDisplay = (props) => {
  const { navigation, weather, forecast, zip, styles, clearData, colors, setColors, isFav, favLoc } = props

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
    switch(true) {
      case (200 <= code && code < 300):   // Thunderstorm
      case (300 <= code && code < 400):   // Drizzle
      case (500 <= code && code < 600):   // Rain
        colors = ['#1d4199', '#011752']
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
      <SafeAreaView style={styles.container}>

        {/* Location */}
        <View style={{...styles.container, flexDirection: 'row'}}>
          <MaterialIcons name="location-pin" size={32} color='#e86f4c' />
          <View>
            <Text style={styles.h2}>{forecast.city.name}</Text>
          </View>
          <MaterialCommunityIcons name={isFav ? 'star' : 'star-outline'} size={32} color='#f3c331' onPress={() => favLoc(weather.coord)} />
        </View>

        {/* Main interface */}
        <View style={styles.container}>
          <Image style={styles.weatherIcon} source={{url: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}} />
          <Text style={{padding: 0, margin: 0}}>{weather.weather[0].main}</Text>
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