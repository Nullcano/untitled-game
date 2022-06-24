export const data = {
  player: {
    new: true,
    name: 'Playername',
    remainingEnemies: 4,
    wave: 1,
    health: 100,
    maxHealth: 100,
    level: 1,
    exp: 0,
    nextLevel: 100,
    coins: 0,
    attack: 1,
    magic: 1,
    lifesteal: 0,
    critical: 0,
    flame: 0,
    chance: 0,
    fortune: 1,
    wisdom: 1,
    equippedItems: [],
    equippedWeapons: [],
  },
  currentWave: [],
  items: [
    {
      id: 'crown-coin',
      name: 'Crown Coin',
      description: 'You got a 50% chance to double any money rewards.',
      cost: 8,
    }, {
      id: 'knowledge-scroll',
      name: 'Knowledge Scroll',
      description: 'You got a 50% chance to double any experience gain.',
      cost: 8,
    }, {
      id: 'watchtower',
      name: 'Watchtower',
      description: 'You got a 50% chance to double any damage dealt.',
      cost: 8,
    }, {
      id: 'devil-horns',
      name: 'Devil Horns',
      description: 'You got a 50% chance to heal back any damage dealt as health.',
      cost: 8,
    }, {
      id: 'turret',
      name: 'Turret',
      description: 'You got a 50% chance to double all damage.',
    }
  ],
};