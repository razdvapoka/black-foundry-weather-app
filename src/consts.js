import {
  Gargantuan,
  GargantuanAlt,
  GargantuanAlt2
} from './components/text'
import Sun from './components/icons/sun'
import NotDef from './components/icons/NotDef'
import Cloudy from './components/icons/Cloudy'

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
  title: (
    <Gargantuan as='h1'>
      Brighten<br />
      <GargantuanAlt>Up</GargantuanAlt>
    </Gargantuan>
  )
}

const DEFAULT = {
  className: 'default',
  icon: NotDef,
  title: (
    <Gargantuan as='h1'>
      have<br />
      a nice<br />
      day
    </Gargantuan>
  )
}

const CLOUDY = {
  className: 'cloudy',
  icon: Cloudy,
  title: (
    <Gargantuan as='h1'>
      Head
      i<GargantuanAlt as='span'>n</GargantuanAlt> the<br />
      <GargantuanAlt2 as='span'>C</GargantuanAlt2>lou<GargantuanAlt2 as='span'>d</GargantuanAlt2>s
    </Gargantuan>
  )
}

export const THEMES = {
  '0': 'tornado',
  '1': 'tropical storm',
  '2': 'hurricane',
  '3': 'severe thunderstorms',
  '4': 'thunderstorms',
  '5': 'mixed rain and snow',
  '6': 'mixed rain and sleet',
  '7': 'mixed snow and sleet',
  '8': 'freezing drizzle',
  '9': 'drizzle',
  '10': 'freezing rain',
  '11': 'showers',
  '12': 'rain',
  '13': 'snow flurries',
  '14': 'light snow showers',
  '15': 'blowing snow',
  '16': 'snow',
  '17': 'hail',
  '18': 'sleet',
  '19': 'dust',
  '20': 'foggy',
  '21': 'haze',
  '22': 'smoky',
  '23': 'blustery',
  '24': 'windy',
  '25': 'cold',
  '26': CLOUDY,
  '27': 'mostly cloudy (night)',
  '28': 'mostly cloudy (day)',
  '29': 'partly cloudy (night)',
  '30': DEFAULT,
  '31': 'clear (night)',
  '32': SUNNY,
  '33': 'fair (night)',
  '34': SUNNY,
  '35': 'mixed rain and hail',
  '36': SUNNY,
  '37': 'isolated thunderstorms',
  '38': 'scattered thunderstorms',
  '39': 'scattered showers (day)',
  '40': 'heavy rain',
  '41': 'scattered snow showers (day)',
  '42': 'heavy snow',
  '43': 'blizzard',
  '44': 'not available',
  '45': 'scattered showers (night)',
  '46': 'scattered snow showers (night)',
  '47': 'scattered thundershowers'
}
