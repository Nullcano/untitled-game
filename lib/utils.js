
export const randomItem = (arr) => arr[(Math.random() * arr.length) | 0]
export const randomItems = (arr, count) => arr.concat().reduce((p, _, __, arr) => (p[0] < count ? [p[0] + 1, p[1].concat(arr.splice((Math.random() * arr.length) | 0, 1))] : p), [0, []])[1]
export const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const formatNumber = (number) => {
  let num = number
  let suffix = ''
  if (num >= 1000000000) {
    num = num / 1000000000
    suffix = 'B'
  } else if (num >= 1000000) {
    num = num / 1000000
    suffix = 'M'
  } else if (num >= 10000) {
    num = num / 1000
    suffix = 'K'
  }
  return `${Math.floor(num)}${suffix}`
}