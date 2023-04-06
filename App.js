// React & React Native
import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import Config from 'react-native-config'

// Custom Components
import UserEntry from './src/components/UserEntry'
import WeatherDisplay from './src/components/WeatherDisplay'

// Misc
import { API_KEY } from './keys.js'
const ZIP_FORMAT = /^[0-9]{5}$/


export default function App() {
  const [ zip, setZip ] = useState('')
  const [ showWeather, setShowWeather ] = useState(false)
  const [ weather, setWeather ] = useState(null)

  function clearData () {
    setShowWeather(false)
    setWeather(null)
    setZip('')
  }

  function evalZip (input) {
    if (/^[0-9]{0,5}$/.test(input)) {
      setZip(input)
    }
  }

  function getWeather (props) {
    const { e, zipCode = zip } = props
    getLoc(zipCode)
      .then(geoloc=>{
        if (!!geoloc) {
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoloc.lat}&lon=${geoloc.lon}&appid=${API_KEY}&units=imperial`)
            .then(r=>{
              if (r.ok) r.json().then(weather => {
                setWeather(weather)
                setShowWeather(true)
              })
              else r.json().then(console.log)
            })
        }
      })
  }

  if (!!weather && showWeather) return <WeatherDisplay zip={zip} weather={weather} clearData={clearData} styles={styles} />
  else return <UserEntry zip={zip} setZip={evalZip} getWeather={getWeather} styles={styles} />
}

async function getLoc (zipCode) {
  if (ZIP_FORMAT.test(zipCode)) {
    return fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${API_KEY}`).then(r => {return r.json()})
  } else {
    return Alert.alert('invalid zip code', 'please enter a 5-digit zip code.')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    color: 'blue'
  },
  h2: {
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  h3: {
    fontWeight: 'bold'
  }
})