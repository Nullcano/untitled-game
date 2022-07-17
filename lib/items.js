import { randomItem, randomItems, randomInteger, formatNumber } from './utils.js'

let item, chance, power, value

let items = [
  {
    id: 'akm',
    name: 'AKM',
    type: 'Ranged',
    power: 10,
  }, {
    id: 'backpack',
    name: 'Backpack',
    type: 'Backpack',
    power: 0,
  }, {
    id: 'bandage',
    name: 'Bandage',
    type: 'Consumable',
    power: 0,
  }, {
    id: 'baseball-bat',
    name: 'Baseball Bat',
    type: 'Melee',
    power: 10,
  }, {
    id: 'bayonet',
    name: 'Bayonet',
    type: 'Melee',
    power: 10,
  }, {
    id: 'canned-food',
    name: 'Canned Food',
    type: 'Consumable',
    power: 0,
  }, {
    id: 'cap',
    name: 'Cap',
    type: 'Headgear',
    power: 0,
  }, {
    id: 'fire-axe',
    name: 'Fire Axe',
    type: 'Melee',
    power: 0,
  }, {
    id: 'flashbang',
    name: 'Flashbang',
    type: 'Consumable',
    power: 0,
  }, {
    id: 'fn45',
    name: 'FN45',
    type: 'Ranged',
    power: 0,
  }, {
    id: 'fresh-food',
    name: 'Fresh Food',
    type: 'Consumable',
    power: 0,
  }, {
    id: 'grenade',
    name: 'Grenade',
    type: 'Consumable',
    power: 0,
  }, {
    id: 'he-grenade',
    name: 'HE Granade',
    type: 'Consumable',
    power: 0,
  }, {
    id: 'hiking-boots',
    name: 'Hiking Boots',
    type: 'Footgear',
    power: 0,
  }, {
    id: 'jeans',
    name: 'Jeans',
    type: 'Bottoms',
    power: 0,
  }, {
    id: 'm4',
    name: 'M4',
    type: 'Ranged',
    power: 0,
  }, {
    id: 'machete',
    name: 'Machete',
    type: 'Melee',
    power: 0,
  }, {
    id: 'medic-kit',
    name: 'Medic Kit',
    type: 'Modkit',
    power: 0,
  }, {
    id: 'mp5k',
    name: 'MP5K',
    type: 'Ranged',
    power: 0,
  }, {
    id: 'running-shoes',
    name: 'Running Shoes',
    type: 'Footgear',
    power: 0,
  }, {
    id: 'sawed-off',
    name: 'Sawed-Off',
    type: 'Ranged',
    power: 0,
  }, {
    id: 'sneakers',
    name: 'Sneakers',
    type: 'Footgear',
    power: 0,
  }, {
    id: 't-shirt',
    name: 'T-Shirt',
    type: 'Tops',
    power: 0,
  }, {
    id: 'wind-jacket',
    name: 'Wind Jacket',
    type: 'Tops',
    power: 0,
  }
]

export const createItem = (owned) => {
  owned = false
  item = randomItem(items)
  chance = randomInteger(0, 1000)
  if (chance >= 0 && chance <= 5) {
    item.rarity = 'Legendary'
    item.power = randomInteger(item.power+64, item.power+128)
    item.value = Math.floor(item.power * 16)
  } else if (chance > 5 && chance <= 50) {
    item.rarity = 'Epic'
    item.power = randomInteger(item.power+28, item.power+64)
    item.value = Math.floor(item.power * 8)
  } else if (chance > 50 && chance <= 350) {
    item.rarity = 'Rare'
    item.power = randomInteger(item.power+8, item.power+28)
    item.value = Math.floor(item.power * 4)
  }
  else {
    item.rarity = 'Common'
    item.power = randomInteger(item.power, item.power+8)
    item.value = Math.floor(item.power * 1.5)
  }
  item.uid = Date.now()
  item.owned = owned
  return item
}