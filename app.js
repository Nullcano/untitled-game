import { rooms } from './lib/rooms/index.js'
import { data } from './data.js'
import { items } from './lib/items.js'
import { animals } from './lib/farm.js'
import { normalEnemies, eliteEnemies, bossEnemies } from './lib/enemies.js'

const usernameDisplay = document.querySelector('.username')
const levelDisplay = document.querySelector('.level')
const enemyKills = document.querySelector('.enemies-left')
const activeDamageDisplay = document.querySelector('.active-damage')
const passiveDamageDisplay = document.querySelector('.passive-damage')
const auraDamageDisplay = document.querySelector('.aura-damage')

const enemyContainer = document.querySelector('.enemy-container')

let player = data.player
let currentWave = data.currentWave
let currentEnemy, tradeActive

const randomItem = (arr) => arr[(Math.random() * arr.length) | 0]
const randomItems = (arr, count) => arr.concat().reduce((p, _, __, arr) => (p[0] < count ? [p[0] + 1, p[1].concat(arr.splice((Math.random() * arr.length) | 0, 1))] : p), [0, []])[1]
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

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
    usernameDisplay.textContent = player.name
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
    player.inventory.push(item)
    updateGold()
    updateInventory()
  }
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

const formatCoins = (money) => {
  let copper = Math.floor(money % 100)
  let silver = Math.floor(money / 100) % 100
  let gold = Math.floor(money / 10000)
  return `
    <span class="coins">
      <span class="coin gold">⬤</span> ${formatNumber(gold)}
      <span class="coin silver">⬤</span> ${silver}
      <span class="coin copper">⬤</span> ${copper}
    </span>
  `
}

const formatNumber = (number) => {
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

const updatePlayerCoins = () => {
  document.querySelector('.current-coins').innerHTML = formatCoins(player.coins)
}

const updatePlayerExperience = () => {
  document.querySelector('.experience').value = player.exp
  document.querySelector('.experience').max = player.nextLevel
}

const updatePlayerLevel = () => {
  document.querySelector('.level').textContent = `Lvl. ${player.level}`
}

const updateWaveStatus = () => {
  document.querySelector('.current-wave').textContent = `Wave ${player.wave}`
  document.querySelector('.enemies-left').textContent = `${player.remainingEnemies} left`
}

const updateJackpot = () => {
  document.querySelector('.jackpot').innerHTML = ``
  animals.forEach(animal => {
    document.querySelector('.jackpot').innerHTML += `
      <div class="animal" data-id="${animal.id}">
        <div class="animal-sprite" style="background-image: url('./images/animals/${animal.id}.png')"></div>
        <div class="animal-name">${animal.name}</div>
        <div class="description">Produces ${animal.level} ${animal.item} every 5 seconds</div>
        <div class="animal-price">${formatCoins(animal.price)}</div>
      </div>
    `
  })
  document.querySelectorAll('.animal').forEach(animal => {
    animal.addEventListener('click', (e) => {
      buyAnimal(e.target)
    })
  })
}

const initCrate = () => {
  let item
  document.querySelector('#btn').addEventListener('click', () => {
    render()
  })

  let common = items.find(item => item.rarity === 'Common')
  let rare = items.find(item => item.rarity === 'Rare')
  let epic = items.find(item => item.rarity === 'Epic')
  let legendary = items.find(item => item.rarity === 'Legendary')

  function render() {
    for (let i = 0; i < 60; i++) {
      var num = randomInteger(1,100)
      if (num == 1) {
        item = legendary
      } else if (num >= 2 && num <= 16) {
        item = epic
      } else if (num >= 17 && num <= 49) {
        item = rare
      } else if (num >= 50 && num <= 100) {
        item = common
      }
    }
    document.querySelector('.overlay').innerHTML = `
      <div class="swiper-slide">
        <span class='${item.rarity}'>${item.name}</span>
      </div>
    `
    console.log(item)
  }
}

(() => {
  startDungeon()
  updatePlayerCoins()
  updatePlayerExperience()
  updatePlayerLevel()
  renderTrader()
  initCrate()
  updateJackpot()
})()

// panels
document.querySelectorAll('[data-link]').forEach(link => {
  link.addEventListener('click', (e) => {
    openPage(e.target)
    e.target.classList.add('active')
  })
})

const resetRoutes = () => {
  let pages = [...document.querySelectorAll('[data-page]')]
  let links = [...document.querySelectorAll('[data-link]')]
  pages.forEach(page => page.classList.remove('active'))
  links.forEach(link => link.classList.remove('active'))
}

const openPage = (target) => {
  resetRoutes()
  let pages = [...document.querySelectorAll('[data-page]')]
  let page = pages.find(page => page.dataset.page === target.dataset.link)
  page.classList.add('active')
}