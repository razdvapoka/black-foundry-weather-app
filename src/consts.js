/* eslint no-irregular-whitespace: 0 */
import { Gargantuan } from "./components/text";
import Sun from "./components/icons/sun";
import NotDef from "./components/icons/NotDef";
import Cloudy from "./components/icons/Cloudy";
import Snow from "./components/icons/Snow";
import BlowingSnow from "./components/icons/BlowingSnow";
import PartlyCloudy from "./components/icons/PartlyCloudy";
import Rain from "./components/icons/Rain";
import Night from "./components/icons/Night";
import Windy from "./components/icons/Wind";
import Mixed from "./components/icons/MixedRainSnow";
import Drizzle from "./components/icons/Drizzle";
import Storms from "./components/icons/Thunderstorms";
import Tornado from "./components/icons/Tornado";
import Haze from "./components/icons/Haze";
import Foggy from "./components/icons/Foggy";
import Dust from "./components/icons/Dust";
import Cold from "./components/icons/Cold";
import Bottom from "./components/bottom";
import fairDayAudio from "./assets/audio/fair-day.lite.mp3";
import cloudyAudio from "./assets/audio/cloudy.lite.mp3";
import rainAudio from "./assets/audio/rain.lite.mp3";
import stormAudio from "./assets/audio/storm.lite.mp3";
import nightAudio from "./assets/audio/night.lite.mp3";
import hazeAudio from "./assets/audio/haze.lite.mp3";
import windAudio from "./assets/audio/wind.lite.mp3";
import drizzleAudio from "./assets/audio/drizzle.lite.mp3";
import tornadoAudio from "./assets/audio/tornado.lite.mp3";
import snowAudio from "./assets/audio/snow.lite.mp3";
import blowingSnowAudio from "./assets/audio/blowing-snow.lite.mp3";
import mixedAudio from "./assets/audio/mixed.lite.mp3";
import hailAudio from "./assets/audio/hail.lite.mp3";
import foggyAudio from "./assets/audio/foggy.lite.mp3";
import sleetAudio from "./assets/audio/sleet.lite.mp3";
import dustAudio from "./assets/audio/dust.lite.mp3";

export const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const DAY_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const DAY_OF_WEEK_MAP = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday"
};

export const LOADING_STEP = 10;
export const LOADING_INTERVAL = 100;

export const NOT_AVAILABLE = 44;

const SUNNY = {
  className: "sunny",
  icon: Sun,
  audio: fairDayAudio,
  title: (
    <Gargantuan as="h1">
      Brighten
      <br />
      <span className="sunny-up">Up</span>
    </Gargantuan>
  )
};

const DEFAULT = {
  className: "default",
  icon: NotDef,
  audio: fairDayAudio,
  title: (
    <Gargantuan as="h1">
      have
      <br />
      a nice
      <br />
      day
    </Gargantuan>
  )
};

const CLOUDY = {
  className: "cloudy",
  icon: Cloudy,
  audio: cloudyAudio,
  title: (
    <Gargantuan as="h1">
      H<span className="cloudy-ztt">e</span>
      <span className="cloudy-grow">a</span>d i<span className="cloudy-wide">n</span> 
      <span className="cloudy-ztm">t</span>h<span className="cloudy-grow">e</span>
      <br />
      <span className="cloudy-wider">
        <span className="cloudy-ztt">C</span>
      </span>
      l<span className="cloudy-grow">o</span>u<span className="cloudy-wider">d</span>
      <span className="cloudy-grow">s</span>
    </Gargantuan>
  )
};

const SNOW = {
  className: "snow",
  icon: Snow,
  audio: snowAudio,
  title: (
    <Gargantuan as="h1">
      <span className="ll">L</span>
      <span className="et">
        E<span className="t">T</span>
      </span>{" "}
      <span className="i">I</span>
      <span className="tt">T</span>
      <br />
      <span className="sn">
        <span className="ss">S</span>
        <span className="n">N</span>
      </span>
      <span className="o">O</span>
      <span className="sn">
        <span className="w">W</span>
      </span>
    </Gargantuan>
  )
};

