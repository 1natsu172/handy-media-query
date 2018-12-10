import { Unit, MediaType } from './types'
import { pxToEm, pxToRem, pxToString } from './converters'

type Point = string | number
type UserSelfMq<T> = T
type DefaultOpts = typeof defaultOpts

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
  const min = (
    point: Point,
    { mediaType, unit, unitRatio }: DefaultOpts = defaultOpts
  ) =>
    `@media ${mediaType} (min-width: ${convertPoint(point, unit, unitRatio)})`

  const max = (
    point: Point,
    { mediaType, unit, unitRatio }: DefaultOpts = defaultOpts
  ) =>
    `@media ${mediaType} (max-width: ${convertPoint(point, unit, unitRatio)})`

  const between = (
    minPoint: Point,
    maxPoint: Point,
    { mediaType, unit, unitRatio }: DefaultOpts = defaultOpts
  ) =>
    `@media ${mediaType} (min-width: ${convertPoint(
      minPoint,
      unit,
      unitRatio
    )}) and (max-width: ${convertPoint(maxPoint, unit, unitRatio)})`

  return {
    min,
    max,
    between
  }
}

const generateMediaQuery = <T = { [key: string]: any }>(
  userSelfMq: UserSelfMq<T>
) => {
  const mqMethods = mq()
  return { ...userSelfMq, ...mqMethods }
}

export default mq()

export { generateMediaQuery, pxToEm, pxToRem }
