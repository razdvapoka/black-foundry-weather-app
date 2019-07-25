import { Component } from 'preact'
import CryptoJS from 'crypto-js'
import FontFaceObserver from 'fontfaceobserver'
import queryString from 'query-string'
import anime from 'animejs'

import {
  NOT_AVAILABLE,
  DAY_OF_WEEK_MAP,
  LOADING_INTERVAL,
  LOADING_STEP,
  THEMES
} from '../../consts'
import {
  XXS,
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

const getCurrentTime = () =>
  new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric'
  })

const formatTime = (timeString) =>
  timeString.replace(/ (am|pm)$/, '')

const Column = withClass(styles.col)('div')
const ColumnContent = withClass(cc(styles.colContent, 'col-content'))('div')
const ColumnCaption = withClass(styles.colCaption)(L)

const Promo = (props) => (
  <ColumnContent {...props}>
    <div className='set-in-grtsk'>
      <XXS className={styles.designedBy}>Designed by Black[Foundry]</XXS>
      <XL className={styles.setIn}>Set in Grtsk</XL>
      <S as='a' className={cc(styles.try, 'try-button')}>
        Try Font
      </S>
    </div>
  </ColumnContent>
)

const getDayPart = (sunrise, sunset) => {
  const hours = (new Date()).getHours()
  if (hours >= sunset + 1 && hours < sunrise - 1) {
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
  sunsetHours
}) => (
  <Column>
    <ColumnCaption>{`Good ${getDayPart(sunriseHours, sunsetHours)}!`}</ColumnCaption>
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

const toHours = str => parseInt(str.split(':')[0]) + (str.indexOf('pm') === -1 ? 0 : 12)

const getTheme = (weatherConditionCode, isDefault, isNight) => {
  return isNight
    ? THEMES['27']
    : (
      isDefault ||
      !THEMES[weatherConditionCode] ||
      typeof THEMES[weatherConditionCode] === 'string'
    ) ? THEMES['44']
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
    isFilterOn: false,
    isLoading: true,
    theme: null
  }

  intervalHandle = null
  animations = []
  timeElapsed = 0

  toggleFahrenheit = () => {
    this.setState(({ isFahrenheitOn }) => ({
      isFahrenheitOn: !isFahrenheitOn
    }))
  }

  startAnimation = (animation) => {
    const mainLoop = {
      targets: animation.target,
      fontVariationSettings: [
        animation.loop.start,
        animation.loop.end
      ],
      direction: 'alternate',
      loop: true,
      duration: animation.loop.duration,
      easing: animation.loop.easing
    }
    // fixes weird safari bug
    Array.from(document.querySelectorAll(animation.target)).forEach(target => {
      target.style.fontVariationSettings = animation.origin
    })
    this.animations.push(anime({
      targets: animation.target,
      fontVariationSettings: animation.loop.start,
      duration: animation.originToStart.duration,
      easing: animation.originToStart.easing,
      complete: () => {
        this.animations.push(anime(mainLoop))
      }
    }))
  }

  startAnimations = () => {
    const { theme } = this.state
    if (theme.animations) {
      this.animations.forEach(a => a.pause())
      this.animations = []
      const animationKey = window.innerWidth > 1024 ? 'D' : 'T'
      const animations = theme.animations[animationKey] || theme.animations['D']
      animations.forEach(this.startAnimation)
    }
  }

  stopAnimations = () => new Promise(resolve => {
    const { theme } = this.state
    if (this.animations.length > 0) {
      this.animations.forEach(a => a.pause())
      this.animations = []
      const animationKey = window.innerWidth > 1024 ? 'D' : 'T'
      const animations = theme.animations[animationKey] || theme.animations['D']
      animations.forEach(a => anime({
        targets: a.target,
        fontVariationSettings: a.origin,
        duration: a.loopToOrigin.duration,
        easing: a.loopToOrigin.easing,
        complete: resolve
      }))
    }
  })

  toggleFilter = () => {
    this.setState(({
      isFilterOn,
      theme
    }) => {
      if (isFilterOn) {
        this.softPauseAudio()
        this.stopAnimations()
      } else {
        this.softPlayAudio()
        this.startAnimations()
      }
      return { isFilterOn: !isFilterOn }
    })
  }

  startSloganAnimation = () => {
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
    }
  })

  render () {
    const {
      weather,
      isFilterOn,
      isFahrenheitOn,
      isLoading,
      theme,
      sunriseHours,
      sunsetHours
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
          <div className='top-line' />
          <Header
            icon={icon}
            city={weather.city}
            condition={weather.current_observation.condition.text}
            temperature={weather.current_observation.condition.temperature}
            toggleFilter={this.toggleFilter}
            toggleFahrenheit={this.toggleFahrenheit}
            isFilterOn={isFilterOn}
            isFahrenheitOn={isFahrenheitOn}
            loadWeather={this.loadWeather}
          />
          <div className={styles.slogan}>
            {title}
          </div>
          <div className={cc(styles.forecast, 'forecast')}>
            <div className={styles.row}>
              <Announcement
                description={getDescription(weather, isFahrenheitOn)}
                sunriseHours={sunriseHours}
                sunsetHours={sunsetHours}
              />
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
          <audio id='audio' src={audio} type='audio/mpeg' loop />
        </HomeBox>
      )
    }
  }

  getWeatherData = (weather, isDefault) => {
    const query = queryString.parse(document.location.search)
    const themeCode = query.theme || weather.current_observation.condition.code
    const { sunset, sunrise } = weather.current_observation.astronomy
    const hours = (new Date()).getHours()
    const sunriseHours = toHours(sunrise)
    const sunsetHours = toHours(sunset)
    const isNight = !query.theme && (hours >= sunsetHours || hours <= sunriseHours)
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
        isFilterOn: false
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
        isFilterOn: false
      })
    } else {
      const audio = document.getElementById('audio')
      if (audio && audio.src) {
        Promise.all([
          this.softPauseAudio(),
          this.stopAnimations()
        ]).then(() => {
          this.startLoadingWeather(location)
          audio.currentTime = 0
        })
      } else {
        this.startLoadingWeather(location)
      }
    }
  }

  componentDidMount () {
    this.loadWeather()
  }
}

export default Home
