/* eslint no-irregular-whitespace: 0 */
import { Gargantuan } from './components/text'
import Sun from './components/icons/sun'
import NotDef from './components/icons/NotDef'
import Cloudy from './components/icons/Cloudy'
import Snow from './components/icons/Snow'
import BlowingSnow from './components/icons/BlowingSnow'
import PartlyCloudy from './components/icons/PartlyCloudy'
import Rain from './components/icons/Rain'
import Night from './components/icons/Night'
import Windy from './components/icons/Wind'
import Mixed from './components/icons/MixedRainSnow'
import Drizzle from './components/icons/Drizzle'
import Storms from './components/icons/Thunderstorms'
import Tornado from './components/icons/Tornado'
import Haze from './components/icons/Haze'
import Foggy from './components/icons/Foggy'
import Dust from './components/icons/Dust'
import Cold from './components/icons/Cold'
import Bottom from './components/bottom'
import fairDayAudio from './assets/audio/fair-day.mp3'
import cloudyAudio from './assets/audio/cloudy.mp3'
import rainAudio from './assets/audio/rain.mp3'
import stormAudio from './assets/audio/storm.mp3'
import nightAudio from './assets/audio/night.mp3'
import hazeAudio from './assets/audio/haze.mp3'
import windAudio from './assets/audio/wind.mp3'
import drizzleAudio from './assets/audio/drizzle.mp3'
import tornadoAudio from './assets/audio/tornado.mp3'
import snowAudio from './assets/audio/snow.mp3'
import blowingSnowAudio from './assets/audio/blowing-snow.mp3'
import mixedAudio from './assets/audio/mixed.mp3'

import {
  DUST_ANIMATIONS,
  SLEET_ANIMATIONS,
  FOGGY_ANIMATIONS,
  SMOKY_ANIMATIONS,
  WINDY_ANIMATIONS,
  NIGHT_ANIMATIONS,
  HAIL_ANIMATIONS,
  HAZE_ANIMATIONS,
  SNOW_ANIMATIONS,
  DRIZZLE_ANIMATIONS,
  CLOUDY_ANIMATIONS,
  STORM_ANIMATIONS,
  RAIN_ANIMATIONS,
  COLD_ANIMATIONS,
  DEFAULT_ANIMATIONS,
  SUNNY_ANIMATIONS,
  PARTLY_CLOUDY_ANIMATIONS
} from './animations'

export const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const DAY_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export const DAY_OF_WEEK_MAP = {
  'Mon': 'Monday',
  'Tue': 'Tuesday',
  'Wed': 'Wednesday',
  'Thu': 'Thursday',
  'Fri': 'Friday',
  'Sat': 'Saturday',
  'Sun': 'Sunday'
}

export const LOADING_STEP = 10
export const LOADING_INTERVAL = 100

export const NOT_AVAILABLE = 44

const SUNNY = {
  className: 'sunny',
  icon: Sun,
  audio: fairDayAudio,
  animations: SUNNY_ANIMATIONS,
  title: (
    <Gargantuan as='h1'>
      Brighten<br />
      <span className='sunny-up'>Up</span>
    </Gargantuan>
  )
}

const DEFAULT = {
  className: 'default',
  icon: NotDef,
  audio: fairDayAudio,
  title: (
    <Gargantuan as='h1'>
      have<br />
      a nice<br />
      day
    </Gargantuan>
  ),
  animations: DEFAULT_ANIMATIONS
}

const CLOUDY = {
  className: 'cloudy',
  icon: Cloudy,
  audio: cloudyAudio,
  animations: CLOUDY_ANIMATIONS,
  title: (
    <Gargantuan as='h1'>
      He<span className='cloudy-grow'>a</span>d
      i<span className='cloudy-wide'>n</span> th<span className='cloudy-grow'>e</span><br />
      <span className='cloudy-wider'>C</span>l<span className='cloudy-grow'>o</span>u<span className='cloudy-wider'>d</span><span className='cloudy-grow'>s</span>
    </Gargantuan>
  )
}

