import {
  Gargantuan,
  GargantuanAlt,
  GargantuanAlt2
} from './components/text'
import Sun from './components/icons/sun'
import NotDef from './components/icons/NotDef'
import Cloudy from './components/icons/Cloudy'
import Snow from './components/icons/Snow'
import PartlyCloudy from './components/icons/PartlyCloudy'
import Rain from './components/icons/Rain'
import Haze from './components/icons/Haze'
import Night from './components/icons/Night'

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

const SNOW = {
  className: 'snow',
  icon: Snow,
  title: (
    <Gargantuan as='h1'>
      <span className='ll'>L</span>ET <span className='i'>I</span><span className='ll'>T</span><br />
      <span className='sn'>SN</span><span className='o'>O</span><span className='sn'>W</span>
    </Gargantuan>
  )
}

const PARTLY_CLOUDY = {
  className: 'partly-cloudy',
  icon: PartlyCloudy,
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
  title: (
    <Gargantuan as='h1'>
      Right<br />
      <span className='rain-a'>a</span>s rai<span className='rain-a'>n</span>
    </Gargantuan>
  )
}

const HAZE = {
  className: 'haze',
  icon: Haze,
  title: (
    <Gargantuan as='h1'>
      STAY<br />
      WITHIN<br />
      HAZE
    </Gargantuan>
  )
}

const NIGHT = {
  className: 'night',
  icon: Night,
  title: (
    <Gargantuan as='h1'>
      Good Night
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
  '10': RAIN,
  '11': RAIN,
  '12': RAIN,
  '13': SNOW,
  '14': 'light snow showers',
  '15': 'blowing snow',
  '16': SNOW,
  '17': 'hail',
  '18': 'sleet',
  '19': 'dust',
  '20': 'foggy',
  '21': HAZE,
  '22': 'smoky',
  '23': 'blustery',
  '24': 'windy',
  '25': 'cold',
  '26': CLOUDY,
  '27': NIGHT,
  '28': PARTLY_CLOUDY,
  '29': NIGHT,
  '30': PARTLY_CLOUDY,
  '31': NIGHT,
  '32': SUNNY,
  '33': NIGHT,
  '34': SUNNY,
  '35': 'mixed rain and hail',
  '36': SUNNY,
  '37': 'isolated thunderstorms',
  '38': 'scattered thunderstorms',
  '39': 'scattered showers (day)',
  '40': RAIN,
  '41': SNOW,
  '42': SNOW,
  '43': 'heavy snow',
  '44': DEFAULT,
  '45': 'scattered showers (night)',
  '46': SNOW,
  '47': 'scattered thundershowers'
}
