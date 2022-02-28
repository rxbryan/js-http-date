/**
 * overrides only toString method
 * 
 */
class HttpDate extends Date {
  /**
   * @param {object}|{number}|{string}
   */
  constructor(date) {

    super()

  }

  /**
   * returns {string} in HTTP-date preferred format
   * timezone = GMT
   */
  toString() {

  }

}

HttpDate.isvalid()

function isValid_IMF_fixdate() 
function isValid_asctime()
function isValid__rfc850

/**
 *@param {String} 
 */
function IMF_fixdate_parser(date) {
  const PREFERRED_FORMAT_REGEX = 
    /^[A-Z]{1}\w{2}, \d{2} [A-Z]{1}\w{2} \d{4} \d{2}:\d{2}:\d{2} GMT$/
}
function rfc850_parser() {
  const RFC850_FORMAT_REGEX = 
    /^[A-Z]{1}\w{5,8}, \d{2}-\w{3}-\d{2} \d{2}:\d{2}:\d{2} (GMT|Gmt|gmt)$/
}
function asctime_parser() {
  const ASCTIME_REGEX = /^\w{3} \w{3} (\d{2}|\d{1}) \d{2}:\d{2}:\d{2} \d{4}$/
}

/**
 * @param {Number} A value of 0 specifies Sunday; 1 specifies Monday;
 * 2 specifies Tuesday; 3 specifies Wednesday; 4 specifies Thursday; 
 * 5 specifies Friday; and 6 specifies Saturday
 * returns {string}|{NaN}
 */
function getDay(arg) {
  return (arg === 0) ? 'Sun' :
   (arg === 1) ? 'Mon' :
   (arg === 2) ? 'Tue' :
   (arg === 3) ? 'Wed' :
   (arg === 4) ? 'Thu' :
   (arg === 5) ? 'Fri' :
   (arg === 6) ? 'Sat' : NaN
}

/**
 * @param {Number}|{String}
 * returns {string}|{Number}|{NaN}
 */
 function getMonth(arg) {
   // body...
 }

/**
 * @param {Array}
 */
function toLocalTime(arr) {

}

function localTime_GMT ()
function genpreferred ()