
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

export function convertGold(gold) {
  let copper = gold * 100;
  let silver = Math.floor(copper / 100);
  let goldVal = Math.floor(silver / 100);
  silver = silver % 100;
  copper = copper % 100;
  return '<span class="coin gold">' + goldVal + '</span> ' + '<span class="coin silver">' + silver + '</span> ' + '<span class="coin copper">' + copper + '</span>';
}

export function renderElement(element, value) {
  let elements = document.querySelectorAll(element);
  for (let i = 0; i < elements.length; i++) {
    elements[i].innerHTML = `${value}`;
  }
}