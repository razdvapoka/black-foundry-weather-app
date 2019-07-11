import styles from './style.styl'
import { XS } from '../text'
import { cc, withClass } from '../../utils'

const SwitchBox = withClass(styles.switch)('div')

const Switch = ({
  label,
  isOn,
  toggle,
  ...rest
}) => (
  <SwitchBox {...rest}>
    <XS as='label' className={styles.switchLabel}>{label}</XS>
    <div className={styles.switchInputBox}>
      <input
        className={styles.switchInput}
        type='checkbox'
        checked={isOn}
        onChange={toggle}
      />
      <span className={cc(styles.switchSlider, 'switch-slider')} />
    </div>
  </SwitchBox>
)

export default Switch
