// React & related
import React, { useState } from 'react'
import { Alert, SafeAreaView, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Custom components
import WeatherDisplay from './src/components/WeatherDisplay'

// Misc
import { API_KEY } from './keys.js'
import STYLES from './App.scss'
import { LinearGradient } from 'expo-linear-gradient'
import LocSearchBar from './src/components/LocSearchBar'
import LocFavorites from './src/components/LocFavorites'

const ZIP_FORMAT = /^[0-9]{5}$/
const Stack = createNativeStackNavigator()


export default function App() {
  const [ zip, setZip ] = useState('')
  const [ weather, setWeather ] = useState(null)
  const [ forecast, setForecast ] = useState(null)
  const [ colors, setColors ] = useState(['#87c1ff', '#8ed5ff', '#75b0fe'])
  const [ favs, setFavs ] = useState([])
  const favLoc = (loc) => setFavs([...favs, loc])

  function clearData () {
    setWeather(null)
    setZip('')
  }

  function evalZip (input) {
    if (/^[0-9]{0,5}$/.test(input)) {
      setZip(input)
    }
  }

  function isLocInFavs (input) {
    let result = -1
    if (!!favs[0]) {
      result = favs.findIndex(item => item.lat.toFixed(4) === input.lat.toFixed(4) && item.lon.toFixed(4) === input.lon.toFixed(4))
    }
    return result > -1
  }

  function toggleFav (input) {
    const existing = isLocInFavs(input)
    if (existing) {
      const list = favs.filter(item => item.lat.toFixed(4) !== input.lat.toFixed(4) && item.lon.toFixed(4) !== input.lon.toFixed(4))
      setFavs(list)
    } else {
      favLoc(input)
    }
  }

  async function getWeather (geoloc) {
    if (!!geoloc && !!geoloc.lat) {
      return getForecast(geoloc, setForecast)
        .then(r => {
          return getCurrWeather(geoloc, setWeather)
        })
    } else if (!!geoloc && !!geoloc.message) {
      return Alert.alert('invalid zip code', 'zip code does not exist.')
    }
  }

  async function getWeatherByZip (zipCode = zip) {
    return getLoc(zipCode)
      .then(geoloc => getWeather(geoloc))
  }

  return (
    <React.Fragment>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='home' options={{headerShown: false}}>
            {(props) => <HomeScreen
                          {...props}
                          zip={zip}
                          setZip={evalZip}
                          getWeather={getWeather}
                          getWeatherByZip={getWeatherByZip}
                          colors={colors}
                          favs={favs}
                          setFavs={setFavs}
                        />}
          </Stack.Screen>
          <Stack.Screen name='weather' options={{title: '', headerStyle: {backgroundColor: colors[0]}, headerShadowVisible: false, headerTintColor: 'grey'}}>
            {(props) => <WeatherScreen
                          {...props}
                          zip={zip}
                          weather={weather}
                          forecast={forecast}
                          clearData={clearData}
                          colors={colors}
                          setColors={setColors}
                          isFav={isLocInFavs(weather.coord)}
                          favLoc={toggleFav}
                        />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  )
}

// Navigation screens

function HomeScreen (props) {
  return (
    <View style={STYLES.wrapper}>
      <LinearGradient {...props} style={STYLES.background} />
      <SafeAreaView style={STYLES.wrapper}>
        <LocSearchBar {...props} styles={STYLES} />
        <LocFavorites {...props} styles={STYLES} />
      </SafeAreaView>
    </View>
  )
}

function WeatherScreen (props) {
  return (
    <View style={STYLES.wrapper}>
      <LinearGradient colors={props.colors} style={STYLES.background} />
      <WeatherDisplay {...props} styles={STYLES} />
    </View>
  )
}


// General functions

async function getLoc (zipCode) {
  if (ZIP_FORMAT.test(zipCode)) {
    return fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${API_KEY}`).then(r=>{ return r.json() })
  } else {
    return Alert.alert('invalid zip code', 'zip code must be 5 digits.')
  }
}

async function getCurrWeather (geoloc, setWeather) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoloc.lat}&lon=${geoloc.lon}&appid=${API_KEY}&units=Imperial`)
    .then(r=>{
      if (!!r && r.ok) return r.json().then(data => {
        setWeather(data)
        return {...data, ok: true}
      })
      else return {...r.json(), ok: false}
    })
}

async function getForecast (geoloc, setForecast) {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geoloc.lat}&lon=${geoloc.lon}&appid=${API_KEY}&units=Imperial`)
    .then(r=>{
      if (!!r && r.ok) return r.json().then(data => {
        setForecast(data)
        return {...data, ok: true}
      })
      else return {...r.json(), ok: false}
    })
}