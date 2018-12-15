import { pxToEm, pxToRem, pxToString, isPx, addMediaType } from './converters'

describe('isPx testing', () => {
  test('isPx', () => {
    expect(isPx('1px')).toBe(true)
    expect(isPx('1em')).toBe(false)
    expect(isPx('1rem')).toBe(false)
    expect(isPx('1000px')).toBe(true)
    expect(isPx('1000')).toBe(false)
    expect(isPx('1000kan')).toBe(false)
  })
})

describe('pxToEm', () => {
  test('string px to em', () => {
    expect(pxToEm('768px')).toBe('48em')
  })

  test('number(assumed px) to em', () => {
    expect(pxToEm(768)).toBe('48em')
  })

  test('string em is error', () => {
    expect(() => pxToEm('768em')).toThrow()
  })

  test('with specify ratio options', () => {
    expect(pxToEm('768px', 32)).toBe('24em')
  })
})

describe('pxToRem', () => {
  test('string px to rem', () => {
    expect(pxToRem('768px')).toBe('48rem')
  })

  test('number(assumed px) to rem', () => {
    expect(pxToRem(768)).toBe('48rem')
  })

  test('string rem is error', () => {
    expect(() => pxToRem('768rem')).toThrow()
  })

  test('with specify ratio options', () => {
    expect(pxToRem('768px', 32)).toBe('24rem')
  })
})

describe('pxToString', () => {
  test('when a number comes', () => {
    expect(pxToString(768)).toBe('768px')
  })
})

describe('addMediaType', () => {
  test('when a string comes', () => {
    expect(addMediaType('all')).toBe('all and')
  })
})