const BLOWING_SNOW = {
  ...SNOW,
  audio: blowingSnowAudio,
  icon: BlowingSnow
};

const PARTLY_CLOUDY = {
  className: "partly-cloudy",
  icon: PartlyCloudy,
  audio: cloudyAudio,
  title: (
    <Gargantuan as="h1">
      On
      <br />
      &nbsp;Cloud
      <br />
      &nbsp;&nbsp;Nine
    </Gargantuan>
  )
};

const RAIN = {
  className: "rain",
  icon: Rain,
  audio: rainAudio,
  title: (
    <Gargantuan as="h1">
      <span className="rain-to-zetta">Ri</span>
      <span className="rain-to-mega">g</span>
      <span className="rain-to-zetta">ht</span>
      <br />
      <span className="rain-a">a</span>s <span className="rain-to-mega">r</span>ai
      <span className="rain-a">n</span>
    </Gargantuan>
  )
};

const COLD = {
  className: "cold",
  icon: Cold,
  audio: rainAudio,
  title: (
    <Gargantuan as="h1">
      Cold
      <br />
      Turkey
    </Gargantuan>
  )
};

const HAIL = {
  className: "hail",
  icon: Rain,
  audio: hailAudio,
  title: (
    <Gargantuan as="h1">
      STAY
      <br />
      WITHIN
      <br />
      HAIL
    </Gargantuan>
  )
};

const HAZE = {
  className: "haze",
  icon: Haze,
  audio: hazeAudio,
  title: (
    <Gargantuan as="h1">
      <span className="haze-hazy-1">Hazy</span>
      <span className="haze-hazy-2">Hazy</span>
    </Gargantuan>
  )
};

const SMOKY = {
  className: "smoky",
  icon: Foggy,
  audio: foggyAudio,
  title: (
    <Gargantuan as="h1">
      HOLY
      <br />
      SMOKE
    </Gargantuan>
  )
};

const FOGGY = {
  className: "foggy",
  icon: Foggy,
  audio: foggyAudio,
  title: (
    <Gargantuan as="h1">
      Fogged
      <br />
      Over
    </Gargantuan>
  )
};

const SLEET = {
  className: "sleet",
  icon: Mixed,
  audio: sleetAudio,
  title: (
    <Gargantuan as="h1">
      NEITHER RAIN
      <br />
      <span className="sleet-spaces">&nbsp;&nbsp;</span>
      <span className="sleet-nor-snow">NOR SNOW</span>
    </Gargantuan>
  )
};

const DUST = {
  className: "dust",
  icon: Dust,
  audio: dustAudio,
  title: (
    <div>
      <div className="dust-mask-box">
        <Bottom id="dust-mask" className="dust-mask" />
        <Bottom id="dust-mask-t" rectWidth={980} className="dust-mask-t" />
        <Bottom id="dust-mask-m" rectHeight={90} rectWidth={380} className="dust-mask-m" />
      </div>
      <Gargantuan as="h1">
        <span className="dust-m">M</span>ak
        <span className="dust-euy">
          <span className="dust-e">e</span>
        </span>{" "}
        <span className="dust-t">T</span>
        <span className="dust-h">h</span>e
        <br />
        <span className="dust-d">D</span>
        <span className="dust-euy">u</span>st <span className="dust-f">F</span>l
        <span className="dust-euy">y</span>
      </Gargantuan>
    </div>
  )
};

export const NIGHT = {
  className: "night",
  icon: Night,
  audio: nightAudio,
  title: <Gargantuan as="h1">Good Night</Gargantuan>
};

