import style from './style.styl'
import { Component } from 'preact'
import CryptoJS from 'crypto-js'
import queryString from 'query-string'
import Header from '../../components/header'
import { cc } from '../../utils'

const getIp = async () => {
  const ipResponse = await window.fetch('https://api.ipify.org?format=json')
  const { ip } = await ipResponse.json()
  return ip
}

const getLocation = async (ip) => {
  const locationResponse = await window.fetch(`https://ipapi.co/${ip}/json`)
  const { city, country } = await locationResponse.json()
  return `${city},${country}`
}

const getWeather = async () => {
  const ip = await getIp()
  const location = await getLocation(ip)

  const baseUrl = 'https://weather-ydn-yql.media.yahoo.com/forecastrss'
  const method = 'GET'
  const appId = 'fM5u8250'
  const consumerKey = 'dj0yJmk9WHFwOEQyZklNdjZJJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTgx'
  const consumerSecret = 'd6236be43a56c37db50411b3e06a27b725df52f5'
  const concat = '&'
  const query = { 'location': location, 'u': 'c', 'format': 'json' }
  const oauth = {
    'oauth_consumer_key': consumerKey,
    'oauth_nonce': Math.random().toString(36).substring(2),
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
    'oauth_version': '1.0'
  }

  const merged = {
    ...query,
    ...oauth
  }
  // Note the sorting here is required
  const mergedArr = Object.keys(merged).sort().map(k =>
    [ `${k}=${encodeURIComponent(merged[k])}` ]
  )
  const signatureBaseStr = method +
    concat + encodeURIComponent(baseUrl) +
    concat + encodeURIComponent(mergedArr.join(concat))

  const compositeKey = encodeURIComponent(consumerSecret) + concat
  const hash = CryptoJS.HmacSHA1(signatureBaseStr, compositeKey)
  const signature = hash.toString(CryptoJS.enc.Base64)

  oauth['oauth_signature'] = signature
  const authHeader = 'OAuth ' + Object.keys(oauth).map(k =>
    [ `${k}="${oauth[k]}"` ]
  ).join(',')

  const url = `${baseUrl}?${queryString.stringify(query)}`
  const weatherResponse = await window.fetch(url, {
    headers: {
      'Authorization': authHeader,
      'X-Yahoo-App-Id': appId
    },
    method: 'GET'
  })

  const weather = await weatherResponse.json()
  return weather
}

class Home extends Component {
  state = {
    weather: null,
    isFahrenheitOn: false,
    isFilterOn: false
  }

  toggleFahrenheit = () => {
    this.setState(({ isFahrenheitOn }) => ({
      isFahrenheitOn: !isFahrenheitOn
    }))
  }

  toggleFilter = () => {
    this.setState(({ isFilterOn }) => ({
      isFilterOn: !isFilterOn
    }))
  }

  render () {
    const {
      weather,
      isFilterOn,
      isFahrenheitOn
    } = this.state

    return (
      <div className={cc(style.home, 'default')}>
        {weather ? (
          <Header
            city={weather.location.city}
            condition={weather.current_observation.condition.text}
            temperature={weather.current_observation.condition.temperature}
            toggleFilter={this.toggleFilter}
            toggleFahrenheit={this.toggleFahrenheit}
            isFilterOn={isFilterOn}
            isFahrenheitOn={isFahrenheitOn}
          />
        ) : <h1>loading...</h1>}
      </div>
    )
  }

  componentDidMount () {
    getWeather().then((weather) => {
      this.setState({ weather })
    })
  }
}

export default Home
