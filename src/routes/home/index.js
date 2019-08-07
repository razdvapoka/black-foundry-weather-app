import { Component } from 'preact'
import CryptoJS from 'crypto-js'
import FontFaceObserver from 'fontfaceobserver'
import queryString from 'query-string'

import {
  DAY_OF_WEEK_MAP,
  DEFAULT_THEME_CODE,
  LOADING_INTERVAL,
  LOADING_STEP,
  NIGHT_THEME_CODES,
  NOT_AVAILABLE,
  THEMES
} from '../../consts'
import {
  XS,
  S,
  M,
  L,
  XL,
  XXL
} from '../../components/text'
import {
  tempToStr,
  cc,
  withClass,
  easeInOutQuad
} from '../../utils'
import Bottom from '../../components/bottom'
import CookiesPopup from '../../components/cookies-popup'
import Header from '../../components/header'
import LoadingText from '../../components/loading-text'
import styles from './style.styl'

const loadVariableFont = () => {
  const variableFontsSupported = window.CSS.supports('font-variation-settings', 'normal')
  const font = new FontFaceObserver('GrtskVariable')
  return variableFontsSupported ? font.load() : Promise.resolve()
}

const FPS = 60
const SOFT_PLAY_DURATION = 1
const SOFT_PLAY_ITERATIONS = FPS * SOFT_PLAY_DURATION
const SOFT_PLAY_START = 0
const SOFT_PLAY_END = 1
const SOFT_PLAY_DISTANCE = SOFT_PLAY_END - SOFT_PLAY_START
const SOFT_PLAY_TIME_STEP = SOFT_PLAY_DURATION / SOFT_PLAY_ITERATIONS

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

const getWeatherByLocation = async (location) => {
  const baseUrl = 'https://weather-ydn-yql.media.yahoo.com/forecastrss'
  const method = 'GET'
  const appId = 'fM5u8250'
  const consumerKey = 'dj0yJmk9WHFwOEQyZklNdjZJJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTgx'
  const consumerSecret = 'd6236be43a56c37db50411b3e06a27b725df52f5'
  const concat = '&'
  const query = {
    'location': location,
    'u': 'c',
    'format': 'json'
  }
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

const getWeather = async (givenLocation) => {
  const ip = await getIp()
  const location = await (givenLocation || getLocation(ip))
  const weather = await getWeatherByLocation(location)
  const isDefault = (
    !weather.location.city ||
    !weather.current_observation ||
    !weather.current_observation.condition ||
    weather.current_observation.condition.code == null ||
    weather.current_observation.condition.code === NOT_AVAILABLE
  )
  if (isDefault) {
    const defaultWeather = await getWeatherByLocation('Paris, France')
    return {
      weather: {
        ...defaultWeather,
        city: 'Paris'
      },
      isDefault: true
    }
  } else {
    return {
      weather: {
        ...weather,
        city: location.split(',')[0]
      }
    }
  }
}

const getCurrentTime = () => {
  const timeString = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric'
  })
  return timeString.replace(':', `<span class='blinking'>:</span>`)
}

const formatTime = (timeString) => {
  const isPm = timeString.indexOf('pm') !== -1
  const [ hours, minutes ] = timeString.replace(/ (am|pm)/, '').split(':')
  return `${isPm ? parseInt(hours) + 12 : hours}:${minutes}`
}

const Column = withClass(styles.col)('div')
const ColumnContent = withClass(cc(styles.colContent, 'col-content'))('div')
const ColumnCaption = withClass(styles.colCaption)(L)

const Promo = (props) => (
  <ColumnContent {...props}>
    <div className='set-in-grtsk'>
      <XL className={styles.designedBy}>
        <span className={styles.designedByGrtsk}>Grtsk</span>{' '}
        <span className={styles.designedByBF}>by Black[Foundry]</span>
      </XL>
      <S
        as='a'
        href='https://black-foundry.com/fonts/grtsk'
        target='_blank'
        rel='noopener noreferrer'
        className={cc(styles.try, 'try-button')}
      >
        Try Font
      </S>
    </div>
  </ColumnContent>
)

