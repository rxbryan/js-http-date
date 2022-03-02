
module.exports = HttpDate

const PREFERRED_FORMAT_REGEX =
  /^[A-Z]{1}\w{2}, \d{2} [A-Z]{1}\w{2} \d{4} \d{2}:\d{2}:\d{2} GMT$/
const RFC850_FORMAT_REGEX =
  /^[A-Z]{1}\w{5,8}, \d{2}-\w{3}-\d{2} \d{2}:\d{2}:\d{2} (GMT|Gmt|gmt)$/
const ASCTIME_REGEX =
  /^\w{3} \w{3} (\d{2}|\d{1}) \d{2}:\d{2}:\d{2} \d{4}$/

/**
 * overrides the toString method
 * constructor only checks if string passed to
 * it is a valid HTTP-date.
 */
class HttpDate extends Date {
  /**
   * @param {object}|{number}|{string}
   */
  constructor(...args) {
    let dateArgs

    if (args.length === 1 && typeof (args[0]) === 'string') {
      if (isIMFfixdate(args[0]))
        dateArgs = IMF_fixdate_parser(args[0])
      else if (isRFC850date(args[0]))
        dateArgs = rfc850_parser(args[0])
      else if (isAsctime(args[0]))
        dateArgs = asctime_parser(args[0])
      else
        throw new TypeError('HttpDate constructor argument is not a valid date')
    } else if (args.length === 1 && typeof (args[0]) === 'number') {
      dateArgs = args
    } else if (args.length > 1) {
      dateArgs = args
    } else {
      throw new TypeError('HttpDate constructor argument is not a valid date')
    }

    if (dateArgs.length > 0)
      super(...dateArgs)
    else
      super()

    this.setTime(GMT_toLocalTimeConstructor(this))
  }

  /**
   * returns {string} in HTTP-date preferred format
   * timezone = GMT
   */
  toString() {
    let hrs = this.getUTCHours(),
      mins = this.getUTCMinutes(),
      secs = this.getUTCSeconds(),
      date = this.getUTCDate()

    let timeString = [
      `${hrs.toString().length === 1 ? '0' + hrs : hrs}`,
      `${mins.toString().length === 1 ? '0' + mins : mins}`,
      `${secs.toString().length === 1 ? '0' + secs : secs}`
    ].join(':')
    let dateString = [
      `${date.toString().length === 1 ? '0' + date : date}`,
      `${getMonth(this.getUTCMonth())}`,
      `${this.getUTCFullYear()}`
    ].join(' ')

    return [
    getDay(this.getUTCDay()) + ',',
    dateString,
    timeString,
    'GMT'
    ].join(' ')
  }

}

HttpDate.isValid = function isValid(arg) {
  return isValid_IMF_fixdate(arg) ||
    isValid_asctime(arg) ||
    isValid__rfc850(arg)
}

HttpDate.isIMFfixdate = function isValid_IMF_fixdate(arg) {
  return PREFERRED_FORMAT_REGEX.test(arg)
}

HttpDate.isAsctime =  function isValid_asctime(arg) {
  return ASCTIME_REGEX.test(arg)
}

HttpDate.isRFC850date = function isValid__rfc850(arg) {
  return RFC850_FORMAT_REGEX.test(arg)
}

/**
 *@param {String}
 * returns {Array}
 */
function IMF_fixdate_parser(date) {
  let dateArgs = date.slice(5,25).split(' ')
  let timeArgs = dateArgs[3].split(':')

  return [
    dateArgs[2],
    getMonth(dateArgs[1]),
    dateArgs[0],
    ...timeArgs
  ]
}

/**
 *@param {String}
 * returns {Array}
 */
function rfc850_parser(date) {
  let args = date.slice(8,-4).split(' ')
  let dateArgs = args[0].split('-')
  let timeArgs = args[1].split(':')

  return [
  dateArgs[2],
  getMonth(dateArgs[1]),
  dateArgs[0],
  ...timeArgs
  ]
}

/**
 *@param {String}
 * returns {Array}
 */
function asctime_parser(date) {
  let args = date.slice(4).split(' ')
  let timeArgs = args[2].split(':')

  return [
    args[3],
    getMonth(args[0]),
    args[1],
    ...timeArgs
  ]
}

/**
 * @param {Number} A value of 0 specifies Sunday; 1 specifies Monday;
 * 2 specifies Tuesday; 3 specifies Wednesday; 4 specifies Thursday; 
 * 5 specifies Friday; and 6 specifies Saturday
 * returns {string}|{undefined}
 */
function getDay(arg) {
  return (arg === 0) ? 'Sun' :
   (arg === 1) ? 'Mon' :
   (arg === 2) ? 'Tue' :
   (arg === 3) ? 'Wed' :
   (arg === 4) ? 'Thu' :
   (arg === 5) ? 'Fri' :
   (arg === 6) ? 'Sat' : undefined
}

/**
 * @param {Number}|{String}
 * returns {string}|{Number}|{undefined} Returns -1 if arg is not in
 * in the months array
 */
 function getMonth(arg) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ]

   return (typeof(arg) === 'number' && arg <= months.length) ? months[arg] :
    (typeof(arg) === 'string') ? months.indexOf(arg) : undefined
 }

/**
 * @param {Array}
 * returns {Number} local time in unix time
 */
function GMT_toLocalTimeConstructor(obj) {
  let timezoneOffset = obj.getTimezoneOffset()
  let localTime = obj.getTime() - TimezoneOffset
  return localTime
}