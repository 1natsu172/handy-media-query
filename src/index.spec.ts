import mq, { composeMediaQuery } from '.'

describe('library methods(default exported) tests', () => {
  // generate ramdom px numbers
  let minPx: number
  let maxPx = 5000
  beforeEach(() => {
    minPx = Math.floor(Math.random() * maxPx + 1)
    maxPx = Math.floor(Math.random() * (maxPx + 1 - minPx)) + minPx
  })

  describe('Basic usage', () => {
    test('min', () => {
      expect(mq.min(minPx)).toBe(`@media all (min-width: ${minPx / 16}em)`)
    })

    test('max', () => {
      expect(mq.max(maxPx)).toBe(`@media all (max-width: ${maxPx / 16}em)`)
    })

    test('between', () => {
      expect(mq.between(minPx, maxPx)).toBe(
        `@media all (min-width: ${minPx / 16}em) and (max-width: ${maxPx /
          16}em)`
      )
    })
  })

  describe.each`
    opts
    ${{ unit: 'px', unitRatio: 32, mediaType: 'all' }}
    ${{ unit: 'em', unitRatio: 32, mediaType: 'all' }}
    ${{ unit: 'rem', unitRatio: 32, mediaType: 'all' }}
    ${{ unit: 'px', unitRatio: 10, mediaType: 'print' }}
    ${{ unit: 'em', unitRatio: 10, mediaType: 'print' }}
    ${{ unit: 'rem', unitRatio: 10, mediaType: 'print' }}
    ${{ unit: 'px', unitRatio: 64, mediaType: 'screen' }}
    ${{ unit: 'em', unitRatio: 64, mediaType: 'screen' }}
    ${{ unit: 'rem', unitRatio: 64, mediaType: 'screen' }}
    ${{ unit: 'px', unitRatio: 22, mediaType: 'speech' }}
    ${{ unit: 'em', unitRatio: 22, mediaType: 'speech' }}
    ${{ unit: 'rem', unitRatio: 22, mediaType: 'speech' }}
  `('with Options', ({ opts }) => {
    const { unit, unitRatio, mediaType } = opts

    test(`min with Options`, () => {
      expect(mq.min(minPx, opts)).toBe(
        `@media ${mediaType} (min-width: ${
          unit !== 'px' ? minPx / unitRatio : minPx
        }${unit})`
      )
    })

    test(`max with Options`, () => {
      expect(mq.max(minPx, opts)).toBe(
        `@media ${mediaType} (max-width: ${
          unit !== 'px' ? minPx / unitRatio : minPx
        }${unit})`
      )
    })

    test(`between with Options`, () => {
      expect(mq.between(minPx, maxPx, opts)).toBe(
        `@media ${mediaType} (min-width: ${
          unit !== 'px' ? minPx / unitRatio : minPx
        }${unit}) and (max-width: ${
          unit !== 'px' ? maxPx / unitRatio : maxPx
        }${unit})`
      )
    })
  })
})

describe('Generate media queries', () => {
  const mediaQueries = {
    small: mq.max(480),
    middle: mq.between(481, 767),
    large: mq.min(768),
    fhd: `@media screen (min-width: 120em)`,
    uhd: `@media screen (min-width: 240em)`
  }
  const { ...libraryMethods } = mq

  test('Successful example', () => {
    expect(JSON.stringify(composeMediaQuery(mediaQueries))).toEqual(
      JSON.stringify({
        small: mq.max(480),
        middle: mq.between(481, 767),
        large: mq.min(768),
        fhd: `@media screen (min-width: 120em)`,
        uhd: `@media screen (min-width: 240em)`,
        ...libraryMethods
      })
    )
  })

  test('Fail if there are duplicate library properties', () => {
    expect(() => composeMediaQuery({ ...mediaQueries, min: 'yo' })).toThrow()
  })
})
