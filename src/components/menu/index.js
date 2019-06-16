import cities from '../../assets/cities.json'
import styles from './styles.styl'
import { Component } from 'preact'
import VirtualList from 'preact-virtual-list'
import LookingGlass from '../icons/LookingGlass'
import onClickOutside from 'react-onclickoutside'

class Menu extends Component {
  state = {
    query: '',
    filteredCities: cities,
    rowHeight: null
  }

  handleQueryChange = (e) => {
    const query = e.target.value
    this.setState({
      query,
      filteredCities: cities.filter(
        city => city.toLowerCase().startsWith(query.toLowerCase())
      )
    })
  }

  render () {
    const {
      query,
      filteredCities,
      rowHeight
    } = this.state

    return (
      <div className={styles.menu}>
        <div className={styles.menuInput}>
          <div className={styles.menuInputIcon}>
            <LookingGlass />
          </div>
          <input
            value={query}
            onInput={this.handleQueryChange}
            placeholder='Enter city'
            type='text'
          />
        </div>
        {rowHeight && (
          <VirtualList
            className={styles.menuCitiesBox}
            data={filteredCities}
            renderRow={row => (
              <div
                className={styles.menuCitiesItem}
                onClick={() => this.handleCityClick(row)}
              >
                {row}
              </div>
            )}
            rowHeight={40}
            overscanCount={10}
          />
        )}
      </div>
    )
  }

  updateRowHeight = () => {
    const width = window.innerWidth
    const canonicalWidth = width <= 600
      ? 414
      : width <= 1024
        ? 1024
        : 1920
    const fontSizeInPixels = (19 / canonicalWidth) * window.innerWidth
    const rowHeight = (40 / 19) * fontSizeInPixels
    this.setState({ rowHeight })
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateRowHeight)
    this.updateRowHeight()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateRowHeight)
  }

  handleCityClick = (city) => {
    const { loadWeather, toggleMenu } = this.props
    loadWeather(city)
    toggleMenu()
  }
}

const clickOutsideConfig = {
  handleClickOutside: (instance) => {
    return instance.props.toggleMenu
  }
}

export default onClickOutside(Menu, clickOutsideConfig)
