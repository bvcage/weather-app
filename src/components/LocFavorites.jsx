import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import LocationMiniCard from './LocationMiniCard'

const LocFavorites = (props) => {
  const { navigation, favs, getWeather, styles } = props

  if (!favs[0]) return (
    <View style={styles.container}>
      <Text>no favorites yet :(</Text>
      <Text>search for a location below</Text>
    </View>
  )
  return (
    <ScrollView>
      <View style={{...styles.container, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', columnGap: 10, rowGap: 20}}>
        {favs.map(loc => {
          return (
            <LocationMiniCard key={loc.lat + loc.lon} loc={loc} getWeather={getWeather} styles={styles} navigation={navigation} />
          )
        })}
      </View>
    </ScrollView>
  )
}

export default LocFavorites