const SNOW = {
  className: 'snow',
  icon: Snow,
  audio: snowAudio,
  animations: SNOW_ANIMATIONS,
  title: (
    <Gargantuan as='h1'>
      <span className='ll'>L</span><span className='et'>ET</span> <span className='i'>I</span><span className='tt'>T</span><br />
      <span className='sn'><span className='ss'>S</span>N</span><span className='o'>O</span><span className='sn'><span className='w'>W</span></span>
    </Gargantuan>
  )
}

const BLOWING_SNOW = {
  ...SNOW,
  audio: blowingSnowAudio,
  icon: BlowingSnow
}

const PARTLY_CLOUDY = {
  className: 'partly-cloudy',
  icon: PartlyCloudy,
  animations: PARTLY_CLOUDY_ANIMATIONS,
  audio: cloudyAudio,
  title: (
    <Gargantuan as='h1'>
      On<br />
      &nbsp;Cloud<br />
      &nbsp;&nbsp;Nine
    </Gargantuan>
  )
}

const RAIN = {
  className: 'rain',
  icon: Rain,
  audio: rainAudio,
  animations: RAIN_ANIMATIONS,
  title: (
    <Gargantuan as='h1'>
      Right<br />
      <span className='rain-a'>a</span>s rai<span className='rain-a'>n</span>
    </Gargantuan>
  )
}

const COLD = {
  className: 'cold',
  icon: Cold,
  audio: rainAudio,
  animations: COLD_ANIMATIONS,
  title: (
    <Gargantuan as='h1'>
      Cold<br />
      Turkey
    </Gargantuan>
  )
}

const HAIL = {
  className: 'hail',
  icon: Rain,
  animations: HAIL_ANIMATIONS,
  title: (
    <Gargantuan as='h1'>
      STAY<br />
      WITHIN<br />
      HAIL
    </Gargantuan>
  )
}

const HAZE = {
  className: 'haze',
  icon: Haze,
  audio: hazeAudio,
  animations: HAZE_ANIMATIONS,
  title: (
    <Gargantuan as='h1'>
      <span className='haze-hazy-1'>Hazy</span>
      <span className='haze-hazy-2'>Hazy</span>
    </Gargantuan>
  )
}

const SMOKY = {
  className: 'smoky',
  icon: Foggy,
  animations: SMOKY_ANIMATIONS,
  title: (
    <Gargantuan as='h1'>
      HOLY<br />
      SMOKE
    </Gargantuan>
  )
}

const FOGGY = {
  className: 'foggy',
  icon: Foggy,
  animations: FOGGY_ANIMATIONS,
  title: (
    <Gargantuan as='h1'>
      Fogged<br />
      Over
    </Gargantuan>
  )
}

const SLEET = {
  className: 'sleet',
  icon: Mixed,
  animations: SLEET_ANIMATIONS,
  title: (
    <Gargantuan as='h1'>
      NEITHER RAIN<br />
      <span className='sleet-nor-snow'>NOR SNOW</span>
    </Gargantuan>
  )
}

const DUST = {
  className: 'dust',
  icon: Dust,
  animations: DUST_ANIMATIONS,
  title: (
    <div>
      <div className='dust-mask-box'>
        <Bottom id='dust-mask' className='dust-mask' />
        <Bottom id='dust-mask-t' rectWidth={980} className='dust-mask-t' />
        <Bottom id='dust-mask-m' rectHeight={90} rectWidth={380} className='dust-mask-m' />
      </div>
      <Gargantuan as='h1'>
        Mak<span className='dust-euy'>e</span> <span className='dust-t'>T</span>he<br />
        <span className='dust-d'>D</span><span className='dust-euy'>u</span>st Fl<span className='dust-euy'>y</span>
      </Gargantuan>
    </div>
  )
}

const NIGHT = {
  className: 'night',
  icon: Night,
  audio: nightAudio,
  animations: NIGHT_ANIMATIONS,
  title: (
    <Gargantuan as='h1'>
      Good Night
    </Gargantuan>
  )
}

