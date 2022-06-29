import { randomItem, randomItems, randomInteger, formatNumber } from './lib/utils.js'
import { data } from './data.js'
import { createItem } from './lib/items.js'
import { animals } from './lib/farm.js'
import { normalEnemies, eliteEnemies, bossEnemies } from './lib/enemies.js'

const usernameDisplay = document.querySelectorAll('.username')
const levelDisplay = document.querySelectorAll('.level-display')
const enemyKills = document.querySelector('.enemies-left')
const activeDamageDisplay = document.querySelector('.active-damage')
const passiveDamageDisplay = document.querySelector('.passive-damage')
const auraDamageDisplay = document.querySelector('.aura-damage')

const enemyContainer = document.querySelector('.enemy-container')

let player = data.player
let currentWave = data.currentWave
let items = data.items
let inventory = data.inventory
let vault = data.vault
let currentEnemy, tradeActive

let activeAttackInterval, bossRequirement, eliteRequirement, enemyAttackPlayer, enemyTarget, magicAttackEnemy

const updateEnemy = () => {
  enemyContainer.innerHTML = `
    <div class="enemy ${currentEnemy.type}" data-id="${currentEnemy.id}">
      <div class="enemy-name heading"><span class="enemy-type">${currentEnemy.type}</span> ${currentEnemy.name}</div>
      <progress class="enemy-healthbar" value="${currentEnemy.health}" max="${currentEnemy.maxHealth}"></progress>
      <div class="enemy-health">${Math.round(currentEnemy.health)}/${currentEnemy.maxHealth}</div>
      <div class="enemy-sprite" style="background-image: url('./images/enemies/${currentEnemy.id}.png')"></div>
    </div>
  `
  enemyTarget = document.querySelector('.enemy')
  enemyTarget.addEventListener('mousedown', startActiveAttack)
  enemyTarget.addEventListener('touchstart', startActiveAttack)
  enemyTarget.addEventListener('mouseup', stopActiveAttack)
  enemyTarget.addEventListener('mouseleave', stopActiveAttack)
  enemyTarget.addEventListener('mouseout', stopActiveAttack)
  enemyTarget.addEventListener('touchend', stopActiveAttack)
  enemyTarget.addEventListener('touchcancel', stopActiveAttack)
}

const startActiveAttack = () => {
  activeAttackInterval = window.setInterval(() => {
    attackEnemy()
  }, 100)
}

const stopActiveAttack = () => {
  window.clearInterval(activeAttackInterval)
}

const startDungeon = () => {
  if (player.new) {
    player.new = false
    usernameDisplay.forEach(username => username.textContent = player.name)
    updateEnemyRequirements()
    checkWave()
    newEnemy()
  } else {
    return
  }
}

const newEnemy = () => {
  if (player.remainingEnemies <= bossRequirement) {
    currentEnemy = randomItem(bossEnemies)
  } else if (player.remainingEnemies <= eliteRequirement) {
    currentEnemy = randomItem(eliteEnemies)
  } else {
    currentEnemy = randomItem(normalEnemies)
  }
  updateEnemy()
}

const checkWave = () => {
  if (player.remainingEnemies == 0) {
    player.wave++
    player.remainingEnemies = Math.ceil(player.wave * 2.5)
    updateEnemyRequirements()
  }
  updateWaveStatus()
}

const renderTrader = () => {
  let items = [createItem, createItem, createItem]
  document.querySelector('.shop').innerHTML = ''
  const trades = randomItems(items, 3)
  trades.forEach(trade => {
    document.querySelector('.shop').innerHTML += `
      <div class="item" data-id="${trade.id}">
        <div class="item-name">${trade.name}</div>
        <div class="item-sprite" style="background-image: url('./images/items/${trade.id}.png')"></div>
      </div>
    `
  })
  document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', (e) => {
      buyItem(e.target)
    })
  })
}

const buyItem = (target) => {
  const item = data.items.find(item => item.id == target.dataset.id)
  if (player.gold >= item.price) {
    player.gold -= item.price
    inventory.push(item)
    updateGold()
    updateInventory()
  }
}

const updateInventory = () => {
  document.querySelector('[data-tab="inventory"]').textContent = `Inventory [${inventory.length} / ${player.inventoryMax}]`
  document.querySelector('.inventory-items').innerHTML = ''
  inventory.forEach(item => {
    document.querySelector('.inventory-items').innerHTML += `
      <div class="item-card ${item.rarity}">
        <span class="item-name">${item.rarity} ${item.name}</span>
        <span class="item-price">${formatNumber(item.value)}</span>
      </div>
    `
  })
}

