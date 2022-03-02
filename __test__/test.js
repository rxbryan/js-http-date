const HttpDate = require('../index.js')

test('HttpDate should be an instance of Date', () => {
  function instanceofDate() {
    return new HttpDate() instanceof HttpDate  
  }
  expect(instanceofDate()).toBe(true)
})

describe('constructor intialisation', () => {
  test('should reject an invalid HTTP-date', () => {
    function invalidDate () {
      return new HttpDate('Mon,6 Nov 1994 08:49:37 GMT')
    }
    expect(invalidDate).toThrow(TypeError)
  })

  test('argument isvalid RFC850', () => {
    function validRFC850 () {
      return new HttpDate('Sunday, 06-Nov-94 08:49:37 GMT')
    }
    expect(validRFC850).not.toThrowError('Invalid Date')
  })

  test('argument is invalid RFC850', () => {
    function invalidRFC850 () {
      return new HttpDate('Sunday, 06-Niv-94 08:49:37 GMT')
    }
    expect(invalidRFC850).toThrow(TypeError)
  })

  test('should detect invalid dates', () => {
    function invalidDate1() {
      return new HttpDate(-86400000000000000)
    }

    function invalidDate2() {
      return new HttpDate(86400000000000000)
    }

    expect(invalidDate1).toThrowError('Invalid Date')

    expect(invalidDate2).toThrow(TypeError)
  })

  test('argument isvalid IMF_fixdate', () => {
    function validIMF_fidate () {
      return new HttpDate('Mon, 07 Nov 1994 08:49:37 GMT')
    }
    expect(validIMF_fidate).not.toThrow('Invalid Date')
  })

  test('argument is invalid IMF_fixdate', () => {
    function invalidIMF_fidate () {
      return new HttpDate('Mon, 07 Kyv 1994 08:49:37 GMT')
    }
    expect(invalidIMF_fidate).toThrow(TypeError)
  })

  test('argument isvalid asctime', () => {
    function valid_asctime () {
      return new HttpDate('Sun Nov 6 08:49:37 1994')
    }
    expect(valid_asctime).not.toThrow(TypeError)
  })

  test('argument is invalid asctime', () => {
    function invalid_asctime () {
      return new HttpDate('Sun vrf 6 08:49:37 1994')
    }
    expect(invalid_asctime).toThrow(TypeError)
  })

  test('arg is Number (unix time)', () => {
    function unixtime () {
      return new HttpDate(1646224354911)
    }
    expect(unixtime).not.toThrow(TypeError)
  })

  test('no argument', () => {
    function noArgs () {
      return new HttpDate()
    }
    expect(noArgs).not.toThrow(TypeError)
  })

  test('should accept upto seven arguments', () => {
    function _7Args () {
      return new HttpDate(2022,2,3,13,13,34,800)
    }
    expect(_7Args).not.toThrow(TypeError)
  })

  test('constructor should accept at most seven arguments', () => {
    function ArgsGt7 () {
      return new HttpDate(2022,2,3,13,13,34,800,43)
    }
    expect(ArgsGt7).toThrow(TypeError)
  })

  test('should accept just year and month as arguments', () => {
    function handle2Args () {
      return new HttpDate(2022,2)
    }
    expect(handle2Args).not.toThrow(TypeError)
  })

})

test('HttpDate object properly initialised', () => {

    function testinit() {
      return new HttpDate(2022,2,3,13,13,34,800).getTime()
    }
    expect(testinit()).toBe(1646309614800)
})

describe('should generate proper IMF_fixdate string', () => {
   test('unixtime intialisations should generate proper strings',() => {
    function genTimeStr1() {
      return new HttpDate(1646224354911).toString()
    }
    expect(genTimeStr1())
       .toMatch('Wed, 02 Mar 2022 12:32:34 GMT')
   })
   test('IMF_fixdate format intialisations should generate proper strings', ()=>{
    function genTimeStrFromPreferred() {
      return new HttpDate('Mon, 07 Nov 1994 08:49:37 GMT').toString()
    }
    expect(genTimeStrFromPreferred()).toHaveLength(29)
    expect(genTimeStrFromPreferred())
    .toMatch('Mon, 07 Nov 1994 08:49:37 GMT')
  })

  test('asctime intialisations should generate proper strings', () => {
    function genTimestrFrom_asctime() {
      return new HttpDate('Sun Nov 6 08:49:37 1994').toString()
    }
    expect(genTimestrFrom_asctime())
        .toMatch('Sun, 06 Nov 1994 08:49:37 GMT')
  })
  test('RFC850 format intialisations should generate proper strings', () => {
    function genTimestrFrom_RFC850_format() {
      return new HttpDate('Sunday, 06-Nov-94 08:49:37 GMT').toString()
    }
    expect(genTimestrFrom_RFC850_format())
    .toMatch('Sun, 06 Nov 1994 08:49:37 GMT')
  })
})

describe('generate standard time', () => {
  test('should generate standard Date string ',() => {
    function genStandardTimeStr() {
      return new HttpDate(1646224354911).toString({format: 'standard'})
    }
    expect(genStandardTimeStr())
     .toMatch('Wed Mar 02 2022 13:32:34 GMT+0100 (West Africa Standard Time)')
  })

  test('should generate standard Date string ',() => {
    function genStandardTimeStr2() {
      return new HttpDate(2022,2,10,13,13,34,800).toString({format: 'standard'})
    }
    expect(genStandardTimeStr2())
     .toMatch('Thu Mar 10 2022 13:13:34 GMT+0100 (West Africa Standard Time)')
  })

  test('RFC850 format intialisations should generate standard Date strings', () => {
    function genTimestrFrom_RFC850_format() {
      return new HttpDate('Sunday, 06-Nov-94 08:49:37 GMT').toString({format: 'standard'})
    }
    expect(genTimestrFrom_RFC850_format())
    .toMatch('Sun Nov 06 1994 09:49:37 GMT+0100 (West Africa Standard Time)')
  })
})

describe('should test valid HTTP-date', () => {
  test('isValid IMF_fixdate', () => {
    function validIMF_fidate() {
      return HttpDate.isValid('Sun, 06 Nov 1994 08:49:37 GMT')
    }
    expect(validIMF_fidate()).toBe(true)
  })

  test('isValid RFC850 date format', () => {
    function validRFC850() {
      return HttpDate.isValid('Sunday, 06-Nov-94 08:49:37 GMT')
    }
    expect(validRFC850()).toBe(true)
  })
  test('isValid asctime', () => {
    function valid_asctime() {
      return HttpDate.isValid('Sun Nov 6 08:49:37 1994')
    }
    expect(valid_asctime()).toBe(true)
  })
})

//test.todo('does proper TimeZone conversions')