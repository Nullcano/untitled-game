import { randomItem, randomItems, randomInteger, formatNumber } from './utils.js'

let item, chance, name, rarity, attribute, value, owned

let rarities = ['Common', 'Rare', 'Epic', 'Legendary']

let attributes = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']

let types = [
  'Dagger', 'Knife', 'Shortsword', 'Longsword', 'Tomahawk', 'Axe', 'Battleaxe', 'Flail', 'Mace', 'Sling', 'Bow', 'Crossbow', 'Staff', 'Wand', 'Spellbook', 'Potion', 'Scroll',
  'Spear', 'Polearm', 'Pistol', 'Rifle', 'Shotgun', 'Pickaxe', 'Sickle', 'Hammer', 'Warhammer',
  'Hood', 'Helmet', 'Shirt', 'Cloak', 'Cape', 'Robe', 'Coat', 'Chestplate', 'Pants', 'Leggings', 'Shoes', 'Gloves', 'Shield', 'Boots', 'Ring', 'Amulet', 'Necklace', 'Bracelet',
]

export const createItem = (owned) => {
  owned = false
  item = {}
  chance = randomInteger(1, 100)
  console.log(chance)
  name = randomItem(types)
  rarity = randomItem(rarities)
  attribute = randomItem(attributes)
  value = randomInteger(16, 128)
  item.name = name
  item.attribute = attribute
  item.value = value
  if (chance == 1) {
    item.rarity = 'Legendary'
    item.value = item.value * 8
  } else if (chance > 1 && chance <= 10) {
    item.rarity = 'Epic'
    item.value = item.value * 4
  } else if (chance > 10 && chance <= 50) {
    item.rarity = 'Rare'
    item.value = item.value * 2
  }
  else {
    item.rarity = 'Common'
  }
  item.owned = owned
  return item
}