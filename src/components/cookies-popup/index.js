import { cc } from "../../utils";
import styles from "./style.styl";

const CookiesPopup = ({ close }) => (
  <div className={cc(styles.cookiesPopup, "cookies-popup")}>
    We use cookies to give you the best experience. If you continue to use our website, we suggest
    that you accept their use.
    <button onClick={close}>OK</button>
  </div>
);

export default CookiesPopup;