const WINDY = {
  className: "windy",
  icon: Windy,
  audio: windAudio,
  title: (
    <Gargantuan as="h1">
      <span className="windy-blow">Blow</span> <span className="windy-with">with</span>
      <br />
      <span className="windy-the">the</span>
      <br className="windy-tbr" /> <span className="windy-wind">wind</span>
    </Gargantuan>
  )
};

const MIXED_RAIN_AND_SNOW = {
  className: "mixed-rain-and-snow",
  icon: Mixed,
  audio: mixedAudio,
  title: (
    <Gargantuan as="h1">
      <span className="mixed-come">Come</span>
      <br />
      Rain {"&"} Snow
    </Gargantuan>
  )
};

const MIXED_RAIN_AND_HAIL = {
  className: "mixed-rain-and-snow",
  icon: Mixed,
  audio: mixedAudio,
  title: (
    <Gargantuan as="h1">
      <span className="mixed-come">Come</span>
      <br />
      Rain {"&"} Hail
    </Gargantuan>
  )
};

const MIXED_RAIN_AND_SLEET = {
  className: "mixed-rain-and-snow",
  icon: Mixed,
  audio: mixedAudio,
  title: (
    <Gargantuan as="h1">
      <span className="mixed-come">Come</span>
      <br />
      Rain {"&"} Sleet
    </Gargantuan>
  )
};

const MIXED_SNOW_AND_SLEET = {
  className: "mixed-rain-and-snow",
  icon: Mixed,
  audio: mixedAudio,
  title: (
    <Gargantuan as="h1">
      <span className="mixed-come">Come</span>
      <br />
      Snow {"&"} Sleet
    </Gargantuan>
  )
};

const DRIZZLE = {
  className: "drizzle",
  icon: Drizzle,
  audio: drizzleAudio,
  title: (
    <Gargantuan as="h1">
      Drizzle
      <br />
      <span className="drizzle-second">Drizzle</span>
    </Gargantuan>
  )
};

const THUNDERSTORMS = {
  className: "thunderstorms",
  icon: Storms,
  audio: stormAudio,
  title: (
    <Gargantuan as="h1">
      After storms
      <br />
      comes a calm
    </Gargantuan>
  )
};

const TORNADO = {
  ...THUNDERSTORMS,
  audio: tornadoAudio,
  icon: Tornado
};

export const THEMES = {
  "0": TORNADO,
  "1": TORNADO,
  "2": TORNADO,
  "3": THUNDERSTORMS,
  "4": THUNDERSTORMS,
  "5": MIXED_RAIN_AND_SNOW,
  "6": MIXED_RAIN_AND_SLEET,
  "7": MIXED_SNOW_AND_SLEET,
  "8": DRIZZLE,
  "9": DRIZZLE,
  "10": RAIN,
  "11": RAIN,
  "12": RAIN,
  "13": SNOW,
  "14": SNOW,
  "15": BLOWING_SNOW,
  "16": SNOW,
  "17": HAIL,
  "18": SLEET,
  "19": DUST,
  "20": FOGGY,
  "21": HAZE,
  "22": SMOKY,
  "23": WINDY,
  "24": WINDY,
  "25": COLD,
  "26": CLOUDY,
  "27": PARTLY_CLOUDY,
  "28": PARTLY_CLOUDY,
  "29": PARTLY_CLOUDY,
  "30": PARTLY_CLOUDY,
  "31": DEFAULT,
  "32": SUNNY,
  "33": SUNNY,
  "34": SUNNY,
  "35": MIXED_RAIN_AND_HAIL,
  "36": SUNNY,
  "37": THUNDERSTORMS,
  "38": THUNDERSTORMS,
  "39": RAIN,
  "40": RAIN,
  "41": SNOW,
  "42": SNOW,
  "43": SNOW,
  "44": DEFAULT,
  "45": THUNDERSTORMS,
  "46": SNOW,
  "47": THUNDERSTORMS
};

export const DEFAULT_THEME_CODE = "44";

export const MUSCIC_TRANS_DURATION = 500;
