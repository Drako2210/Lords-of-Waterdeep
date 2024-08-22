import { Client } from "boardgame.io/client";
import { Debug } from "boardgame.io/debug";
import { Local, SocketIO } from "boardgame.io/multiplayer";
import { resetOnClicks } from "./canvas";
import { LordsOfWaterdeep } from "./LordsOfWaterdeep";
import { drawPicture, onClick } from "./canvas";
import { setupLobby } from "./lobby";

const isMultiplayer = import.meta.env.VITE_REMOTE === "true";
const multiplayerServer =
  import.meta.env.VITE_MUTLIPLAYER_SERVER ?? "localhost:8000";

const canvas = document.getElementById("canvas");

let playerColors = ["yellow", "blue", "red", "green", "black"];

const ctx = canvas.getContext("2d");
const multiplayer = isMultiplayer
  ? SocketIO({ server: multiplayerServer })
  : Local();

function adventurerIcon(ctx, x, y, color) {
  let preColor = ctx.fillStyle;
  ctx.fillStyle = color;
  if (color == "black") {
    ctx.strokeStyle = "white";
  } else {
    ctx.strokeStyle = "black";
  }
  let edgeLength = 13;
  let sin60 = Math.sin(Math.PI / 3);
  ctx.beginPath();
  ctx.moveTo(x, y + edgeLength);
  ctx.lineTo(x + edgeLength * sin60, y + 0.5 * edgeLength);
  ctx.lineTo(x + edgeLength * sin60, y - 0.5 * edgeLength);
  ctx.lineTo(x, y - edgeLength);
  ctx.lineTo(x - edgeLength * sin60, y - 0.5 * edgeLength);
  ctx.lineTo(x - edgeLength * sin60, y + 0.5 * edgeLength);
  ctx.lineTo(x, y + edgeLength);
  ctx.fill();
  ctx.lineTo(x, y);
  ctx.lineTo(x + edgeLength * sin60, y - 0.5 * edgeLength);
  ctx.moveTo(x, y);
  ctx.lineTo(x - edgeLength * sin60, y - 0.5 * edgeLength);
  ctx.stroke();
  ctx.fillStyle = preColor;
  //console.log(ctx.fillStyle)
}
function roundedRect(ctx, x, y, width, height) {
  let radius = (width + height) / 10;

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
}

function goldIcon(ctx, x, y) {
  let preColor = ctx.fillStyle;
  let edgeLength = 24;
  ctx.lineWidth = 1;
  roundedRect(
    ctx,
    x - edgeLength / 2,
    y - edgeLength / 2,
    edgeLength,
    edgeLength
  );
  ctx.fillStyle = "rgb(255 223 0)";
  ctx.strokeStyle = "black";
  ctx.arc(x, y, edgeLength / 6, 0, 2 * Math.PI, true);
  ctx.stroke();
  ctx.fill();
  ctx.fillStyle = preColor;
}
function adventurerIconList(ctx, inputArray, x, y) {
  let preFont = ctx.font;
  ctx.font = "20px sans-serif";
  ctx.fillStyle = "rgb(0 0 0)";
  let adventureColorList = ["white", "orange", "black", "purple"];
  for (let i = 0; i <= 3; i++) {
    ctx.fillText(`${inputArray[i]}x`, x - 118 + 53 * i, y + 7);
    adventurerIcon(ctx, x - 93 + 53 * i, y, adventureColorList[i]);
  }
  ctx.fillText(`${inputArray[4]}x`, x - 118 + 212, y + 7);
  goldIcon(ctx, x - 90 + 53 * 4, y);
  ctx.font =preFont
}
function victoryPointsIcon(ctx, x, y,amout) {
  ctx.textAlign = "center"
  let preFont = ctx.font;
  let preColor = ctx.fillStyle;
  ctx.fillStyle = "red";
  ctx.strokeStyle = "black";
  let edgeLength = 13;
  ctx.beginPath();
  ctx.moveTo(x+10, y+10);
  ctx.lineTo(x +10 +edgeLength * 0.5, y );
  ctx.lineTo(x+10, y-10);
  ctx.lineTo(x-10, y-10);
  ctx.lineTo(x -10 -edgeLength * 0.5, y );
  ctx.lineTo(x-10, y+10);
  ctx.lineTo(x+10, y+10);
  ctx.fill();
  ctx.stroke();
  ctx.font = "bold 18px sans-serif"
  ctx.fillStyle = "white";

  ctx.fillText(amout,x,y+6)
  ctx.fillStyle = preColor;
  ctx.font =preFont
}
function shortedIconList(ctx, inputArray, x, y) {
  let xPosition = x;
  let preFont = ctx.font;
  ctx.font = "20px sans-serif"
  for (let j = 0; j <= 3; j++) {
    let adventureColorList = ["white", "orange", "black", "purple"];

    if (inputArray[j] != 0) {
      ctx.fillText(`${inputArray[j]}x`, xPosition, y + 7);
      adventurerIcon(ctx, xPosition + 25, y, adventureColorList[j]);

      xPosition += 53;
    }


    
  }
  if (inputArray[4] != 0) {
    ctx.fillText(`${inputArray[4]}x`, xPosition, y + 7)
    goldIcon(ctx, xPosition + 25, y,)
    xPosition += 53
  }
  if (inputArray[5] != 0) {
    victoryPointsIcon(ctx, xPosition +10, y,inputArray[5])
  }

  ctx.font =preFont
}
class GameClient {
  constructor(rootElement, gameParams) {
    this.rootElement = rootElement;

    this.client = Client({
      game: LordsOfWaterdeep,
      multiplayer: isMultiplayer ? multiplayer : undefined,
      debug: {
        collapseOnLoad: false,
        hideToggleButton: false,
        impl: Debug,
      },
      matchID: gameParams?.matchId,
      playerID: gameParams?.playerId,
      credentials: gameParams?.playerCredentials,
    });

    this.client.subscribe((state) => {
      if (state === null) return;
      this.update(state);
    });
    this.client.start();
  }

