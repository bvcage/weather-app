// React & related
import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Custom components
import UserEntry from './src/components/UserEntry'
import WeatherDisplay from './src/components/WeatherDisplay'

// Misc
import { API_KEY } from './keys.js'
import STYLES from './App.scss'

const ZIP_FORMAT = /^[0-9]{5}$/
const Stack = createNativeStackNavigator()


export default function App() {
  const [ zip, setZip ] = useState('')
  const [ weather, setWeather ] = useState(null)

  function clearData () {
    setWeather(null)
    setZip('')
  }

  function evalZip (input) {
    if (/^[0-9]{0,5}$/.test(input)) {
      setZip(input)
    }
  }

  async function getWeather (zipCode = zip) {
    return getLoc(zipCode)
      .then(geoloc=>{
        if (!!geoloc) {
          return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoloc.lat}&lon=${geoloc.lon}&appid=${API_KEY}&units=imperial`)
            .then(r=>{
              if (r.ok) return r.json().then(data => {
                data = {...data, ok: true, zipCode: zipCode}
                setWeather(data)
                return data
              })
              else return r.json()
            })
        } else {
          return Promise.resolve({'message': 'could not find location with provided zip code'})
        }
      })
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='home'>
          {(props) => <HomeScreen {...props} zip={zip} setZip={evalZip} getWeather={getWeather} />}
        </Stack.Screen>
        <Stack.Screen name='weather'>
          {(props) => <WeatherScreen {...props} zip={zip} weather={weather} clearData={clearData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// Navigation screens

function HomeScreen (props) {
  return (
    <View style={STYLES.wrapper}>
      <UserEntry {...props} styles={STYLES} />
    </View>
  )
}

function WeatherScreen (props) {
  return (
    <View style={STYLES.wrapper}>
      <WeatherDisplay {...props} styles={STYLES} />
    </View>
  )
}


// General functions

async function getLoc (zipCode) {
  if (ZIP_FORMAT.test(zipCode)) {
    return fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${API_KEY}`).then(r => {return r.json()})
  } else {
    return Alert.alert('invalid zip code', 'please enter a 5-digit zip code.')
  }
}