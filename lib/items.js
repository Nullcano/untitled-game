import { randomItem, randomItems, randomInteger, formatNumber } from './utils.js'
import { player } from './player.js'

let item
const prefixes = ['Volt', 'Tidal', 'Pyro', 'Foliage']

const items = [
  { name: 'Sword', slot: 'Primary' },
  { name: 'Bow', slot: 'Primary' },
  { name: 'Axe', slot: 'Primary' },
  { name: 'Mace', slot: 'Primary' },
  { name: 'Spear', slot: 'Primary' },
  { name: 'Wand', slot: 'Primary' },
  { name: 'Staff', slot: 'Primary' },
  { name: 'Rifle', slot: 'Primary' },
  { name: 'Shield', slot: 'Secondary' },
  { name: 'Buckler', slot: 'Secondary' },
  { name: 'Book', slot: 'Secondary' },
  { name: 'Orb', slot: 'Secondary' },
  { name: 'Tome', slot: 'Secondary' },
  { name: 'Dagger', slot: 'Secondary' },
  { name: 'Pistol', slot: 'Secondary' },
  { name: 'Torch', slot: 'Secondary' },
  { name: 'Helmet', slot: 'Headwear' },
  { name: 'Hat', slot: 'Headwear' },
  { name: 'Headband', slot: 'Headwear' },
  { name: 'Mask', slot: 'Headwear' },
  { name: 'Crown', slot: 'Headwear' },
  { name: 'Tiara', slot: 'Headwear' },
  { name: 'Circlet', slot: 'Headwear' },
  { name: 'Visor', slot: 'Headwear' },
  { name: 'Armor', slot: 'Torso' },
  { name: 'Chestplate', slot: 'Torso' },
  { name: 'Shirt', slot: 'Torso' },
  { name: 'Tunic', slot: 'Torso' },
  { name: 'Robe', slot: 'Torso' },
  { name: 'Vest', slot: 'Torso' },
  { name: 'Jacket', slot: 'Torso' },
  { name: 'Cloak', slot: 'Torso' },
  { name: 'Gauntlets', slot: 'Hands' },
  { name: 'Gloves', slot: 'Hands' },
  { name: 'Handwraps', slot: 'Hands' },
  { name: 'Claws', slot: 'Hands' },
  { name: 'Ring', slot: 'Hands' },
  { name: 'Bracelet', slot: 'Hands' },
  { name: 'Armband', slot: 'Hands' },
  { name: 'Wrist Guards', slot: 'Hands' },
  { name: 'Leggings', slot: 'Legs' },
  { name: 'Pants', slot: 'Legs' },
  { name: 'Shorts', slot: 'Legs' },
  { name: 'Trousers', slot: 'Legs' },
  { name: 'Legwraps', slot: 'Legs' },
  { name: 'Greaves', slot: 'Legs' },
  { name: 'Breeches', slot: 'Legs' },
  { name: 'Shin Guards', slot: 'Legs' },
  { name: 'Boots', slot: 'Footwear' },
  { name: 'Shoes', slot: 'Footwear' },
  { name: 'Sandals', slot: 'Footwear' },
  { name: 'Slippers', slot: 'Footwear' },
  { name: 'Loafers', slot: 'Footwear' },
  { name: 'Sneakers', slot: 'Footwear' },
  { name: 'High-Tops', slot: 'Footwear' },
  { name: 'Clogs', slot: 'Footwear' },
  { name: 'Potion', slot: 'Consumable' },
  { name: 'Elixir', slot: 'Consumable' },
  { name: 'Fruit', slot: 'Consumable' },
  { name: 'Bread', slot: 'Consumable' },
  { name: 'Wine', slot: 'Consumable' },
  { name: 'Ale', slot: 'Consumable' },
  { name: 'Booster', slot: 'Consumable' },
  { name: 'Scroll', slot: 'Consumable' },
]

export const createItem = (owned) => {
  owned = false
  item = randomItem(items)
  item.prefix = randomItem(prefixes)
  let newName = item.prefix + ' ' + item.name
  item.name = newName
  item.power = randomInteger(player.level, (player.level + 10))
  item.uid = Date.now()
  item.owned = owned
  return item
}