import styles from './style.styl'
import { Component } from 'preact'
import CryptoJS from 'crypto-js'
import queryString from 'query-string'
import Header from '../../components/header'
import Bottom from '../../components/bottom'
import { tempToStr, cc, withClass } from '../../utils'
import {
  XXS,
  XS,
  S,
  M,
  L,
  XL,
  XXL,
  Gargantuan
} from '../../components/text'

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

const getCurrentTime = () =>
  new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric'
  })

const formatTime = (timeString) =>
  timeString.replace(/ (am|pm)$/, '')

const Column = withClass(styles.col)('div')
const ColumnContent = withClass(styles.colContent)('div')
const ColumnCaption = withClass(styles.colCaption)(L)

const Announcement = () => (
  <Column>
    <ColumnCaption>Good Evening!</ColumnCaption>
    <ColumnContent>
      <M>
        Looks like it’s sunny and a little windy in Paris
        It will evolve to partly cloudy, with a maximum temperature of 19°C
        Tomorrow will be mostly cloudy, with a maximum temperature of 20°C
      </M>
    </ColumnContent>
    <ColumnContent>
      <div>
        <XXS>Designed by Black[Foundry]</XXS>
        <XL>Set in Grtsk</XL>
        <S as='a' className={styles.try}>
          Try Font
        </S>
      </div>
    </ColumnContent>
  </Column>
)

const ForecastItem = ({
  label,
  value
}) => (
  <div className={styles.forecastItem}>
    <XS>{label}</XS>
    <XXL>{value}</XXL>
  </div>
)

const Forecast = ({
  weather,
  isFahrenheitOn
}) => (
  <Column>
    <ColumnCaption>Forecast</ColumnCaption>
    <ColumnContent>
      <ForecastItem
        label='Now'
        value={getCurrentTime()}
      />
      <ForecastItem
        label='Sunrise'
        value={formatTime(weather.current_observation.astronomy.sunrise)}
      />
      <ForecastItem
        label='Sunset'
        value={formatTime(weather.current_observation.astronomy.sunset)}
      />
      <ForecastItem
        label='Humidity'
        value={weather.current_observation.atmosphere.humidity + '%'}
      />
      <ForecastItem
        label='Wind'
        value={weather.current_observation.wind.speed + 'm/s'}
      />
    </ColumnContent>
    <ColumnContent>
      {weather.forecasts.slice(1, 6).map((item, itemIndex) => (
        <ForecastItem
          key={itemIndex}
          label={item.day}
          value={tempToStr(item.high, isFahrenheitOn)}
        />
      ))}
    </ColumnContent>
  </Column>
)

class Home extends Component {
  static defaultProps = {
    persistWeather: true
  }

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

    return weather ? (
      <div className={cc(styles.home, 'default')}>
        <div className='top-line' />
        <Header
          city={weather.location.city}
          condition={weather.current_observation.condition.text}
          temperature={weather.current_observation.condition.temperature}
          toggleFilter={this.toggleFilter}
          toggleFahrenheit={this.toggleFahrenheit}
          isFilterOn={isFilterOn}
          isFahrenheitOn={isFahrenheitOn}
        />
        <Gargantuan className={styles.slogan} as='h1'>
          have<br />
          a nice<br />
          day
        </Gargantuan>
        <div className={styles.forecast}>
          <div className={styles.row}>
            <Announcement />
            <Forecast
              weather={weather}
              isFahrenheitOn={isFahrenheitOn}
            />
          </div>
        </div>
        <div className='bottomBox'>
          <div className='bottom'>
            <Bottom />
          </div>
        </div>
      </div>
    ) : (
      <div className={cc(styles.home, 'default')}>
        <h1>loading...</h1>
      </div>
    )
  }

  componentDidMount () {
    const { persistWeather } = this.props
    if (persistWeather && window.localStorage.getItem('weather')) {
      this.setState({
        weather: JSON.parse(window.localStorage.getItem('weather'))
      })
    } else {
      getWeather().then((weather) => {
        this.setState({ weather })
        if (persistWeather) {
          window.localStorage.setItem('weather', JSON.stringify(weather))
        }
      })
    }
  }
}

export default Home
