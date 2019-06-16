import styles from './style.styl'
import { Helmet } from 'react-helmet'
import { Component } from 'preact'
import CryptoJS from 'crypto-js'
import queryString from 'query-string'
import Header from '../../components/header'
import Bottom from '../../components/bottom'
import LoadingText from '../../components/loading-text'
import { DAY_OF_WEEK_MAP, LOADING_INTERVAL, LOADING_STEP } from '../../consts'
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

const Promo = (props) => (
  <ColumnContent {...props}>
    <div>
      <XXS className={styles.designedBy}>Designed by Black[Foundry]</XXS>
      <XL className={styles.setIn}>Set in Grtsk</XL>
      <S as='a' className={styles.try}>
          Try Font
      </S>
    </div>
  </ColumnContent>
)

const Announcement = () => (
  <Column>
    <ColumnCaption>Good Evening!</ColumnCaption>
    <ColumnContent>
      <M className={styles.fullText}>
        Looks like it’s sunny and a little windy in Paris&nbsp;<br />
        It will evolve to partly cloudy, with a <b>maximum temperature of 19°C&nbsp;</b><br />
        Tomorrow will be mostly cloudy, with a maximum temperature of 20°C
      </M>
    </ColumnContent>
    <Promo className={styles.desktopPromo} />
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
      {weather.forecasts.slice(1, 6).map((item, itemIndex) => (
        <ForecastItem
          key={itemIndex}
          label={itemIndex === 0 ? 'Tomorrow' : DAY_OF_WEEK_MAP[item.day]}
          value={tempToStr(item.high, isFahrenheitOn)}
        />
      ))}
    </ColumnContent>
    <ColumnContent>
      <ForecastItem
        label='Now'
        value={getCurrentTime()}
        isFirst
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
  </Column>
)

class Loading extends Component {
  render () {
    return (
      <div className={cc(styles.home, 'default')}>
        <div className={styles.loadingText}>
          <LoadingText />
        </div>
        <h1 className={styles.loading}>
          <span id='loading-1'>W</span>
          <span id='loading-2'>t</span>
          <span id='loading-3'>h</span>
          <span id='loading-4'>r</span>
        </h1>
      </div>
    )
  }

  updateWidth = (el, width, direction) => {
    const char = document.getElementById(el)
    char.style.fontVariationSettings = `'wdth' ${width}`
    this.frames[el] = window.requestAnimationFrame(() => {
      this.updateWidth(
        el,
        width + direction * LOADING_STEP,
        (width < 1000 && direction === +1) || (width < 100 && direction === -1)
          ? +1
          : -1
      )
    })
  }

  componentDidMount () {
    this.frames = {}
    this.timeouts = {}

    this.updateWidth('loading-1', 100, +1)
    this.timeouts['loading-2'] = window.setTimeout(
      () => this.updateWidth('loading-2', 100, +1),
      LOADING_INTERVAL
    )
    this.timeouts['loading-3'] = window.setTimeout(
      () => this.updateWidth('loading-3', 100, +1),
      LOADING_INTERVAL * 2
    )
    this.timeouts['loading-4'] = window.setTimeout(
      () => this.updateWidth('loading-4', 100, +1),
      LOADING_INTERVAL * 3
    )
  }

  componentWillUnmount () {
    Object.values(this.frames).forEach(window.cancelAnimationFrame)
    Object.values(this.timeouts).forEach(window.clearTimeout)
    this.frames = {}
    this.timeouts = {}
  }
}

class Home extends Component {
  static defaultProps = {
    persistWeather: false
  }

  state = {
    weather: null,
    isFahrenheitOn: false,
    isFilterOn: false,
    isLoading: true
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
      isFahrenheitOn,
      isLoading
    } = this.state

    return isLoading ? (
      <Loading />
    ) : (
      <div className={cc(styles.home, 'default')}>
        <div className='top-line' />
        <Helmet>
          <title>My Title</title>
          <link href='/assets/styles/default.css' rel='stylesheet' />
        </Helmet>
        <Header
          city={weather.location.city}
          condition={weather.current_observation.condition.text}
          temperature={weather.current_observation.condition.temperature}
          toggleFilter={this.toggleFilter}
          toggleFahrenheit={this.toggleFahrenheit}
          isFilterOn={isFilterOn}
          isFahrenheitOn={isFahrenheitOn}
        />
        <div className={styles.slogan}>
          <Gargantuan as='h1'>
            have<br />
            a nice<br />
            day
          </Gargantuan>
        </div>
        <div className={styles.forecast}>
          <div className={styles.row}>
            <Announcement />
            <Forecast
              weather={weather}
              isFahrenheitOn={isFahrenheitOn}
            />
          </div>
        </div>
        <Promo className={styles.tabletPromo} />
        <Promo className={styles.mobilePromo} />
        <div className='bottomBox'>
          <div className='bottom'>
            <Bottom id='d' className={styles.bottom} />
            <Bottom id='m' rectHeight={90} className={styles.bottomMobile} />
          </div>
        </div>
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
      this.setState({ isLoading: true })
      getWeather().then((weather) => {
        this.setState({ weather, isLoading: false })
        if (persistWeather) {
          window.localStorage.setItem('weather', JSON.stringify(weather))
        }
      })
    }
  }
}

export default Home
