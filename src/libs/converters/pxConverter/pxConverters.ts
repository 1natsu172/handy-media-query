import { Unit, MediaType, Point } from '../../../types'

export const isPx = (value: string): boolean => String(value).includes('px')

const pxToRelativeUnit = (
  value: string | number,
  ratio = 16,
  unit: Exclude<Unit, 'px'>
) => {
  let val = value

  if (typeof val === 'string') {
    if (!isPx(val)) throw new Error('An unexpected unit was handed')

    val = parseInt(val, 10)
  }

  val = val / ratio

  return val + unit
}

export const pxToEm = (value: string | number, ratio = 16) =>
  pxToRelativeUnit(value, ratio, 'em')

export const pxToRem = (value: string | number, ratio = 16) =>
  pxToRelativeUnit(value, ratio, 'rem')

export const pxToString = (value: number) => `${value}px`

export const addMediaType = (mediaType: MediaType) => `${mediaType} and`

export const convertPx = (point: Point, unit: Unit, ratio = 16): string => {
  if (unit === 'rem') {
    return pxToRem(point, ratio)
  }
  if (unit === 'em') {
    return pxToEm(point, ratio)
  }

  if (unit === 'px' && typeof point === 'number') return pxToString(point)

  return point as string
}
