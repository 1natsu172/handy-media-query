import { Unit } from './../../../types/Units'
import { MediaType } from './../../../types/MediaType'
import { MediaFeaturePrefix } from './../../../types/MediaFeatures'
import { PxValue } from './../../../types/Values'
import { addMediaType, convertPx } from '../../converters'

const defaultOpts = {
  unit: 'em' as Unit,
  unitRatio: 16,
  mediaType: 'all' as MediaType,
  prefix: '' as MediaFeaturePrefix
}
type Opts = typeof defaultOpts

export const width = (point: PxValue, opts: Opts = defaultOpts) => {
  const { mediaType, unit, unitRatio, prefix } = { ...defaultOpts, ...opts }
  return `@media ${addMediaType(mediaType)} (${prefix}width: ${convertPx(
    point,
    unit,
    unitRatio
  )})`
}

export const height = (point: PxValue, opts: Opts = defaultOpts) => {
  const { mediaType, unit, unitRatio, prefix } = { ...defaultOpts, ...opts }
  return `@media ${addMediaType(mediaType)} (${prefix}height: ${convertPx(
    point,
    unit,
    unitRatio
  )})`
}

export const aspectRatio = () => {}
export const orientation = () => {}
export const resolution = () => {}
export const scan = () => {}
export const grid = () => {}
export const update = () => {}
export const overflowBlock = () => {}
export const overflowInline = () => {}
export const color = () => {}
export const colorGamut = () => {}
export const colorIndex = () => {}
export const displayMode = () => {}
export const monochrome = () => {}
export const invertedColors = () => {}
export const pointer = () => {}
export const hover = () => {}
export const anyPointer = () => {}
export const anyHover = () => {}
export const lightLevel = () => {}
export const prefersReducedMotion = () => {}
export const prefersReducedTransparency = () => {}
export const prefersContrast = () => {}
export const prefersColorScheme = () => {}
export const scripting = () => {}

export const mediaFeatures = {
  width,
  height
}