  async update(state) {
    resetOnClicks();
    //console.log(state);
    //console.log(state.ctx.currentPlayer)
    ctx.fillStyle = "black";
   
    await drawPicture(ctx, "board.png", 0, 0, 2000, 3000);
    //offene Quests
    //victoryPointsIcon(ctx,300,300,20)
    //roundedRect(ctx,320,300,10, 10)
    //ctx.fill()
    //ctx.stroke()
    //questcards auslage
    ctx.textAlign = "center";
    for (let i = 0; i <= 3; i++) {
      ctx.fillStyle = `rgb(255 255 255)`;
      await drawPicture(ctx, "quest2.png", 400 + i * 350, 50, 300, 150);
      // center (550,125)
      onClick(400 + i * 350, 50, 300, 150, () => {
        this.client.moves.chooseQuestCard(i);
      });
      ctx.fillStyle = `rgb(0 0 0)`;
      /* adventurerIconList(
        ctx,
        state.G.openedQuestCards[i].requirements,
        550 + i * 350,
        120
      ); */
      shortedIconList(
        ctx,
        state.G.openedQuestCards[i].requirements,
        440 + i * 350,
        120);
      /* adventurerIconList(
        ctx,
        state.G.openedQuestCards[i].rewards,
        550 + i * 350,
        173
      ); */
      shortedIconList(
        ctx,
        state.G.openedQuestCards[i].rewards,
        440 + i * 350,
        173
      );
      ctx.fillStyle = "black";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(state.G.openedQuestCards[i].name, 550 + i * 350, 80);
      ctx.font = "14px sans-serif";
      ctx.fillText("Requirements", 470 + i * 350, 103);
      ctx.fillText("Rewards", 454 + i * 350, 156);
      ctx.beginPath();
      ctx.moveTo(425 + i * 350, 140);
      ctx.lineTo(675 + i * 350, 140);
      ctx.stroke();
      /* ctx.fillText(state.G.openedQuestCards[i].type, 450 + i * 350, 100);
      ctx.fillText(
        "Requirements:" + state.G.openedQuestCards[i].requirements,
        550 + i * 350,
        150
      );
      ctx.fillText(
        "Rewards:" + state.G.openedQuestCards[i].rewards,
        550 + i * 350,
        170
      ); */
    }

    ctx.fillStyle = `rgb(50 50 50)`;

    drawPicture(ctx, "cardback-quest1.png", 50, 50, 300, 150);
    //gebaute PlayerBuilings links und rechts
    for (let i = 0; i <= 9; i++) {
      ctx.fillStyle = `rgb(0 255 255)`;
      ctx.fillRect(
        50 + 1550 * Math.floor(i / 5),
        250 + i * 200 - 1000 * Math.floor(i / 5),
        150,
        150
      );
      await drawPicture(
        ctx,
        "building1.png",
        50 + 1550 * Math.floor(i / 5),
        250 + i * 200 - 1000 * Math.floor(i / 5),
        150,
        150
      );
      onClick(
        50 + 1550 * Math.floor(i / 5),
        250 + i * 200 - 1000 * Math.floor(i / 5),
        150,
        150,
        () => {
          this.client.moves.placeAgent("player", i);
        }
      );
      if (state.G.buildingPlots[i].occupied != null) {
        drawPicture(
          ctx,
          `${playerColors[state.G.buildingPlots[i].occupied]}_agent.png`,
          50 + 1550 * Math.floor(i / 5),
          330 + i * 200 - 1000 * Math.floor(i / 5),
          60,
          60
        );
      }

      if (state.G.buildingPlots[i].building != null) {
        ctx.fillStyle = "black";
        //console.log(state.G.buildingPlots[i].building.playerReward);
        shortedIconList(
          ctx,
          state.G.buildingPlots[i].building.playerReward,
          58 + 1550 * Math.floor(i / 5),
          320 + i * 200 - 1000 * Math.floor(i / 5)
        );
        shortedIconList(
          ctx,
          state.G.buildingPlots[i].building.ownerReward,
          58 + 1550 * Math.floor(i / 5),
          350 + i * 200 - 1000 * Math.floor(i / 5)
        );
        ctx.fillText(
          "OWNER:" + state.G.buildingPlots[i].building.owner,
          100 + 1550 * Math.floor(i / 5),
          300 + i * 200 - 1000 * Math.floor(i / 5)
        );

        /* ctx.fillText(
          "Rewards:" + state.G.buildingPlots[i].building.playerReward,
          125 + 1550 * Math.floor(i / 5),
          350 + i * 200 - 1000 * Math.floor(i / 5)
        ); */
        ctx.fillText(
          "Owner Rewards:" + state.G.buildingPlots[i].building.ownerReward,
          125 + 1550 * Math.floor(i / 5),
          370 + i * 200 - 1000 * Math.floor(i / 5)
        );
      }
    }
    //Buildings, großes oben in der Mitte
    ctx.fillStyle = `rgb(255 0 0)`;
    ctx.fillRect(475, 300, 250, 150);
    ctx.fillStyle = `rgb(235 217 184)`;
    roundedRect(ctx, 475 - 5, 300 + 75, 70, 70);

    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = `rgb(255 0 0)`;
    if (state.G.buildingList[0].occupied != null) {
      drawPicture(
        ctx,
        `${playerColors[state.G.buildingList[0].occupied]}_agent.png`,
        480,
        380,
        60,
        60
      );
    }
    if (state.G.buildingList[1].occupied != null) {
      drawPicture(
        ctx,
        `${playerColors[state.G.buildingList[1].occupied]}_agent.png`,
        780,
        380,
        60,
        60
      );
    }
    if (state.G.buildingList[2].occupied != null) {
      drawPicture(
        ctx,
        `${playerColors[state.G.buildingList[2].occupied]}_agent.png`,
        1080,
        380,
        60,
        60
      );
    }
    ctx.fillRect(775, 300, 250, 150);
    ctx.fillRect(1075, 300, 250, 150);
    ctx.fillStyle = `rgb(235 217 184)`;
    roundedRect(ctx, 775, 300 + 75, 70, 70);
    ctx.fill();
    ctx.stroke();
    roundedRect(ctx, 1075, 300 + 75, 70, 70);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = `rgb(255 0 0)`;
    onClick(475, 300, 250, 150, () => {
      this.client.moves.placeAgent("nonPlayer", 0);
    });
    onClick(775, 300, 250, 150, () => {
      this.client.moves.placeAgent("nonPlayer", 1);
    });
    onClick(1075, 300, 250, 150, () => {
      this.client.moves.placeAgent("nonPlayer", 2);
    });
    //Buildings, kleine

    for (let j = 0; j <= 1; j++) {
      for (let i = 0; i <= 2; i++) {
        let buildingPosition = null;
        if (j == 1) {
          buildingPosition = i + 3;
        }
        if (j == 0) {
          buildingPosition = 9 - i;
        }
        ctx.fillRect(400 + j * 750, 480 + i * 180, 250, 150);
        ctx.fillStyle = `rgb(235 217 184)`;
        roundedRect(ctx, 400 + j * 750, 480 + i * 180 + 75, 70, 70);

        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = `rgb(255 0 0)`;

        onClick(400 + j * 750, 480 + i * 180, 250, 150, () => {
          this.client.moves.placeAgent("nonPlayer", buildingPosition);
        });
        if (state.G.buildingList[buildingPosition].occupied != null) {
          drawPicture(
            ctx,
            `${
              playerColors[state.G.buildingList[buildingPosition].occupied]
            }_agent.png`,
            400 + j * 750,
            560 + i * 180,
            60,
            60
          );
        }
      }
    }
    //Building: Builders Hall
    ctx.fillRect(700, 900, 400, 150);
    onClick(700, 920, 400, 100, () => {
      this.client.moves.placeAgent("nonPlayer", 6);
    });
    ctx.fillStyle = `rgb(235 217 184)`;
    roundedRect(ctx, 700, 900 + 75, 70, 70);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = `rgb(255 0 0)`;
    if (state.G.buildingList[6].occupied != null) {
      drawPicture(
        ctx,
        `${playerColors[state.G.buildingList[6].occupied]}_agent.png`,
        700,
        920,
        60,
        60
      );
    }

    //offene nicht gebaute Buildings
    for (let i = 0; i <= 2; i++) {
      ctx.fillStyle = `rgb(0 255 0)`;
      ctx.fillRect(625 + 200 * i, 1100, 150, 150);
      await drawPicture(ctx, "building1.png", 625 + 200 * i, 1100, 150, 150);
      if (state.G.openedBuildings[i] != null) {
        ctx.fillStyle = "white";
        ctx.fillText(state.G.openedBuildings[i].cost, 675 + i * 200, 1150);
        //ctx.fillStyle = "red";
        ctx.fillText(
          "Rewards:" + state.G.openedBuildings[i].playerReward,
          700 + i * 200,
          1200
        );
        ctx.fillText(
          "Owner Rewards:" + state.G.openedBuildings[i].ownerReward,
          700 + i * 200,
          1220
        );
      }
      if (state.ctx.activePlayers != null) {
        if (
          state.ctx.activePlayers[state.ctx.currentPlayer] == "buyBuilding" &&
          state.ctx.gameover == undefined
        ) {
          onClick(625 + 200 * i, 1100, 150, 150, () => {
            this.client.moves.buyBuilding(i);
          });
          ctx.fillStyle = "rgb(255 110 74)";
          ctx.fillRect(625, 1300, 300, 75);
          ctx.fillStyle = "rgb(0 0 0)";
          ctx.fillText("Baue kein Gebäude", 775, 1350);
          onClick(625, 1300, 300, 75, () => {
            this.client.moves.buyBuilding(-1);
          });
        }
      }
    }
    //Player Cards
    for (let i = 0; i <= 1; i++) {
      ctx.fillStyle = state.G.players[i].playerColor;
      ctx.fillRect(50 + 800 * i, 1400, 750, 1600);
      ctx.fillStyle = "white";
      ctx.fillRect(100 + 800 * i, 1400, 650, 100);
      ctx.fillStyle = "black";
      // Resources
      /* for (let j = 0; j <= 5; j++) {
        
        ctx.fillText(
          state.G.players[i].resources[j],
          125 + 50 * j + 800 * i,
          1450
        ); 
         ctx.fillText("Orange:" + state.G.players[i].orange, 175 + 800 * i, 1450);
      ctx.fillText("Black:" + state.G.players[i].black, 225 + 800 * i, 1450);
      ctx.fillText("Purple:" + state.G.players[i].purple, 275 + 800 * i, 1450);
      ctx.fillText("Gold:" + state.G.players[i].gold, 325 + 800 * i, 1450);
      ctx.fillText(
        "Victory Points:" + state.G.players[i].victorypoints,
        375 + 800 * i,
        1450
      ) 
      }*/
      adventurerIconList(ctx,state.G.players[i].resources,250+ 800 * i,1450)
      victoryPointsIcon(ctx,410+ 800 * i,1450,state.G.players[i].resources[5])

      // Feld für Beenden des Zuges in der completeQuest-Stage

      if (state.ctx.activePlayers != null) {
        if (
          state.ctx.activePlayers[i] == "completeQuest" &&
          state.ctx.gameover == undefined
        ) {
          ctx.fillStyle = "rgb(255 110 74)";
          ctx.fillRect(275 + 800 * i, 1300, 300, 75);
          ctx.fillStyle = "rgb(0 0 0)";
          ctx.fillText("Beende den Zug", 425 + 800 * i, 1350);
          onClick(275 + 800 * i, 1300, 300, 75, () => {
            if (i == state.ctx.currentPlayer) {
              this.client.moves.completeQuest(undefined);
            }
          });
        }
      }
      //Quest Cards der SPIELER
      for (let j = 0; j <= state.G.players[i].quests.length - 1; j++) {
        ctx.fillStyle = `rgb(255 255 255)`;
        await drawPicture(
          ctx,
          "quest2.png",
          100 + i * 800,
          1550 + j * 200,
          300,
          150
        );
        // center (550,125)
        //new center(250,1625)
        onClick(100 + i * 800, 1550 + j * 200, 300, 150, () => {
          if (i == state.ctx.currentPlayer) {
            this.client.moves.completeQuest(j);
          }
        });
        ctx.fillStyle = `rgb(0 0 0)`;
        adventurerIconList(
          ctx,
          state.G.players[i].quests[j].requirements,
          250 + i * 800,
          1620 + j * 200
        );
        adventurerIconList(
          ctx,
          state.G.players[i].quests[j].rewards,
          250 + i * 800,
          1673 + j * 200
        );
        ctx.fillStyle = "black";
        ctx.font = "bold 20px sans-serif";
        ctx.fillText(
          state.G.players[i].quests[j].name,
          250 + i * 800,
          1580 + j * 200
        );
        ctx.font = "14px sans-serif";
        ctx.fillText("Requirements", 170 + i * 800, 1603 + j * 200);
        ctx.fillText("Rewards", 154 + i * 800, 1656 + j * 200);
        ctx.beginPath();
        ctx.moveTo(125 + i * 800, 1640 + j * 200);
        ctx.lineTo(175 + i * 800, 1640 + j * 200);
        ctx.stroke();
        /* 
        ctx.fillStyle = "white";
        ctx.fillRect(100 + i * 800, 1550 + j * 200, 300, 150);
        onClick(100 + i * 800, 1550 + j * 200, 300, 150, () => {
          if (i == state.ctx.currentPlayer) {
            this.client.moves.completeQuest(j);
          }
        });
        ctx.fillStyle = `rgb(0 0 0)`;
        ctx.fillText(
          "Type:" + state.G.players[i].quests[j].type,
          150 + i * 800,
          1600 + j * 200
        );

        ctx.fillText(
          "Requirements:" + state.G.players[i].quests[j].requirements,
          150 + i * 800,
          1625 + j * 200
        );
        ctx.fillText(
          "Rewards:" + state.G.players[i].quests[j].rewards,
          150 + i * 800,
          1650 + j * 200
        );
      } */
      }

      for (let j = 0; j <= state.G.players[i].intrigueCards.length - 1; j++) {
        ctx.fillStyle = "white";
        ctx.fillRect(450 + i * 800, 1550 + j * 350, 150, 300);
        ctx.fillStyle = `rgb(0 0 0)`;
        /*       ctx.fillText("Type:" + state.G.players[i].quests[j].type, 150 + i * 800, 1600 + j*200);
       ctx.fillText(
        "Requirements:" + state.G.players[i].quests[j].requirements,
        150 + i * 800,
        1625 + j*200
      );
      ctx.fillText(
        "Rewards:" + state.G.players[i].quests[j].rewards,
        150 + i * 800,
        1650 + j*200
      ); */
      }
    }

    if (state.ctx.gameover != undefined) {
      resetOnClicks();
      ctx.fillStyle = "white";
      //ctx.fillRect(0, 0, 2000, 2000);
    }
  }
}

setupLobby(
  isMultiplayer,
  (appElement, game) => new GameClient(appElement, game)
);
