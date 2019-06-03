import { Component } from 'preact'
import styles from './style.styl'
import { MONTH, DAY_OF_WEEK } from '../../consts'
import Switch from '../switch'
import { tempToStr } from '../../utils'
import {
  XS,
  XXL,
  Gigantic
} from '../../components/text'

class Header extends Component {
  render () {
    const {
      city,
      temperature,
      condition,
      isFahrenheitOn,
      isFilterOn,
      toggleFahrenheit,
      toggleFilter
    } = this.props

    const date = new Date()
    const dayOfWeek = DAY_OF_WEEK[date.getDay()]
    const dateString = date.getDate() + ' ' + MONTH[date.getMonth()]
    const temperatureString = tempToStr(temperature, isFahrenheitOn)

    return (
      <header className={styles.header}>
        <div className={styles.info}>
          <div className={styles.temperature}>
            <XS>city</XS>
            <XXL className={styles.secondRow}>{city}</XXL>
            <Gigantic className={styles.thirdRow}>
              {temperatureString}
            </Gigantic>
          </div>
          <div>
            <XS>{dayOfWeek}</XS>
            <XXL className={styles.secondRow}>{dateString}</XXL>
            <Gigantic className={styles.thirdRow}>{condition}</Gigantic>
          </div>
        </div>
        <div className={styles.switches}>
          <Switch
            label='°C / °F'
            isOn={isFahrenheitOn}
            toggle={toggleFahrenheit}
          />
          <Switch
            label='Filter'
            isOn={isFilterOn}
            toggle={toggleFilter}
          />
        </div>
      </header>
    )
  }
}

export default Header
