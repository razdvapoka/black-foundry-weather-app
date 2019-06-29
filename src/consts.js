import { Gargantuan, GargantuanAlt } from './components/text'
import Sun from './components/icons/sun'
import NotDef from './components/icons/NotDef'

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
  '26': 'cloudy',
  '27': 'mostly cloudy (night)',
  '28': 'mostly cloudy (day)',
  '29': 'partly cloudy (night)',
  '30': {
    className: 'default',
    icon: NotDef,
    title: (
      <Gargantuan as='h1'>
        have<br />
        a nice<br />
        day
      </Gargantuan>
    )
  },
  '31': 'clear (night)',
  '32': {
    className: 'sunny',
    icon: Sun,
    title: (
      <Gargantuan as='h1'>
        Brighten<br />
        <GargantuanAlt>Up</GargantuanAlt>
      </Gargantuan>
    )
  },
  '33': 'fair (night)',
  '34': 'fair (day)',
  '35': 'mixed rain and hail',
  '36': 'hot',
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