const getDayPart = (sunrise, sunset, isNight) => {
  const hours = (new Date()).getHours()
  if (isNight) {
    return 'night'
  } else if (hours >= sunrise - 1 && hours < sunrise + 1) {
    return 'morining'
  } else if (hours >= sunrise + 1 && hours < sunset - 1) {
    return 'day'
  } else {
    return 'evening'
  }
}

const Announcement = ({
  description,
  sunriseHours,
  sunsetHours,
  isNight
}) => (
  <Column>
    <ColumnCaption>{`Good ${getDayPart(sunriseHours, sunsetHours, isNight)}!`}</ColumnCaption>
    <ColumnContent>
      <M className={styles.fullText}>
        {description.map((line, lineIndex) => (
          <p
            key={lineIndex}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </M>
    </ColumnContent>
    <Promo className={styles.desktopPromo} />
  </Column>
)

const ForecastItem = ({
  label,
  value,
  className
}) => (
  <div className={cc(styles.forecastItem, className)}>
    <XS>{label}</XS>
    <XXL dangerouslySetInnerHTML={{ __html: value }} />
  </div>
)

const Forecast = ({
  weather,
  isFahrenheitOn,
  currentTime
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
        label='Time'
        value={currentTime}
        className={styles.forecastItemTime}
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

const toHours = str => parseInt(str.split(':')[0]) + (str.indexOf('pm') === -1 ? 0 : 12)

const getTheme = (weatherConditionCode, isDefault, isNight) => {
  return isNight
    ? THEMES[NIGHT_THEME_CODES[0]]
    : (
      isDefault ||
      !THEMES[weatherConditionCode] ||
      typeof THEMES[weatherConditionCode] === 'string'
    ) ? THEMES[DEFAULT_THEME_CODE]
      : THEMES[weatherConditionCode]
}

const getDescription = (weather, isFahrenheitOn) => {
  const city = weather.city
  const text = weather.current_observation.condition.text.toLowerCase()
  const currentCode = weather.current_observation.condition.code
  const todayText = weather.forecasts[0].text.toLowerCase()
  const todayHigh = tempToStr(weather.forecasts[0].high, isFahrenheitOn)
  const todayCode = weather.forecasts[0].code
  const tomorrowText = weather.forecasts[1].text.toLowerCase()
  const tomorrowHigh = tempToStr(weather.forecasts[1].high, isFahrenheitOn)
  return [
    `Looks like it’s ${text} in ${city}`,
    `It will ${currentCode === todayCode ? 'stay' : 'evolve to'} ${todayText}, with a <b>maximum temperature of ${todayHigh}</b>`,
    `Tomorrow will be ${tomorrowText}, with a maximum temperature of ${tomorrowHigh}`
  ]
}

const HomeBox = withClass(styles.home)('div')

const BottomSection = () => (
  <div className='bottomBox'>
    <div className='bottom'>
      <Bottom id='d' className={styles.bottom} />
      <Bottom id='m' rectHeight={90} className={styles.bottomMobile} />
    </div>
  </div>
)

const Credits = () => (
  <XS as='div' className={styles.credits}>
    <span className={styles.creditsTitle}>©wthr.live</span>
    <span>
      Design:{' '}
      <a
        href='https://ilyanaumoff.com'
        target='_blank'
        rel='noopener noreferrer'
      >
        Ilya Naumoff
      </a>
    </span>
    <span>
      Development:{' '}
      <a
        href='https://sergeyzakharov.dev'
        target='_blank'
        rel='noopener noreferrer'
      >
        Sergey Zakharov
      </a>{' '}
      and{' '}
      <a
        href='https://black-foundry.com'
        target='_blank'
        rel='noopener noreferrer'
      >
        Black[Foundry]
      </a>{' '}
    </span>
    <span>Sound: Francois Vey</span>
  </XS>
)

class Loading extends Component {
  render () {
    return (
      <HomeBox className='loading'>
        <div className='top-line' />
        <div className='loading-content'>
          <h1 className={styles.loading}>
            <span id='loading-1'>W</span>
            <span id='loading-2'>t</span>
            <span id='loading-3'>h</span>
            <span id='loading-4'>r</span>
          </h1>
          <div className={styles.loadingText}>
            <LoadingText />
          </div>
        </div>
        <div className='bottomBox'>
          <div className='bottom'>
            <Bottom id='d' className={styles.bottom} />
            <Bottom id='m' rectHeight={90} className={styles.bottomMobile} />
          </div>
        </div>
      </HomeBox>
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

    const l1 = document.getElementById('loading-1')
    const l2 = document.getElementById('loading-2')
    const l3 = document.getElementById('loading-3')
    const l4 = document.getElementById('loading-4')

    l1.style.fontVariationSettings = `'wdth' 100`
    l2.style.fontVariationSettings = `'wdth' 100`
    l3.style.fontVariationSettings = `'wdth' 100`
    l4.style.fontVariationSettings = `'wdth' 100`

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
    if (this.animation) {
      this.animation.pause()
    }
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
    isMusicOn: false,
    isLoading: true,
    isCookiesPopupOpen: false,
    theme: null,
    currentTime: null
  }

  intervalHandle = null
  timeElapsed = 0

  closeCookiesPopup = () => {
    window.localStorage.setItem('areCookiesOk', true)
    this.setState({ isCookiesPopupOpen: false })
  }

  toggleFahrenheit = () => {
    this.setState(({ isFahrenheitOn }) => ({
      isFahrenheitOn: !isFahrenheitOn
    }))
  }

  toggleMusic = () => {
    this.setState(({
      isMusicOn,
      theme
    }) => {
      if (isMusicOn) {
        this.softPauseAudio()
      } else {
        this.softPlayAudio()
      }
      return { isMusicOn: !isMusicOn }
    })
  }

  softPlayAudioStep = (
    start,
    end,
    distance,
    duration,
    stopCallback
  ) => {
    this.timeElapsed += SOFT_PLAY_TIME_STEP
    const direction = end - start >= 0 ? 1 : -1
    const volume = easeInOutQuad(
      this.timeElapsed,
      start,
      direction * distance,
      duration
    )
    const audio = document.getElementById('audio')
    if (direction > 0 ? volume >= end : volume <= end) {
      window.clearInterval(this.intervalHandle)
      audio.volume = end
      stopCallback && stopCallback()
    } else {
      audio.volume = volume
    }
  }

  softPlayAudio = () => new Promise((resolve) => {
    this.timeElapsed = 0
    window.clearInterval(this.intervalHandle)
    const audio = document.getElementById('audio')
    audio.volume = 0
    audio.play()
    this.intervalHandle = window.setInterval(
      () => this.softPlayAudioStep(
        SOFT_PLAY_START,
        SOFT_PLAY_END,
        SOFT_PLAY_DISTANCE,
        SOFT_PLAY_DURATION,
        resolve
      ),
      1000 / FPS
    )
  })

  softPauseAudio = () => new Promise((resolve) => {
    this.timeElapsed = 0
    window.clearInterval(this.intervalHandle)
    const audio = document.getElementById('audio')
    if (audio && audio.src) {
      this.intervalHandle = window.setInterval(
        () => this.softPlayAudioStep(
          audio.volume,
          SOFT_PLAY_START,
          SOFT_PLAY_DISTANCE,
          SOFT_PLAY_DURATION,
          () => {
            audio.pause()
            resolve()
          }
        ),
        1000 / FPS
      )
    } else {
      resolve()
    }
  })

  render () {
    const {
      weather,
      isMusicOn,
      isFahrenheitOn,
      isLoading,
      theme,
      sunriseHours,
      sunsetHours,
      isCookiesPopupOpen,
      isNight,
      currentTime
    } = this.state

    if (isLoading) {
      return <Loading />
    } else {
      const {
        className,
        title,
        icon,
        audio
      } = theme
      return (
        <HomeBox className={className}>
          {isCookiesPopupOpen && <CookiesPopup close={this.closeCookiesPopup} />}
          <div className='top-line' />
          <Header
            icon={icon}
            city={weather.city}
            condition={weather.current_observation.condition.text}
            temperature={weather.current_observation.condition.temperature}
            toggleMusic={this.toggleMusic}
            toggleFahrenheit={this.toggleFahrenheit}
            isMusicOn={isMusicOn}
            isFahrenheitOn={isFahrenheitOn}
            loadWeather={this.loadWeather}
          />
          <div className={cc(styles.slogan, 'slogan')}>
            {title}
          </div>
          <div className={cc(styles.forecast, 'forecast')}>
            <div className={styles.row}>
              <Announcement
                description={getDescription(weather, isFahrenheitOn)}
                sunriseHours={sunriseHours}
                sunsetHours={sunsetHours}
                isNight={isNight}
              />
              <Forecast
                weather={weather}
                isFahrenheitOn={isFahrenheitOn}
                currentTime={currentTime}
              />
            </div>
          </div>
          <Promo className={styles.tabletPromo} />
          <Promo className={styles.mobilePromo} />
          <Credits />
          <BottomSection />
          <audio id='audio' src={audio} type='audio/mpeg' loop />
        </HomeBox>
      )
    }
  }

  isNightTheme = (code) => NIGHT_THEME_CODES.indexOf(code) !== -1
  isNightHour = (hour) => hour >= 0 && hour < 6

  getWeatherData = (weather, isDefault) => {
    const query = queryString.parse(document.location.search)
    const themeCode = query.theme || weather.current_observation.condition.code
    const { sunset, sunrise } = weather.current_observation.astronomy
    const pubDate = weather.current_observation.pubDate
    const timezoneId = weather.location.timezone_id
    const date = new Date(pubDate * 1000)
    const nativeDate = new Date(date.toLocaleString(undefined, { timeZone: timezoneId }))
    const hours = nativeDate.getHours()
    const sunriseHours = toHours(sunrise)
    const sunsetHours = toHours(sunset)
    const isNight =
      this.isNightTheme(query.theme) || (!query.theme && (
        this.isNightHour(hours) ||
        this.isNightTheme(`${themeCode}`)
      ))
    const theme = getTheme(themeCode, isDefault, isNight)
    return {
      theme,
      sunriseHours,
      sunsetHours,
      isNight
    }
  }

  startLoadingWeather = (location) => {
    const { persistWeather } = this.props
    this.setState({ isLoading: true })
    return Promise.all([
      getWeather(location),
      loadVariableFont()
    ]).then(([ { weather, isDefault } ]) => {
      this.setState({
        weather,
        ...this.getWeatherData(weather, isDefault),
        isLoading: false,
        isMusicOn: false
      })
      if (persistWeather) {
        window.localStorage
          .setItem(
            'weather',
            JSON.stringify({
              ...weather,
              isDefault
            })
          )
      }
    })
  }

  loadWeather = (location) => {
    const { persistWeather } = this.props
    if (persistWeather && window.localStorage.getItem('weather')) {
      const weather = JSON.parse(window.localStorage.getItem('weather'))
      this.setState({
        weather,
        ...this.getWeatherData(weather, weather.isDefault),
        isLoading: false,
        isMusicOn: false
      })
    } else {
      this.softPauseAudio().then(() => {
        this.startLoadingWeather(location)
        const audio = document.getElementById('audio')
        if (audio) {
          audio.currentTime = 0
        }
      })
    }
  }

  updateCurrentTime = () => {
    this.setState({
      currentTime: getCurrentTime()
    })
  }

  componentDidMount () {
    this.updateCurrentTime()
    setInterval(this.updateCurrentTime, 60000)
    this.loadWeather()
    this.setState({
      isCookiesPopupOpen: !window.localStorage.getItem('areCookiesOk')
    })
  }
}

export default Home
