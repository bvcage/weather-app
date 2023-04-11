import React from 'react'
import { Button, Text, TextInput, View } from 'react-native'

const UserEntry = (props) => {
  const { navigation, zip, setZip, getWeatherByZip, styles, colors } = props
  return (
    <React.Fragment>
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
            getWeatherByZip()
              .then(r=>{
                if (!!r && r.ok) navigation.navigate('weather')
              })
              .catch(err => console.log(err))
          }}
        />
      </View>
    </React.Fragment>
  )
}

export default UserEntry