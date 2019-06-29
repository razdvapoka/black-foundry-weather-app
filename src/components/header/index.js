import { Component } from 'preact'
import styles from './style.styl'
import { MONTH, DAY_OF_WEEK } from '../../consts'
import Switch from '../switch'
import Menu from 'async!../../components/menu'
import { tempToStr } from '../../utils'
import {
  XS,
  XXL,
  Gigantic
} from '../../components/text'

class Header extends Component {
  state = {
    isMenuOpen: false
  }

  toggleMenu = () => {
    this.setState(({ isMenuOpen }) => ({
      isMenuOpen: !isMenuOpen
    }))
  }

  render () {
    const {
      icon: Icon,
      city,
      temperature,
      condition,
      isFahrenheitOn,
      isFilterOn,
      toggleFahrenheit,
      toggleFilter,
      loadWeather
    } = this.props

    const { isMenuOpen } = this.state

    const date = new Date()
    const dayOfWeek = DAY_OF_WEEK[date.getDay()]
    const dateString = date.getDate() + ' ' + MONTH[date.getMonth()]
    const temperatureString = tempToStr(temperature, isFahrenheitOn)

    return (
      <header className={styles.header}>
        <div className={styles.info}>
          <div className={styles.temperature}>
            <XS className={styles.firstRow}>{condition}</XS>
            <div className={styles.secondRowBox}>
              <XS
                className={styles.secondRowMobile}
                onClick={this.toggleMenu}
              >
                {city}
              </XS>
              <XXL
                className={styles.secondRow}
                onClick={this.toggleMenu}
              >
                {city}
              </XXL>
              {isMenuOpen && (
                <Menu
                  toggleMenu={this.toggleMenu}
                  loadWeather={loadWeather}
                />
              )}
            </div>
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
                <Icon />
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
