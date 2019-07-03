/* eslint no-irregular-whitespace: 0 */

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
import Night from './components/icons/Night'
import Windy from './components/icons/Wind'
import Mixed from './components/icons/MixedRainSnow'
import Drizzle from './components/icons/Drizzle'
import Storms from './components/icons/Thunderstorms'
import Tornado from './components/icons/Tornado'
import Haze from './components/icons/Haze'
import Foggy from './components/icons/Foggy'
import Dust from './components/icons/Dust'
import Bottom from './components/bottom'

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

const HAIL = {
  className: 'hail',
  icon: Rain,
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
  title: (
    <Gargantuan as='h1'>
      <div className='dust-mask-box'>
        <Bottom id='dust-mask' className='dust-mask' />
        <Bottom id='dust-mask-t' rectWidth={980} className='dust-mask-t' />
        <Bottom id='dust-mask-m' rectHeight={90} rectWidth={380} className='dust-mask-m' />
      </div>
      Mak<span className='dust-euy'>e</span> <span className='dust-t'>T</span>he<br />
      <span className='dust-d'>D</span><span className='dust-euy'>u</span>st Fl<span className='dust-euy'>y</span>
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

const WINDY = {
  className: 'windy',
  icon: Windy,
  title: (
    <Gargantuan as='h1'>
      Blow <span className='windy-with'>with</span> <span className='windy-the'>the</span> <span className='windy-wind'>wind</span>
    </Gargantuan>
  )
}

const MIXED_RAIN_AND_SNOW = {
  className: 'mixed-rain-and-snow',
  icon: Mixed,
  title: (
    <Gargantuan as='h1'>
      <span className='mixed-come'>Come</span><br />Rain {'&'} Snow
    </Gargantuan>
  )
}

const MIXED_RAIN_AND_SLEET = {
  className: 'mixed-rain-and-snow',
  icon: Mixed,
  title: (
    <Gargantuan as='h1'>
      <span className='mixed-come'>Come</span><br />Rain {'&'} Sleet
    </Gargantuan>
  )
}

const MIXED_SNOW_AND_SLEET = {
  className: 'mixed-rain-and-snow',
  icon: Mixed,
  title: (
    <Gargantuan as='h1'>
      <span className='mixed-come'>Come</span><br />Snow {'&'} Sleet
    </Gargantuan>
  )
}

const DRIZZLE = {
  className: 'drizzle',
  icon: Drizzle,
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
  title: (
    <Gargantuan as='h1'>
      After storms<br />
      comes a calm
    </Gargantuan>
  )
}

const TORNADO = {
  ...THUNDERSTORMS,
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
  '14': 'light snow showers',
  '15': 'blowing snow',
  '16': SNOW,
  '17': HAIL,
  '18': SLEET,
  '19': DUST,
  '20': FOGGY,
  '21': HAZE,
  '22': SMOKY,
  '23': WINDY,
  '24': WINDY,
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
  '37': THUNDERSTORMS,
  '38': THUNDERSTORMS,
  '39': THUNDERSTORMS,
  '40': RAIN,
  '41': SNOW,
  '42': SNOW,
  '43': 'heavy snow',
  '44': DEFAULT,
  '45': THUNDERSTORMS,
  '46': SNOW,
  '47': THUNDERSTORMS
}
