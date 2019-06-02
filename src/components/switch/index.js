import styles from './style.styl'
import { XS } from '../text'

const Switch = ({
  label,
  isOn,
  toggle
}) => (
  <div className={styles.switch}>
    <XS as='label' className={styles.switchLabel}>{label}</XS>
    <div className={styles.switchInputBox}>
      <input
        className={styles.switchInput}
        type='checkbox'
        value={isOn}
        onChange={toggle}
      />
      <span className={styles.switchSlider} />
    </div>
  </div>
)

export default Switch
