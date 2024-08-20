export const buildingCardsList = [
  {
    id: 0,
    cost: 8,
    victorypoints:0,
    playerReward: [
      0, 0, 2, 0, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    ownerReward: [0, 0, 1, 0, 0, 0],
    owner: null,
  },
  {
    id: 1,
    cost: 8,
    victorypoints:0,
    playerReward: [
      0, 0, 2, 0, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    ownerReward: [0, 0, 1, 0, 0, 0],
    owner: null,
  },
  {
    id: 2,
    cost: 8,
    victorypoints:0,
    playerReward: [
      0, 0, 2, 0, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    ownerReward: [0, 0, 1, 0, 0, 0],
    owner: null,
  },
  {
    id: 3,
    cost: 8,
    victorypoints:0,
    playerReward: [
      0, 0, 2, 0, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    ownerReward: [0, 0, 1, 0, 0, 0],
    owner: null,
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
    name: "Waterdeep Harbor",
    reward: [0, 0, 0, 0, 0, 0],
    instantEffect: [], //intrigue card playn
    occupied: null, // besonders
  },
  {
    id: 8,
    name: "Castle Waterdeep",
    reward: [0, 0, 0, 0, 0, 0],
    instantEffect: [],
    occupied: null, // IntrigueCard ziehen und Startspieler ändern
  },
  {
    id: 9,
    name: "Blackstaff Tower",
    reward: [0, 0, 0, 1, 0, 0],
    instantEffect: [],
    occupied: null,
  },

  {
    id: 10,
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
    type: "Arcana",
    requirements: [
      1, 1, 2, 2, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 20,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"],
    passiveEffect: {},
  },
  {
    id: 1,
    type: "Skullduggery",
    requirements: [
      0, 0, 3, 0, 6, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 8,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"], //eigentlich zweimal
    passiveEffect: {},
  },
  {
    id: 2,
    type: "Skullduggery",
    requirements: [
      0, 0, 3, 0, 6, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 8,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"], //eigentlich zweimal
    passiveEffect: {},
  },
  {
    id: 3,
    type: "Skullduggery",
    requirements: [
      0, 0, 3, 0, 6, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 8,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"], //eigentlich zweimal
    passiveEffect: {},
  },
  {
    id: 4,
    type: "Skullduggery",
    requirements: [
      0, 0, 3, 0, 6, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 8,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"], //eigentlich zweimal
    passiveEffect: {},
  },
  {
    id: 5,
    type: "Skullduggery",
    requirements: [
      0, 0, 3, 0, 6, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 8,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"], //eigentlich zweimal
    passiveEffect: {},
  },
  {
    id: 6,
    type: "Skullduggery",
    requirements: [
      0, 0, 3, 0, 6, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 8,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"], //eigentlich zweimal
    passiveEffect: {},
  },
  {
    id: 7,
    type: "Skullduggery",
    requirements: [
      0, 0, 3, 0, 6, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 8,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"], //eigentlich zweimal
    passiveEffect: {},
  },
  {
    id: 8,
    type: "Skullduggery",
    requirements: [
      0, 0, 3, 0, 6, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 8,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"], //eigentlich zweimal
    passiveEffect: {},
  },
  {
    id: 9,
    type: "Skullduggery",
    requirements: [
      0, 0, 3, 0, 6, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 8,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"], //eigentlich zweimal
    passiveEffect: {},
  },
  {
    id: 10,
    type: "Arcana",
    requirements: [
      1, 1, 2, 2, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 20,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"],
    passiveEffect: {},
  },
  {
    id: 11,
    type: "test",
    requirements: [
      1, 1, 2, 2, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 20,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"],
    passiveEffect: {},
  },
  {
    id: 12,
    type: "test2",
    requirements: [
      1, 1, 2, 2, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 20,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"],
    passiveEffect: {},
  },
  {
    id: 13,
    type: "test3",
    requirements: [
      1, 1, 2, 2, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 20,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"],
    passiveEffect: {},
  },
  {
    id: 14,
    type: "paul",
    requirements: [
      1, 1, 2, 2, 2, 0,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    rewards: [
      0, 0, 0, 0, 0, 20,
    ] /*white, orange, black, purple, gold, victorypoints*/,
    //open: false,
    solved: false,
    instantEffect: ["drawIntrigueCard"],
    passiveEffect: {},
  },
];

