# 🧤 @1natsu/handy-media-query

**A handy CSS media query methods of JavaScript**

_**Just return the media query string.**_

The opportunity to use… (e.g. styled-components, emotion, …)

## 🏆 Table of contents

- [🧤 @1natsu/handy-media-query](#%F0%9F%A7%A4-1natsuhandy-media-query)
  - [🏆 Table of contents](#%F0%9F%8F%86-table-of-contents)
  - [✨ Getting Started](#%E2%9C%A8-getting-started)
  - [💁 Usage](#%F0%9F%92%81-usage)
    - [Simple](#simple)
  - [😌 Realistic example](#%F0%9F%98%8C-realistic-example)
    - [maybe as usufull](#maybe-as-usufull)
  - [🔥 APIs](#%F0%9F%94%A5-apis)
    - [Default exported object](#default-exported-object)
      - [`#min(px, [opts])`](#minpx-opts)
      - [`#max(px, [opts])`](#maxpx-opts)
      - [`#between(minPx, maxPx, [opts])`](#betweenminpx-maxpx-opts)
        - [DefaultOptions](#defaultoptions)
    - [Named exported methods](#named-exported-methods)
      - [`composeMediaQuery(userSelfMediaQuery)`](#composemediaqueryuserselfmediaquery)
      - [`pxToEm(value, ratio)`](#pxtoemvalue-ratio)
      - [`pxToRem(value, ratio)`](#pxtoremvalue-ratio)
  - [💚 Running the tests](#%F0%9F%92%9A-running-the-tests)
  - [Contributing](#contributing)
  - [🏷 Versioning](#%F0%9F%8F%B7-versioning)
  - [©️ License](#%C2%A9%EF%B8%8F-license)
  - [🙏 Acknowledgments](#%F0%9F%99%8F-acknowledgments)
    - [Inspiration](#inspiration)

## ✨ Getting Started

with **yarn**

```bash
yarn add @1natsu/handy-media-query
```

or

with **npm**

```bash
npm install @1natsu/handy-media-query
```

## 💁 Usage

### Simple

```javascript
import mq from '@1natsu/handy-media-query'

mq.max(480) // "@media all and (max-width: 30em)"
mq.between(481,767) // "@media all and (min-width: 30.0625em) and (max-width: 47.9375em)"
mq.min(768) // "@media all and (min-width: 48em)"
```

> By default, the passed px is converted to em.

## 😌 Realistic example

### maybe as usufull

*mediaQuery.js*
```javascript
import mq, { composeMediaQuery, pxToEm } from '@1natsu/handy-media-query'

const breakpoints = {
  small: 480,
  middle: [481, 767],
  large: 768
}

const mediaQueries = composeMediaQuery({
  small: mq.max(breakpoints.small),
  middle: mq.between(breakpoints.middle[0], breakpoints.middle[1]),
  large: mq.min(breakpoints.large),
  irregular: `@media (min-height: ${pxToEm('680px')}), screen and (orientation: portrait)`
})

export { mediaQueries as mq }
```

*Foo.jsx*
> As an example a component file with Styled-components(v4)

```javascript
import React from 'react'
import styled from "styled-components";
import { mq } from './mediaQuery'


const Foo = ({text}) => <div>{text}</div>

const StyledFoo = styled(Foo)`
  color: blue;
  ${mq.small} {
    color: red;
  }
  ${mq.middle} {
    color: cyan;
  }
  // Local irregular……is also OK
  ${mq.between(1921,3840)} {
    color: pink;
  }
`
```

## 🔥 APIs

### Default exported object

```javascript
import mq from '@1natsu/handy-media-query'
```

#### `#min(px, [opts])`

| name    | require |       type       |              default              | decstiption                                 |
| ------- | :-----: | :--------------: | :-------------------------------: | ------------------------------------------- |
| min     |    ✓    | string \| number |                 -                 | `"<number>px"` or `number`(assuming pixels) |
| options |    -    |      object      | [DefaultOptions](#DefaultOptions) |                                             |

```javascript
mq.min(480)
// '@media all and (min-width: 30em)'

mq.min(480, {unit: 'px', mediaType: 'screen'})
// '@media screen and (min-width: 480px)'
```

#### `#max(px, [opts])`

| name    | require |       type       |              default              | decstiption                                 |
| ------- | :-----: | :--------------: | :-------------------------------: | ------------------------------------------- |
| max     |    ✓    | string \| number |                 -                 | `"<number>px"` or `number`(assuming pixels) |
| options |    -    |      object      | [DefaultOptions](#DefaultOptions) |                                             |

```javascript
mq.max(480)
// '@media all and (max-width: 30em)'

mq.max(480, {unit: 'px', mediaType: 'screen'})
// '@media screen and (max-width: 480px)'
```

#### `#between(minPx, maxPx, [opts])`

| name    | require |       type       |              default              | decstiption                                 |
| ------- | :-----: | :--------------: | :-------------------------------: | ------------------------------------------- |
| min     |    ✓    | string \| number |                 -                 | `"<number>px"` or `number`(assuming pixels) |
| max     |    ✓    | string \| number |                 -                 | `"<number>px"` or `number`(assuming pixels) |
| options |    -    |      object      | [DefaultOptions](#DefaultOptions) |                                             |

```javascript
mq.between(480,980)
// '@media all and (min-width: 30em) and (max-width: 61.25em)'

mq.between(480, 980, {unit: 'px', mediaType: 'screen'})
// '@media screen and (min-width: 480px) and (max-width: 61.25em)'
```

##### DefaultOptions

| name      | require |                       type                       | default | decstiption                                                                                                                  |
| --------- | :-----: | :----------------------------------------------: | :-----: | ---------------------------------------------------------------------------------------------------------------------------- |
| unit      |    -    |           `'em'` \| `'rem'` \| `'px'`            | `'em'`  | Output unit                                                                                                                  |
| unitRatio |    -    |                      number                      |  `16`   | Unit ratio as a reference of `'em'` or `'rem'`                                                                               |
| mediaType |    -    | `'all'` \| `'screen'` \| `'print'` \| `'speech'` | `'all'` | [MDN - Media Query#Media-Types](https://developer.mozilla.org/en/docs/Web/CSS/Media_Queries/Using_media_queries#Media_types) |

---

### Named exported methods

#### `composeMediaQuery(userSelfMediaQuery)`

Return a new object with `{passed argument object}` + `{media query methods}`

This function merges media query methods & passed with the object. _**So it's necessary to avoid duplicate property names.**_

| name               | require |  type  | default | decstiption                             |
| ------------------ | :-----: | :----: | :-----: | --------------------------------------- |
| userSelfMediaQuery |    ✓    | object |    -    | Object with string media query in value |


```javascript
import { composeMediaQuery } from '@1natsu/handy-media-query'

const mediaQueries = composeMediaQuery({
  small: '@media (min-width: 320px)'
  middle: '@media (min-width: 768px)'
  large: '@media (min-width: 1280px)'
  irregular: `@media (min-height: 400px), screen and (orientation: portrait)`
})
```

The contents of the generated object are as follows.

```javascript
const mediaQueries = {
  small: '@media (min-width: 320px)'
  middle: '@media (min-width: 768px)'
  large: '@media (min-width: 1280px)'
  irregular: '@media (min-height: 400px), screen and (orientation: portrait)'
  min: [Function]
  max: [Function]
  between: [Function]
  …
  …
  …
}
```

**But, assume a usage like a [Realistic example](#realistic-example)**

#### `pxToEm(value, ratio)`

* Unit converter for px to em

| name  | require |       type       | default | decstiption                                         |
| ----- | :-----: | :--------------: | :-----: | --------------------------------------------------- |
| value |    ✓    | string \| number |    -    | Conversion source px.<br>`"<number>px"` or `number` |
| ratio |    -    |      number      |  `16`   | Unit ratio as a reference of `'em'`                 |

```javascript
import { pxToEm } from '@1natsu/handy-media-query'

const convertToEm = pxToEm(480, 10)
console.log(convertToEm) // 48em
```

#### `pxToRem(value, ratio)`

* Unit converter for px to rem

| name  | require |       type       | default | decstiption                                         |
| ----- | :-----: | :--------------: | :-----: | --------------------------------------------------- |
| value |    ✓    | string \| number |    -    | Conversion source px.<br>`"<number>px"` or `number` |
| ratio |    -    |      number      |  `16`   | Unit ratio as a reference of `'rem'`                |

```javascript
import { pxToRem } from '@1natsu/handy-media-query'

const convertToRem = pxToRem(480, 10)
console.log(convertToRem) // 48rem
```

## 💚 Running the tests

with [Jest](https://jestjs.io/).

```bash
yarn test
```
or

```bash
npm run test
```

<!-- 
## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us. -->

## 🏷 Versioning

Use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/1natsu172/handy-media-query/tags). 

## ©️ License

MIT © [1natsu172](https://github.com/1natsu172)

## 🙏 Acknowledgments

### Inspiration

* [styled-media-query](https://github.com/morajabi/styled-media-query)

