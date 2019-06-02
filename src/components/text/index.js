import { factory } from '../variable'
import { withClass } from '../../utils'

const Variable = factory('p')

export const XXS = withClass('xxs')(Variable)
export const XS = withClass('xs')(Variable)
export const S = withClass('s')(Variable)
export const M = withClass('m')(Variable)
export const L = withClass('l')(Variable)
export const XL = withClass('xl')(Variable)
export const XXL = withClass('xxl')(Variable)
export const Gigantic = withClass('gigantic')(Variable)
export const Gargantuan = withClass('gargantuan')(Variable)
