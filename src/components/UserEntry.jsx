import React from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const UserEntry = (props) => {
  const { navigation, zip, setZip, getWeather, styles, colors } = props
  return (
    <React.Fragment>
      <LinearGradient colors={colors} style={styles.background} />
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
              if (!!r && r.ok) navigation.navigate('weather')
            })
          }}
        />
      </View>
    </React.Fragment>
  )
}

export default UserEntry