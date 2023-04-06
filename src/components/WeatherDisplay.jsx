import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WeatherDisplay = (props) => {
  const { weather, zip, styles, clearData } = props
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>weather for {zip}</Text>
      <Text>{`current: ${weather.main.temp}\u00B0F`}</Text>
      <Text>{`today's low: ${weather.main.temp_min}\u00B0`}</Text>
      <Text>{`today's high: ${weather.main.temp_max}\u00B0`}</Text>
      <Text>{`humidity: ${weather.main.humidity}%`}</Text>
      <Button
        title='back'
        onPress={clearData}
      />
    </View>
  )
}

export default WeatherDisplay

const styles = StyleSheet.create({})