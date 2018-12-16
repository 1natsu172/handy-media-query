import { hasDuplicateProps } from '.'

const obj1 = {
  foo: 1,
  bar: '1',
  baz() {
    return 'baz'
  },
  hoge: true,
  dad: false
}

const obj2 = {
  josh: 1,
  john: '1',
  johz() {
    return 'baz'
  },
  jack: {
    guitar: true
  },
  dad: true
}

const obj3 = {
  cute: 'cute',
  beauty: 'yes',
  cure() {
    return 'cure'
  },
  pure: 18,
  happy: true
}

const obj4 = {
  vocal: true,
  guitar: true,
  bass: true,
  Drum: true,
  keyboard: false
}

const obj5 = {
  vocal: { name: 'jecy', age: 18 },
  guitar: { name: 'lick', age: 20 },
  bass: { name: 'zenon', age: 18 },
  Drum: { name: 'newstar', age: 19 },
  strings: { name: 'que', age: 21 }
}

test.each`
  a       | b       | expected
  ${obj1} | ${obj1} | ${true}
  ${obj1} | ${obj2} | ${true}
  ${obj1} | ${obj3} | ${false}
  ${obj1} | ${obj4} | ${false}
  ${obj1} | ${obj5} | ${false}
  ${obj2} | ${obj2} | ${true}
  ${obj2} | ${obj3} | ${false}
  ${obj2} | ${obj4} | ${false}
  ${obj2} | ${obj5} | ${false}
  ${obj3} | ${obj3} | ${true}
  ${obj3} | ${obj4} | ${false}
  ${obj3} | ${obj5} | ${false}
  ${obj4} | ${obj4} | ${true}
  ${obj4} | ${obj5} | ${true}
  ${obj5} | ${obj5} | ${true}
`('has duplicate object property(shallow)', ({ a, b, expected }) => {
  expect(hasDuplicateProps(a, b)).toBe(expected)
})