const attackEnemy = () => {
  if (currentEnemy.health <= 0) {
    currentEnemy.health = 0
    enemyKilled()
  } else {
    currentEnemy.health -= (player.attack / 2)
    updateEnemy()
  }
}

const enemyKilled = () => {
  player.exp += player.wave * 10
  updatePlayerExperience()
  checkLevel()
  player.coins += currentEnemy.maxHealth
  updatePlayerCoins()
  currentEnemy.deaths++
  currentEnemy.maxHealth = Math.floor(currentEnemy.maxHealth + (currentEnemy.deaths * 1.25))
  currentEnemy.health = currentEnemy.maxHealth
  player.remainingEnemies--
  checkWave()
  newEnemy()
}

const updateEnemyRequirements = () => {
  bossRequirement = (10 / 100) * player.remainingEnemies
  eliteRequirement = (33 / 100) * player.remainingEnemies
  console.log(bossRequirement, eliteRequirement)
}

const checkLevel = () => {
  if (player.exp >= player.nextLevel) {
    player.level++
    updatePlayerLevel()
    player.exp = 0
    updatePlayerExperience()
    player.nextLevel += Math.round(player.nextLevel / 2)
    player.attack += Math.round(player.attack / 2)
    player.magic += Math.round(player.magic / 2)
    player.maxHealth += Math.round(player.maxHealth / 2)
    updatePlayerStats()
    player.health = player.maxHealth
    updatePlayerHealth()
  }
}

const updatePlayerCoins = () => {
  document.querySelector('.coins-display').innerHTML = formatNumber(player.coins)
}
const updatePlayerGems = () => {
  document.querySelector('.gems-display').innerHTML = formatNumber(player.gems)
}
const updatePlayerExperience = () => {
  document.querySelector('.experience').value = player.exp
  document.querySelector('.experience').max = player.nextLevel
  document.querySelectorAll('.exp-display').forEach(el => el.textContent = `${player.exp} / ${player.nextLevel} XP`)
}

const updatePlayerLevel = () => {
  levelDisplay.forEach(el => el.textContent = player.level)
}

const updateWaveStatus = () => {
  document.querySelectorAll('.current-wave').forEach(el => el.textContent = player.wave)
  document.querySelectorAll('.enemies-left').forEach(el => el.textContent = player.remainingEnemies)
}

const updateJackpot = () => {

}

document.querySelector('#btn').addEventListener('click', () => {
  document.querySelector('.overlay').innerHTML = ''
  inventory.push(createItem(true))
  inventory.forEach(item => {
    document.querySelector('.overlay').innerHTML += `
      <div class="item-card ${item.rarity}">
        <span class="item-name">${item.rarity} ${item.name}</span>
        <span class="item-price">${formatNumber(item.value)}</span>
      </div>
    `
  })
  updateInventory()
})

window.onload = () => {
  startDungeon()
  updateInventory()
  updatePlayerCoins()
  updatePlayerExperience()
  updatePlayerLevel()
  renderTrader()
  updateJackpot()
}

// panels
document.querySelectorAll('[data-link]').forEach(link => {
  link.addEventListener('click', (e) => {
    openPage(e.target)
    e.target.classList.add('active')
  })
})
document.querySelectorAll('[data-tab]').forEach(link => {
  link.addEventListener('click', (e) => {
    openPanel(e.target)
    e.target.classList.add('active')
  })
})
const resetPages = () => {
  let pages = [...document.querySelectorAll('[data-page]')]
  let links = [...document.querySelectorAll('[data-link]')]
  pages.forEach(page => page.classList.remove('active'))
  links.forEach(link => link.classList.remove('active'))
}
const resetPanels = () => {
  let panels = [...document.querySelectorAll('[data-panel]')]
  let tabs = [...document.querySelectorAll('[data-tab]')]
  panels.forEach(panel => panel.classList.remove('active'))
  tabs.forEach(tab => tab.classList.remove('active'))
}
const openPage = (target) => {
  resetPages()
  let pages = [...document.querySelectorAll('[data-page]')]
  let page = pages.find(p => p.dataset.page === target.dataset.link)
  page.classList.add('active')
}

const openPanel = (target) => {
  resetPanels()
  let panels = [...document.querySelectorAll('[data-panel]')]
  let panel = panels.find(p => p.dataset.panel === target.dataset.tab)
  panel.classList.add('active')
}