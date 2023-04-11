import { View, Text } from 'react-native'
import React from 'react'
import { Card, Image } from 'react-native-elements'

const ForecastMiniCard = (props) => {
  const { data, styles } = props
  const timestamp = new Date(data.dt * 1000)
  return (
    <Card containerStyle={styles.miniCard}>
      <View style={styles.miniContainer}>
        <Image style={styles.weatherIconMini} source={{uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}}/>
        <Text>{`${Math.round(data.main.temp)}\u00B0`}</Text>
        <Text>{timestamp.toLocaleTimeString([], {hour: '2-digit'})}</Text>
      </View>
    </Card>
  )
}

export default ForecastMiniCard