import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, SearchBar } from '@rneui/themed'

import { API_KEY } from '../../keys'


const LocSearchBar = (props) => {
  const { navigation, getWeather, styles } = props

  const [ cities, setCities ] = useState([])
  const clearCities = () => setCities([])
  const [ search, setSearch ] = useState('')
  const clearSearch = () => setSearch('')
  const updateSearch = (text) => setSearch(text)
  const [ timer, setTimer ] = useState(undefined)
  const [ selection, setSelection ] = useState({})

  useEffect(() => {
    clearTimeout(timer)
    if (search === '') clearCities()
    else {
      setTimer(setTimeout(() => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=${5}&appid=${API_KEY}`)
          .then(r=>{
            if (r.ok) r.json().then(setCities)
          })
      }, 1000))
    }
  }, [search])

  function chooseCity (city) {
    setSelection(city)
    getWeather(city).then(r=>{
      if (!!r && r.ok) {
        clearSearch()
        clearCities()
        navigation.navigate('weather')
      }
    })
  }

  return (
    <View style={styles.searchbarContainer}>
      <SearchBar
        containerStyle={styles.searchbar}
        inputContainerStyle={styles.searchbarInput}
        placeholder='city, state, country'
        round
        value={search}
        onChangeText={updateSearch}
      />
      {
        !!cities[0]
        ? cities.map(city => {
          return (
            <ListItem
              key={city.lat + city.lon}
              bottomDivider
              onPress={(e) => chooseCity(city)}
              >
                <ListItem.Content>
                  <ListItem.Title>{city.name}</ListItem.Title>
                  <ListItem.Subtitle>{city.state}, {city.country}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
          )
        })
        : null
      }
    </View>
  )
}

export default LocSearchBar