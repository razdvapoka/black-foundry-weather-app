import cities from '../../assets/cities.json'
import styles from './styles.styl'

const Menu = () => (
  <div className={styles.menu}>
    {cities.length}
  </div>
)

export default Menu
