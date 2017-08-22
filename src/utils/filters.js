import { default as numeral } from 'numeral'
import moment from 'moment'

export function numberFormat (value, format) {
  return numeral(value).format(format)
}

export function dateFormat (value, format) {
  return moment(value).format(format)
}
