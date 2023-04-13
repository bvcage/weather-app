// react & related
import React, { useState } from 'react'
import { KeyboardAvoidingView, SafeAreaView, Text, View } from 'react-native'

// expo
import { LinearGradient } from 'expo-linear-gradient'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

// custom components
import LocFavorites from '../components/LocFavorites'
import LocSearchBar from '../components/LocSearchBar'
import { Overlay } from 'react-native-elements'
import { Button } from '@rneui/themed'

const HomeScreen = (props) => {
  const { styles } = props

  const [ infoVisible, setInfoVisible ] = useState(false)
  const showInfo = () => setInfoVisible(true)
  const hideInfo = () => setInfoVisible(false)

  return (
    <View style={styles.wrapper}>
      <LinearGradient {...props} style={styles.background} />
      <SafeAreaView style={styles.wrapper}>
        <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>

          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
            <MaterialCommunityIcons name="information-outline" size={24} color="transparent" />
            <Text style={styles.h1}>favorite cities</Text>
            <MaterialCommunityIcons name="information-outline" size={24} color="grey" style={styles.infoIcon} onPress={showInfo} />
          </View>

          <LocFavorites {...props} styles={styles} />
          <LocSearchBar {...props} styles={styles} />

          {/* information overlay panel */}
          <Overlay visible={infoVisible} onBackdropPress={hideInfo} overlayStyle={styles.infoOverlay}>
            <Text style={styles.h3}>instructions</Text>
            <Text>Use this weather app to find current and forecasted weather for worldwide locations.</Text>
            <Text>Begin by searching for a city in the search bar below.</Text>
            <Text>Favorite and unfavorite a city by clicking the star icon next to the city name.</Text>
            <Button color='#f3c331' onPress={hideInfo}>got it!</Button>
          </Overlay>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen