import { Unit, MediaType } from './types'
import { pxToEm, pxToRem, pxToString, addMediaType } from './converters'
import { hasDuplicateProps } from './conditionals'

/**
 * @description Point is "px" based string or number
 * @example '768px' | 768
 */
type Point = string | number

type UserSelfMq<T> = T
type Opts = typeof defaultOpts

const defaultOpts = {
  unit: 'em' as Unit,
  unitRatio: 16,
  mediaType: 'all' as MediaType
}

const convertPoint = (point: Point, unit: Unit, ratio = 16): string => {
  if (unit === 'rem') {
    return pxToRem(point, ratio)
  }
  if (unit === 'em') {
    return pxToEm(point, ratio)
  }

  if (unit === 'px' && typeof point === 'number') return pxToString(point)

  return point as string
}

const mq = () => {
  const min = (point: Point, opts: Opts = defaultOpts) => {
    return `@media ${addMediaType(mediaType)} (min-width: ${convertPoint(
      point,
      unit,
      unitRatio
    )})`
  }

  const max = (point: Point, opts: Opts = defaultOpts) => {
    return `@media ${addMediaType(mediaType)} (max-width: ${convertPoint(
      point,
      unit,
      unitRatio
    )})`
  }

  const between = (
    minPoint: Point,
    maxPoint: Point,
    opts: Opts = defaultOpts
  ) => {
    return `@media ${addMediaType(mediaType)} (min-width: ${convertPoint(
      minPoint,
      unit,
      unitRatio
    )}) and (max-width: ${convertPoint(maxPoint, unit, unitRatio)})`
  }

  return {
    min,
    max,
    between
  }
}

const composeMediaQuery = <T = { [key: string]: any }>(
  userSelfMq: UserSelfMq<T>
) => {
  const mqMethods = mq()

  if (hasDuplicateProps(userSelfMq, mqMethods)) {
    throw new Error('Duplicate property name with library method.')
  }

  return { ...userSelfMq, ...mqMethods }
}

export default mq()

export { composeMediaQuery, pxToEm, pxToRem }
