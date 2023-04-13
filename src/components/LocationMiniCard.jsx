import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Card, Image } from '@rneui/themed'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { API_KEY } from '../../keys'

const LocationMiniCard = (props) => {
  const { loc, styles, getWeather, navigation } = props
  const [ forecast, setForecast ] = useState({})
  const [ weather, setWeather ] = useState({})

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${loc.lat}&lon=${loc.lon}&appid=${API_KEY}&units=Imperial`)
      .then(r=>{
        if (!!r && r.ok) r.json().then(setForecast)
      })
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${API_KEY}&units=Imperial`)
      .then(r=>{
        if (!!r && r.ok) r.json().then(setWeather)
      })
  }, [loc])

  function handleSelect () {
    getWeather(loc).then(() => navigation.navigate('weather'))
  }

  if (!weather || !weather.weather || !forecast || !forecast.list) return <></>
  return (
    <Card containerStyle={{margin: 0}}>
      <TouchableOpacity onPress={handleSelect}>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Image style={styles.weatherIconMini} source={{uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}}/>
          <Text style={styles.h4}>{forecast.city.name}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
          <Text style={styles.currTempMini}>{`${Math.floor(weather.main.temp)}\u00B0`}</Text>
          <View>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons name="weather-rainy" size={16} color="black" style={styles.miniIcon} />
              <Text>{`${Math.round(forecast.list[0].pop)} %`}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons name="weather-windy" size={16} color="black" style={styles.miniIcon} />
              <Text>{`${Math.round(weather.wind.speed)} mph`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  )
}

export default LocationMiniCard