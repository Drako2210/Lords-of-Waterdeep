/** @import { Game } from "boardgame.io" */
import { INVALID_MOVE, TurnOrder } from "boardgame.io/core";
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
function drawIntrigueCard(move, id, intrigueCardsDeck) {
  //return intrigueCardsDeck.shift();
  //move.G.players[id].intrigueCards.push(intrigueCardsDeck.shift());
}
function drawBuildingCard(buildingCardsDeck) {
  return buildingCardsDeck.shift();
}
//function openQuestCard() {}

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
function endRound(move) {
  let a = true;
  for (let i = 0; i <= move.ctx.numPlayers - 1; i++) {
    if (move.G.players[i].leftAgents != 0) {
      a = false;
    }
  }

  if (a == true) {
    for (let i = 0; i <= move.G.buildingList.length - 1; i++) {
      move.G.buildingList[i].occupied = null;
      //console.log(move.G.buildingList[i].occupied);
    }
    for (let i = 0; i <= move.ctx.numPlayers - 1; i++) {
      //console.log(move.G.players[i].maxAgents)
      move.G.players[i].leftAgents = move.G.players[i].maxAgents;
    }
    move.G.roundCounter += 1;
    if (move.G.roundCounter == 5) {
      for (let i = 0; i <= move.ctx.numPlayers - 1; i++) {
        move.G.players[i].maxAgents += 1;
      }
    }

    for (let i = 0; i <= 2; i++) {
      if (move.G.openedBuildings[i] == null) {
        move.G.openedBuildings[i] = drawBuildingCard(move.G.buildingCardsDeck);
      }
      move.G.openedBuildings[i].victorypoints += 1;
      // als instant rewards noch hinzufügen
    }
  }
}
function placeAgent(move, buildingType, plotId) {
  const instantEffects = [
    {
      name: "resetQuestCards",
      effect: function resetQuestCards(move) {
        move.G.openedQuestCards = [
          drawQuestCard(move.G.questCardsDeck),
          drawQuestCard(move.G.questCardsDeck),
          drawQuestCard(move.G.questCardsDeck),
          drawQuestCard(move.G.questCardsDeck),
        ];
      },
    },
    {
      name: "chooseQuestCard", //player action
      effect: function canChooseQuestCards(move) {
        move.events.setStage("chooseQuestCard");
      },
    },
    { name: "setStartPlayer", effect: function resetQuestCards(move) {
      move.G.startPlayer = move.playerID
    } },
    { name: "drawIntrigueCard", effect: function resetQuestCards(move) {} },
    {
      name: "playIntrigueCard", //player action
      effect: function resetQuestCards(move) {},
    },
    {
      name: "buyBuilding", //player action
      effect: function canBuyBuilding(move) {
        move.events.setStage("buyBuilding");
      },
    },
  ];
  // Check if player has Agents

  if (move.G.players[move.playerID].leftAgents != 0) {
    //if(buildingType=="nonPlayer"){}
    // Agent auf nonPlayer Building placen
    if (
      buildingType == "nonPlayer" &&
      move.G.buildingList[plotId].occupied == null
    ) {
      move.G.buildingList[plotId].occupied = move.playerID;
      for (let i = 0; i <= 5; i++) {
        move.G.players[move.playerID].resources[i] +=
          move.G.buildingList[plotId].reward[i];
      }

      if (move.G.buildingList[plotId].instantEffect[0] == undefined) {
        move.events.setStage("completeQuest");
      }
      //alle möglichen building instant effects mit name und inhalt der Funktion

      for (let i = 0; i <= instantEffects.length - 1; i++) {
        if (
          move.G.buildingList[plotId].instantEffect.includes(
            instantEffects[i].name
          )
        ) {
          instantEffects[i].effect(move);
        }
      }
      move.G.players[move.playerID].leftAgents -= 1;
      //move.events.setStage('completeQuest')
    }
    //Player Buildings
    else if(buildingType == "player" &&
      move.G.buildingPlots[plotId].occupied == null
    ){
      move.G.buildingPlots[plotId].occupied = move.playerID;
      for (let i = 0; i <= 5; i++) {
        /* move.G.players[move.playerID].resources[i] -=
          move.G.buildingPlots[plotId].playCost[i]; */
        move.G.players[move.playerID].resources[i] +=
          move.G.buildingPlots[plotId].building.playerReward[i];
        move.G.players[move.G.buildingPlots[plotId].building.owner].resources[i] +=
          move.G.buildingPlots[plotId].building.ownerReward[i];
          
      }

      if (move.G.buildingPlots[plotId].building.instantEffect[0] == undefined) {

        move.events.setStage("completeQuest");
      }
      //alle möglichen building instant effects mit name und inhalt der Funktion

      for (let i = 0; i <= instantEffects.length - 1; i++) {
        if (
          move.G.buildingCardsList[plotId].instantEffect.includes(
            instantEffects[i].name
          )
        ) {
          instantEffects[i].effect(move);
        }
      }
      move.G.players[move.playerID].leftAgents -= 1;
      //move.events.setStage('completeQuest') 
    }
   else {
    move.events.endTurn();
  }
}
}
function buyBuilding(move, plotId) {
  //wert für plotId, wenn der Spieler kein Gebäude bauen will
  if (plotId != -1) {

    if (
      move.G.buildingPlots[9] != null &&
      move.G.players[move.playerID].resources[4] <
        move.G.openedBuildings[plotId].cost
    ) {
      return INVALID_MOVE;
    }
    else {
      let i = 0;
      while (move.G.buildingPlots[i].building != null) {
        i += 1;
        
      }
      
      move.G.players[move.playerID].resources[4] -=
        move.G.openedBuildings[plotId].cost;
      move.G.players[move.playerID].resources[5] +=
        move.G.openedBuildings[plotId].victorypoints;
      move.G.buildingPlots[i].building = move.G.openedBuildings[plotId];
      //console.log(move.G.buildingPlots[i])
      move.G.buildingPlots[i].building.owner = move.playerID;
      move.G.openedBuildings[plotId] = null;
    }
  }
  move.events.setStage("completeQuest");
}
function completeQuest(move, questPosition) {
  //undefined ist der Input für Zug beenden
  if (questPosition != undefined) {
    for (let i = 0; i <= 5; i++) {
      if (
        move.G.players[move.playerID].resources[i] <
        move.G.players[move.playerID].quests[questPosition].requirements[i]
      ) {
        return INVALID_MOVE;
      } else {
        move.G.players[move.playerID].resources[i] -=
          move.G.players[move.playerID].quests[questPosition].requirements[i];
        move.G.players[move.playerID].resources[i] +=
          move.G.players[move.playerID].quests[questPosition].rewards[i];
      }
    }
    move.G.players[move.playerID].solvedQuests.push(
      move.G.players[move.playerID].quests.splice(questPosition, 1)[0]
    );
  }
  console.log(move.playerID)
  move.events.endStage()
  move.events.endTurn()
  endRound(move);
  ;
  // instant effects
}
function chooseQuestCard(move, questCardPosition) {
  //console.log("test",   move.G.players[move.playerID].quests, move.G.openedQuestCards[questCardPosition])
  move.G.players[move.playerID].quests.push(
    move.G.openedQuestCards[questCardPosition]
  );
  //console.log(move.G.players[move.playerID].quests, move.G.openedQuestCards[questCardPosition])
  move.G.openedQuestCards[questCardPosition] = drawQuestCard(
    move.G.questCardsDeck
  );
  move.events.setStage("completeQuest");
}

