import { hasDuplicateProps } from '../../conditionals'
import {
  mediaFeatures,
  minMediaFeatures,
  maxMediaFeatures
} from '../mediaFeatures'

type UserSelfMq<T> = T
export const composeMediaQuery = <T = { [key: string]: any }>(
  userSelfMq: UserSelfMq<T>
) => {
  const mqMethods = {
    ...mediaFeatures,
    ...minMediaFeatures,
    ...maxMediaFeatures
  }

  if (hasDuplicateProps(userSelfMq, mqMethods)) {
    throw new Error('Duplicate property name with library method.')
  }

  return { ...userSelfMq, ...mqMethods }
}
