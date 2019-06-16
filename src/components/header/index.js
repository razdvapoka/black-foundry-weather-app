import { Component } from 'preact'
import styles from './style.styl'
import { MONTH, DAY_OF_WEEK } from '../../consts'
import Switch from '../switch'
import Sun from '../icons/sun'
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
            <XS className={styles.firstRow}>{condition}</XS>
            <XS className={styles.secondRowMobile}>{city}</XS>
            <XXL className={styles.secondRow}>{city}</XXL>
            <Gigantic className={styles.thirdRow}>
              {temperatureString}
            </Gigantic>
          </div>
          <div>
            <XS className={styles.firstRow}>{dayOfWeek}</XS>
            <XS className={styles.secondRowMobile}>{dateString}</XS>
            <XXL className={styles.secondRow}>{dateString}</XXL>
            <Gigantic className={styles.thirdRow}>
              <div className={styles.iconBox}>
                <Sun />
              </div>
            </Gigantic>
          </div>
        </div>
        <div className={styles.switches}>
          <Switch
            label='°C / °F'
            isOn={isFahrenheitOn}
            toggle={toggleFahrenheit}
          />
          <Switch
            className={styles.filterSwitch}
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
