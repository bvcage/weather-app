# Weather App

This is a simple weather app built using React Native. It fetches data from the OpenWeather API (free version) and displays it to the user.

## Installation

1. Obtain an API key from [OpenWeather](https://openweathermap.org/api).
2. Create a file `keys.js` in the root folder.
3. Enter 1 line into keys.js:` export const API_KEY = '[YOUR API KEY]'`
4. From terminal, start project via [Expo](https://expo.dev/):` npm start`

### Optional Google Maps Background

1. Create a [Google Cloud](https://console.cloud.google.com/) project.
2. From the API screen, enable the [Maps Static API](https://developers.google.com/maps/documentation/maps-static/overview).
3. From the Credentials screen, create new credentials / obtain API key.
4. Add line to keys.js:` export const MAPS_API_KEY = '[YOUR GOOGLE API KEY]'`