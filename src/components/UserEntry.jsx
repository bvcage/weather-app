import { Button, Text, TextInput, View } from 'react-native'
import React from 'react'

const UserEntry = (props) => {
  const { navigation, zip, setZip, getWeather, styles } = props
  return (
    <View style={styles.container}>
      <Text style={styles.h3}>check weather for</Text>
      <TextInput
        autoComplete='postal-code'
        inputMode='numeric'
        keyboardType='number-pad'
        placeholder='enter zip code'
        returnKeyType='done'
        value={zip}
        onChangeText={input => setZip(input)}
      />
      <Button
        title='enter'
        onPress={() => {
          getWeather().then(r=>{
            if (!!r.ok) navigation.navigate('weather')
          })
        }}
      />
    </View>
  )
}

export default UserEntry