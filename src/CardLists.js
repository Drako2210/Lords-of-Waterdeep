export const buildingCardsList = [
  {
    id: 0,
    name: "Helmstar Warehouse",
    cost: 3,
    victorypoints:1,
    playerReward: [
      0, 0, 2, 0, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    ownerReward: [0, 0, 1, 0, 0, 0],
    owner: null,
    instantEffect: [],
    occupied: null,
  },
  {
    id: 1,
    name: "House Of The Moon",
    cost: 3,
    victorypoints:1,
    playerReward: [
      1, 0, 0, 0, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    ownerReward: [0, 0, 0, 0, 2, 0],
    owner: null,
    instantEffect: ["chooseQuestCard"],
    occupied: null,
  },
  {
    id: 2,
    name: "The Tower Of Luck",
    cost: 8,
    victorypoints:1,
    playerReward: [
      1, 0, 2, 0, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    ownerReward: [1, 0, 1, 0, 0, 0],
    owner: null,
    instantEffect: [],
    occupied: null,
  },
  {
    id: 3,
    name: "The Skulkway",
    cost: 4,
    victorypoints:1,
    playerReward: [
      0, 1, 1, 0, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    ownerReward: [0, 1, 1, 0, 0, 0],
    owner: null,
    instantEffect: [],
    occupied: null,
  },
  {
    id: 4,
    name: "New Olamn",
    cost: 8,
    victorypoints:1,
    playerReward: [
      0, 0, 2, 1, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    ownerReward: [0, 0, 1, 1, 0, 0],
    owner: null,
    instantEffect: [],
    occupied: null,
  },
  {
    id: 5,
    name: "Fetlock Court",
    cost: 8,
    victorypoints:1,
    playerReward: [
      0, 2, 0, 1, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    ownerReward: [0, 1, 0, 1, 0, 0],
    owner: null,
    instantEffect: [],
    occupied: null,
  },
  {
    id: 6,
    name: "House Of Heroes",
    cost: 8,
    victorypoints:1,
    playerReward: [
      1, 2, 0, 0, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    ownerReward: [1, 1, 0, 0, 0, 0],
    owner: null,
    instantEffect: [],
    occupied: null,
  },
];
export const buildingList = [
  {
    id: 0,
    name: "Cliffwatch Inn 1",
    reward: [0, 0, 0, 0, 2, 0],
    instantEffect: ["chooseQuestCard"],
    occupied: null, // QuestCard nehmen
  },
  {
    id: 1,
    name: "Cliffwatch Inn 2",
    reward: [0, 0, 0, 0, 0, 0],
    instantEffect: ["chooseQuestCard"],
    occupied: null, // QuestCard nehmen und IntrigueCard ziehen
  },
  {
    id: 2,
    name: "Cliffwatch Inn 3",
    reward: [0, 0, 0, 0, 0, 0],
    instantEffect: ["resetQuestCards", "chooseQuestCard"],
    occupied: null, // reset aller offeniegenden QuestCards
  },
  {
    id: 3,
    name: "Grinning Lion Tavern",
    reward: [0, 0, 2, 0, 0, 0],
    instantEffect: [],
    occupied: null,
  },
  {
    id: 4,
    name: "The Plinth",
    reward: [1, 0, 0, 0, 0, 0],
    instantEffect: [],
    occupied: null,
  },
  {
    id: 5,
    name: "Aurora's Realms Shop",
    reward: [0, 0, 0, 0, 4, 0],
    instantEffect: [],
    occupied: null,
  },
  {
    id: 6,
    name: "Builder's Hall",
    reward: [0, 0, 0, 0, 0, 0],
    instantEffect: ["buyBuilding"],
    occupied: null, // build a building
  },
  {
    id: 7,
    name: "Castle Waterdeep",
    reward: [0, 0, 0, 0, 1, 0],
    instantEffect: ["setStartPlayer"],
    occupied: null, // IntrigueCard ziehen und Startspieler ändern
  },
  {
    id: 8,
    name: "Blackstaff Tower",
    reward: [0, 0, 0, 1, 0, 0],
    instantEffect: [],
    occupied: null,
  },

  {
    id: 9,
    name: "Field of Triumph",
    reward: [0, 2, 0, 0, 0, 0],
    instantEffect: [],
    occupied: null,
  },
];
export const intrigueCardsList = [];
export const questCardsList = [
  {
    id: 0,
    name: "Take Over Rival Organization",
    type: "Skullduggery",
    requirements: [
      0, 1, 2, 1, 6, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 4, 0, 0, 10,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 1,
    name: "Bolster City Guard",
    type: "Warfare",
    requirements: [
      0, 9, 2, 0, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 25,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 2,
    name: "Retrieve Ancient Artifacts",
    type: "Arcana",
    requirements: [
      0, 2, 1, 2, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 4, 11,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 3,
    name: "Domesticate Owlbears",
    type: "Arcana",
    requirements: [
      1, 0, 0, 2, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 1, 0, 0, 2, 8,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 4,
    name: "Host Festival For Sune",
    type: "Arcana",
    requirements: [
      0, 2, 0, 2, 4, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      2, 0, 0, 0, 0, 9,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 5,
    name: "Infiltrate Halaster's Circle",
    type: "Arcana",
    requirements: [
      0, 0, 0, 5, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 25,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 6,
    name: "Recruit For Blackstaff Academy",
    type: "Arcana",
    requirements: [
      0, 1, 1, 2, 4, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 3, 0, 6,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 7,
    name: "Recruit Paladins For Tyr",
    type: "Piety",
    requirements: [
      2, 4, 0, 0, 4, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      3, 0, 0, 0, 0, 10,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 8,
    name: "Perform The Penance Of Duty",
    type: "Piety",
    requirements: [
      2, 2, 0, 0, 4, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      1, 1, 0, 0, 0, 12,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 9,
    name: "Heal Fallen Gray Hand Soldiers",
    type: "Piety",
    requirements: [
      2, 0, 0, 1, 4, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 6, 0, 0, 0, 6,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 10,
    name: "Eliminate Vampire Coven",
    type: "Piety",
    requirements: [
      2, 2, 1, 0, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 4, 11,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 11,
    name: "Seal Gate To Cyric's Realm",
    type: "Piety",
    requirements: [
      2, 0, 3, 0, 4, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 20,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 12,
    name: "Spy On The House Of Light",
    type: "Commerce",
    requirements: [
      1, 0, 3, 1, 8, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 25,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 13,
    name: "Thin The City Watch",
    type: "Commerce",
    requirements: [
      1, 1, 1, 0, 4, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 4, 0, 0, 9,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 14,
    name: "Expose Cult Corruption",
    type: "Skullduggery",
    requirements: [
      1, 0, 4, 0, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      2, 0, 0, 0, 0, 4,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 15,
    name: "Raid On Undermountain",
    type: "Skullduggery",
    requirements: [
      1, 2, 4, 1, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 2, 20,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 16,
    name: "Establish Shadow Thieves' Guild",
    type: "Skullduggery",
    requirements: [
      0, 1, 8, 1, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 25,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 17,
    name: "Confront The Xanathar",
    type: "Warfare",
    requirements: [
      1, 4, 2, 1, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 2, 20,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 18,
    name: "Deliver An Ultimatum",
    type: "Warfare",
    requirements: [
      0, 4, 1, 1, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 4, 11,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 19,
    name: "Train Bladesingers",
    type: "Warfare",
    requirements: [
      0, 3, 0, 1, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 1, 0, 1, 0, 4,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 20,
    name: "Raid Orc Stronghold",
    type: "Warfare",
    requirements: [
      0, 4, 2, 0, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 4, 8,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 21,
    name: "Defeat Uprising From Undermountain",
    type: "Warfare",
    requirements: [
      1, 3, 1, 0, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 2, 0, 0, 0, 11,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 22,
    name: "Ambush Artor Morlin",
    type: "Warfare",
    requirements: [
      1, 3, 1, 0, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 4, 8,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 23,
    name: "Deliver Weapons To Selune's Temple",
    type: "Warfare",
    requirements: [
      0, 4, 1, 1, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      2, 0, 0, 0, 0, 9,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 24,
    name: "Repel Seawraiths",
    type: "Warfare",
    requirements: [
      1, 4, 0, 1, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 2, 15,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 25,
    name: "Safeguard Eltorchul Mage",
    type: "Commerce",
    requirements: [
      0, 1, 1, 1, 4, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 2, 0, 4,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
  {
    id: 26,
    name: "test quest",
    type: "Commerce",
    requirements: [
      0, 0, 0, 0, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: [],
    passiveEffect: {},
  },
];


