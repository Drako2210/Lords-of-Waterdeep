/** @import { Game } from "boardgame.io" */
import { INVALID_MOVE } from "boardgame.io/core";
import {
  buildingCardsList,
  buildingList,
  intrigueCardsList,
  questCardsList,
} from "./CardLists.js";

/*function drawIntrigueCard(playerId) {
  while (true){
    let chosen = Math.floor(Math.random * intrigueList.length) //Chosen wird auf nummer zwischen 0 und letztem element aus questList[] festgelegt

    
    if (intrigueList[chosen].open == false){
      p
      intrigueList[chosen].open = true
      break
  
    }
  }
}*/

function startAgents(numberPlayers) {
  if (numberPlayers == 2) {
    return 4;
  }
  if (numberPlayers == 3) {
    return 3;
  }
  if (numberPlayers == 4 || numberPlayers == 5) {
    return 2;
  }
}

function drawQuestCard(questCardsDeck) {
  return questCardsDeck.shift();
}
function drawIntrigueCard(players, id, intrigueCardsDeck) {
  //return intrigueCardsDeck.shift();
  players[id].intrigueCards.push(intrigueCardsDeck.shift());
}
function drawBuildingCard(buildingCardsDeck) {
  return buildingCardsDeck.shift();
}
function openQuestCard() {}

/*while (true){
    let chosen = Math.floor(Math.random * questList.length) //Chosen wird auf nummer zwischen 0 und letztem element aus questList[] festgelegt

    
    if (questList[chosen].open == false){
      questDeck.push[questList[chosen]]
      questList[chosen].open = true
      break
  }*/

/*class QuestCard{
  constructor(id,type,requirements){
    this.id=id
    this.type=type
    this.requirements=requirements
    this.open=false


  }
}
  */
function placeAgent(move, buildingType, plotId) {
  // Check if player has Agents
  if (move.G.players[move.playerID].leftAgents != 0) {
    //if(buildingType=="nonPlayer"){}
    // Agent auf nonPlayer Building placen
    if (
      buildingType == "nonPlayer" &&
      move.G.buildingList[plotId].occupied == null
    ) {
      move.G.buildingList[plotId].occupied = move.playerID;
      for (let i = 0; i <= 5; i++)
        move.G.players[move.playerID].resources[i] +=
          move.G.buildingList[plotId].reward[i];
      move.G.players[move.playerID].leftAgents -= 1;
      //move.events.setStage(completeQuest)
    }
  } else {
    move.events.endTurn();
  }
}
function completeQuest(move, questPosition) {
  for (let i = 0; i <= 4; i++) {
    if (
      move.G.players[move.playerID].resources[i] <
      move.G.players[move.playerID].quests[questPosition].requirements[i]
    ) {
      return INVALID_MOVE;
    } else {
      move.G.players[move.playerID].resources[i] -=
        move.G.players[move.playerID].quests[questPosition].requirements[i];
      move.G.players[move.playerID].resources[i] +=
        move.G.players[move.playerID].quests[questPosition].reward[i];
    }
  }

  move.G.players[move.playerID].solvedQuests.push(
    move.G.players[move.playerID].quests.splice(questPosition, 1)[0],
  );

  // instant effects
}

/** @type {Game} */
export const LordsOfWaterdeep = {
  setup: (setup) => {
    let players = {};
    let startPlayer = 0;
    let roundCounter = 0;
    let a = setup.random.Number() * setup.ctx.numPlayers;
    if (a >= 0 && a <= 1) {
      startPlayer = 0;
    }
    if (a > 1 && a <= 2) {
      startPlayer = 1;
    }
    if (a > 2 && a <= 3) {
      startPlayer = 2;
    }
    if (a > 3 && a <= 4) {
      startPlayer = 3;
    }
    if (a > 4 && a <= 5) {
      startPlayer = 4;
    }
    let playerColors = ["Yellow", "Blue", "Red", "Green", "Black"];
    for (let i = 0; i <= setup.ctx.numPlayers - 1; i++) {
      players[i] = {
        playerColor: playerColors[i],
        maxAgents: startAgents(setup.ctx.numPlayers),
        leftAgents: startAgents(setup.ctx.numPlayers),
        /* victorypoints: 0,
        white: 0,
        orange: 0,
        black: 0,
        purple: 0, */
        resources: [
          0,
          0,
          0,
          0,
          4 + (Math.abs(i - startPlayer) % setup.ctx.numPlayers),
          0,
        ],
        /*white, orange, black, purple, gold, victorypoints*/
        /* gold: 4 + ((i - startPlayer) % setup.ctx.numPlayers), */
        quests: [],
        solvedQuests: [],
        intrigueCards: [],
        buildingAmount: 0,
      };
    }

    let buildingCardsDeck = setup.random.Shuffle(buildingCardsList);
    let intrigueCardsDeck = setup.random.Shuffle(intrigueCardsList);
    let questCardsDeck = setup.random.Shuffle(questCardsList);
    for (let i = 0; i <= setup.ctx.numPlayers - 1; i++) {
      players[i].quests.push(drawQuestCard(questCardsDeck));
      players[i].quests.push(drawQuestCard(questCardsDeck));

      drawIntrigueCard(players, i, intrigueCardsDeck);

      drawIntrigueCard(players, i, intrigueCardsDeck);
    }
    //console.log(setup.ctx.numPlayers);
    //console.log(setup);

    /*let openedQuestCards = {
      quest1: drawQuestCard(questCardsDeck),
      quest2: drawQuestCard(questCardsDeck),
      quest3: drawQuestCard(questCardsDeck),
      quest4: drawQuestCard(questCardsDeck),
    };*/

    let openedQuestCards = [
      drawQuestCard(questCardsDeck),
      drawQuestCard(questCardsDeck),
      drawQuestCard(questCardsDeck),
      drawQuestCard(questCardsDeck),
    ];
    let openedBuildings = [
      drawBuildingCard(buildingCardsDeck),
      drawBuildingCard(buildingCardsDeck),
      drawBuildingCard(buildingCardsDeck),
    ];
    let buildingPlots = [];
    for (let i = 0; i <= 9; i++) {
      buildingPlots[i] = {
        building: null,
      };
    }
    console.log(players[0].leftAgents);
    let gamestate = {
      players: players,
      startPlayer: startPlayer,
      buildingList: buildingList,
      buildingCardsDeck: buildingCardsDeck,
      buildingCardsList: buildingCardsList,
      intrigueCardsList: intrigueCardsList,
      questCardsDeck: questCardsDeck,
      questCardsList: questCardsList,
      intrigueCardsDeck: intrigueCardsDeck,
      openedQuestCards: openedQuestCards,
      openedBuildings: openedBuildings,
      roundCounter: roundCounter,
    };
    return gamestate;

    //questList[0].instantEffect(ahfkwf)
  },
  moves: {
    placeAgent,
  },

  turn: {
    //order: TurnOrder.DEFAULT,
    stages: {
      completeQuest: {
        moves: { completeQuest },
      },
    },

    /*    onBegin: (onBegin) => {},
    onEnd: (onEnd) => {},

    minMoves: 1,
    maxMoves: 1, */
  },

  minPlayers: 2,
  maxPlayers: 5,

  disableUndo: true,

  // endIf: (endIf) => {},
};