const WINDY = {
  className: 'windy',
  icon: Windy,
  audio: windAudio,
  animations: WINDY_ANIMATIONS,
  title: (
    <Gargantuan as='h1'>
      <span className='windy-blow'>Blow</span> <span className='windy-with'>with</span><br /><span className='windy-the'>the</span><br className='windy-tbr' /> <span className='windy-wind'>wind</span>
    </Gargantuan>
  )
}

const MIXED_RAIN_AND_SNOW = {
  className: 'mixed-rain-and-snow',
  icon: Mixed,
  audio: mixedAudio,
  title: (
    <Gargantuan as='h1'>
      <span className='mixed-come'>Come</span><br />Rain {'&'} Snow
    </Gargantuan>
  )
}

const MIXED_RAIN_AND_HAIL = {
  className: 'mixed-rain-and-snow',
  icon: Mixed,
  audio: mixedAudio,
  title: (
    <Gargantuan as='h1'>
      <span className='mixed-come'>Come</span><br />Rain {'&'} Hail
    </Gargantuan>
  )
}

const MIXED_RAIN_AND_SLEET = {
  className: 'mixed-rain-and-snow',
  icon: Mixed,
  audio: mixedAudio,
  title: (
    <Gargantuan as='h1'>
      <span className='mixed-come'>Come</span><br />Rain {'&'} Sleet
    </Gargantuan>
  )
}

const MIXED_SNOW_AND_SLEET = {
  className: 'mixed-rain-and-snow',
  icon: Mixed,
  audio: mixedAudio,
  title: (
    <Gargantuan as='h1'>
      <span className='mixed-come'>Come</span><br />Snow {'&'} Sleet
    </Gargantuan>
  )
}

const DRIZZLE = {
  className: 'drizzle',
  icon: Drizzle,
  audio: drizzleAudio,
  animations: DRIZZLE_ANIMATIONS,
  title: (
    <Gargantuan as='h1'>
      Drizzle<br />
      <span className='drizzle-second'>Drizzle</span>
    </Gargantuan>
  )
}

const THUNDERSTORMS = {
  className: 'thunderstorms',
  icon: Storms,
  animations: STORM_ANIMATIONS,
  audio: stormAudio,
  title: (
    <Gargantuan as='h1'>
      After storms<br />
      comes a calm
    </Gargantuan>
  )
}

const TORNADO = {
  ...THUNDERSTORMS,
  audio: tornadoAudio,
  icon: Tornado
}

export const THEMES = {
  '0': TORNADO,
  '1': TORNADO,
  '2': TORNADO,
  '3': THUNDERSTORMS,
  '4': THUNDERSTORMS,
  '5': MIXED_RAIN_AND_SNOW,
  '6': MIXED_RAIN_AND_SLEET,
  '7': MIXED_SNOW_AND_SLEET,
  '8': DRIZZLE,
  '9': DRIZZLE,
  '10': RAIN,
  '11': RAIN,
  '12': RAIN,
  '13': SNOW,
  '14': SNOW,
  '15': BLOWING_SNOW,
  '16': SNOW,
  '17': HAIL,
  '18': SLEET,
  '19': DUST,
  '20': FOGGY,
  '21': HAZE,
  '22': SMOKY,
  '23': WINDY,
  '24': WINDY,
  '25': COLD,
  '26': CLOUDY,
  '27': NIGHT,
  '28': PARTLY_CLOUDY,
  '29': NIGHT,
  '30': PARTLY_CLOUDY,
  '31': NIGHT,
  '32': SUNNY,
  '33': NIGHT,
  '34': SUNNY,
  '35': MIXED_RAIN_AND_HAIL,
  '36': SUNNY,
  '37': THUNDERSTORMS,
  '38': THUNDERSTORMS,
  '39': THUNDERSTORMS,
  '40': RAIN,
  '41': SNOW,
  '42': SNOW,
  '43': SNOW,
  '44': DEFAULT,
  '45': THUNDERSTORMS,
  '46': SNOW,
  '47': THUNDERSTORMS
}
