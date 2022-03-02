const PREFERRED_FORMAT_REGEX =
  /^[A-Z]{1}\w{2}, \d{2} [A-Z]{1}\w{2} \d{4} \d{2}:\d{2}:\d{2} GMT$/
const RFC850_FORMAT_REGEX =
  /^[A-Z]{1}\w{5,8}, \d{2}-\w{3}-\d{2} \d{2}:\d{2}:\d{2} (GMT|Gmt|gmt)$/
const ASCTIME_REGEX =
  /^\w{3} \w{3} (\d{2}|\d{1}) \d{2}:\d{2}:\d{2} \d{4}$/

function isValid_IMF_fixdate(arg) {
  return PREFERRED_FORMAT_REGEX.test(arg)
}

function isValid_asctime(arg) {
  return ASCTIME_REGEX.test(arg)
}

function isValid__rfc850(arg) {
  return RFC850_FORMAT_REGEX.test(arg)
}

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
    let dateArgs, http_date
    if (args.length === 1 && typeof (args[0]) === 'string') {
      if (isValid_IMF_fixdate(args[0]))
        dateArgs = IMF_fixdate_parser(args[0])
      else if (isValid__rfc850(args[0]))
        dateArgs = rfc850_parser(args[0])
      else if (isValid_asctime(args[0]))
        dateArgs = asctime_parser(args[0])
      else
        throw new TypeError('HttpDate constructor argument is not a valid date')
      http_date = true
    } else if ((args.length === 1 && typeof (args[0]) === 'number') ||
        (args.length >= 2 && args.length <= 7) || args.length === 0) {
      dateArgs = args
    } else {
      throw new TypeError('HttpDate constructor argument is not a valid date')
    }

    if (dateArgs.length > 0)
      super(...dateArgs)
    else
      super()
    if (isNaN(this.getTime())) {
      throw new TypeError('Invalid Date')
    }
    if (http_date)
      this.setTime(GMT_toLocalTimeConstructor(this))
  }

  /**
   * returns {string} in HTTP-date preferred format
   * timezone = GMT
   */
  toString(options) {
    if (options && options.format === 'standard')
      return  super.toString()

    let timeString = [
      formatInt(this.getUTCHours(), 2),
      formatInt(this.getUTCMinutes(), 2),
      formatInt(this.getUTCSeconds(), 2)
    ].join(':')
    let dateString = [
      formatInt(this.getUTCDate(), 2),
      getMonth(this.getUTCMonth()),
      this.getUTCFullYear()
    ].join(' ')

    return [
    getDay(this.getUTCDay()) + ',',
    dateString,
    timeString,
    'GMT'
    ].join(' ')
  }
}

/**
 *@param {String}
 * returns {Array}
 */
function IMF_fixdate_parser(date) {
  let dateArgs = date.slice(5,25).split(' ')
  let timeArgs = dateArgs[3].split(':')
  let month = getMonth(dateArgs[1])
  console.log(month)
  if (!month)
    throw new TypeError(`${month} is an invalid month`)
  return [
    dateArgs[2],
    month,
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
  let month = getMonth(dateArgs[1])
  if (!month)
    throw new TypeError(`${month} is an invalid month`)
  return [
  dateArgs[2],
  month,
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
  let month = getMonth(args[0])
  if (!month)
    throw new TypeError(`${month} is an invalid month`)
  return [
    args[3],
    month,
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
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
return days[arg]
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
  console.log(arg)
  return (typeof(arg) === 'number' && arg <= months.length) ? months[arg] :
    (typeof(arg) === 'string' && months.indexOf(arg) !== -1) ? months.indexOf(arg) : undefined
 }

/**
 * @param {Array}
 * returns {Number} local time in unix time
 */
function GMT_toLocalTimeConstructor(obj) {
  let timezoneOffset = obj.getTimezoneOffset()
  let localTime = obj.getTime() - timezoneOffset*60*1000
  return localTime
}

/**
 * Because util.format sucks
 * precision formating of integers; formatInt(int, precision)
 */
function formatInt(int, pre) {
  let tmp = int.toString(),
    len = tmp.length
  if (len >= pre)
    return tmp
  else
    for(let i = 0; i < (pre - len); i++)
      tmp = '0' + tmp
  return tmp
}

HttpDate.isValid = function isValid(arg) {
  return isValid_IMF_fixdate(arg) ||
    isValid_asctime(arg) ||
    isValid__rfc850(arg)
}

HttpDate.isIMFfixdate = isValid_IMF_fixdate
HttpDate.isAsctime = isValid_asctime
HttpDate.isRFC850date = isValid__rfc850
module.exports = HttpDate