/** @type {Game} */
export const LordsOfWaterdeep = {
  setup: (setup) => {
    let players = {};
    let startPlayer = 0;
    let roundCounter = 1;
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
    let turnOrder = [];
    for (let i = 0; i <= setup.ctx.numPlayers - 1; i++) {
      turnOrder.push((i + startPlayer) % setup.ctx.numPlayers);
    }
    let playerColors = ["Yellow", "Blue", "Red", "Green", "Black"];
    for (let i = 0; i <= setup.ctx.numPlayers - 1; i++) {
      players[i] = {
        playerColor: playerColors[i],
        maxAgents: 1, //startAgents(setup.ctx.numPlayers),
        leftAgents: 1, //startAgents(setup.ctx.numPlayers),
        /* victorypoints: 0,
        white: 0,
        orange: 0,
        black: 0,
        purple: 0, */
        resources: [
          0,
          0,
          3,
          0,
          8 + (Math.abs(i - startPlayer) % setup.ctx.numPlayers),
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
      turnOrder: turnOrder,
      buildingPlots: buildingPlots,
    };
    return gamestate;

    //questList[0].instantEffect(ahfkwf)
  },
  moves: {
    placeAgent,
  },

  turn: {
    order: TurnOrder.CUSTOM_FROM("turnOrder"),
    stages: {
      completeQuest: {
        moves: { completeQuest },
      },
      chooseQuestCard: {
        moves: { chooseQuestCard },
      },
      buyBuilding: {
        moves: { buyBuilding },
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

  endIf: (endIf) => {
    if (endIf.G.roundCounter == 2) {
      let vpList = [];
      for (let i = 0; i <= endIf.ctx.numPlayers - 1; i++) {
        let a = 0;
        a = endIf.G.players[i].resources[5];
        a += endIf.G.players[i].resources[0];
        a += endIf.G.players[i].resources[1];
        a += endIf.G.players[i].resources[2];
        a += endIf.G.players[i].resources[3];
        a += Math.floor(endIf.G.players[i].resources[4] / 2);
        vpList.push({ id: i, vp: a, gold: endIf.G.players[i].resources[4] });
      }

      vpList.sort(function (a, b) {
        return b.vp - a.vp;
      });
      for (let i = 0; i <= endIf.ctx.numPlayers - 2; i++) {
        if (vpList[i].vp == vpList[i + 1].vp) {
          if (vpList[i].gold < vpList[i + 1].gold) {
            let tempPos1 = vpList[i];
            let tempPos2 = vpList[i + 1];
            vpList[i] = tempPos2;
            vpList[i + 1] = tempPos1;
          }
        }
      }

      //console.log(vpList)
      return vpList;

      /*       let tempHighest = 0;
      let winnerPosition = 0;
      let winnerList = [];
      let ranking = {};
      for (let j = 1; j <= endIf.ctx.numPlayers; j++) {
        for (let i = 0; i <= endIf.ctx.numPlayers - j; i++) {
          if (tempHighest < vpListNew[i]) {
            tempHighest = vpListNew[i];
            winnerPosition = i;
          }
        }
        winnerList.push(winnerPosition);
        vpListNew[winnerPosition] = 0
        console.log(winnerList) */

      /*  for (let i = 0; i <= endIf.ctx.numPlayers - 1; i++) {
          if (tempHighest == vpList[i] && winnerPosition != i) {
            winnerList.push();
            console.log(winnerList)
          }
        } */
    }
  },
};
