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
}
function adventurerIconList(ctx, inputArray, x, y) {
  ctx.font = "20px sans-serif";
  ctx.fillStyle = "rgb(0 0 0)";
  let adventureColorList = ["white", "orange", "black", "purple"];
  for (let i = 0; i <= 3; i++) {
    ctx.fillText(`${inputArray[i]}x`, x - 118 + 53 * i, y + 7);
    adventurerIcon(ctx, x - 93 + 53 * i, y, adventureColorList[i]);
  }
  ctx.fillText(`${inputArray[4]}x`, x - 118 + 212, y + 7);
  goldIcon(ctx, x - 90 + 53 * 4, y)
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
    ctx.fillStyle= "black"
    ctx.fillRect(0, 0, 2000, 3000);
    //offene Quests
    adventurerIcon(ctx, 300, 300, "purple");
    //roundedRect(ctx,320,300,10, 10)
    //ctx.fill()
    //ctx.stroke()
    goldIcon(ctx, 300, 350);
    //questcards auslage
    ctx.textAlign = "center";
    for (let i = 0; i <= 3; i++) {
      ctx.fillStyle = `rgb(255 255 255)`;
      await drawPicture(ctx, "quest2.png", 400 + i * 350, 50, 300, 150)
      // center (550,125)
      onClick(400 + i * 350, 50, 300, 150, () => {
        this.client.moves.chooseQuestCard(i);
      });
      ctx.fillStyle = `rgb(0 0 0)`;
      adventurerIconList(
        ctx,
        state.G.openedQuestCards[i].requirements,
        550 + i * 350,
        120
      );
      adventurerIconList(
        ctx,
        state.G.openedQuestCards[i].rewards,
        550 + i * 350,
        173)
      ctx.fillStyle = "black"
      ctx.font = "bold 20px sans-serif"
      ctx.fillText(state.G.openedQuestCards[i].name, 550 + i * 350, 80)
      ctx.font = "14px sans-serif"
      ctx.fillText("Requirements", 470 + i * 350, 103)
      ctx.fillText("Rewards", 454 + i * 350, 156)
      ctx.beginPath()
      ctx.moveTo(425+i*350, 140)
      ctx.lineTo(675+i*350, 140)
      ctx.stroke()
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
    ctx.fillRect(50, 50, 300, 150);
    //gebaute PlayerBuilings links und rechts
    for (let i = 0; i <= 9; i++) {
      ctx.fillStyle = `rgb(0 255 255)`;
      ctx.fillRect(
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
      if (state.G.buildingPlots[i].building != null) {
        ctx.fillStyle = "black";
        ctx.fillText(
          "OWNER:" + state.G.buildingPlots[i].building.owner,
          100 + 1550 * Math.floor(i / 5),
          300 + i * 200 - 1000 * Math.floor(i / 5)
        );

        ctx.fillText(
          "Rewards:" + state.G.buildingPlots[i].building.playerReward,
          125 + 1550 * Math.floor(i / 5),
          350 + i * 200 - 1000 * Math.floor(i / 5)
        );
        ctx.fillText(
          "Owner Rewards:" + state.G.buildingPlots[i].building.ownerReward,
          125 + 1550 * Math.floor(i / 5),
          370 + i * 200 - 1000 * Math.floor(i / 5)
        );
      }
    }
    //Buildings, großes oben in der Mitte
    ctx.fillStyle = `rgb(255 0 0)`;
    ctx.fillRect(475 , 300, 250, 150);
    ctx.fillRect(775, 300, 250, 150);
    ctx.fillRect(1075, 300, 250, 150);
    onClick(475 , 300, 250, 150, () => {
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
        ctx.fillRect(400 + j * 750, 480 + i * 180, 250, 150);


      }
    }
    onClick(1025, 500, 150, 75, () => {
      this.client.moves.placeAgent("nonPlayer", 3);
    });
    //Building: Builders Hall
    ctx.fillRect(700, 900, 400, 150);
    onClick(700, 920, 400, 100, () => {
      this.client.moves.placeAgent("nonPlayer", 6);
    });
    //offene nicht gebaute Buildings
    for (let i = 0; i <= 2; i++) {
      ctx.fillStyle = `rgb(0 255 0)`;
      ctx.fillRect(625 + 200 * i, 1100, 150, 150);
      if (state.G.openedBuildings[i] != null) {
        ctx.fillStyle = "black";
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
      for (let j = 0; j <= 5; j++) {
        ctx.fillText(
          state.G.players[i].resources[j],
          125 + 50 * j + 800 * i,
          1450
        );
        /* ctx.fillText("Orange:" + state.G.players[i].orange, 175 + 800 * i, 1450);
      ctx.fillText("Black:" + state.G.players[i].black, 225 + 800 * i, 1450);
      ctx.fillText("Purple:" + state.G.players[i].purple, 275 + 800 * i, 1450);
      ctx.fillText("Gold:" + state.G.players[i].gold, 325 + 800 * i, 1450);
      ctx.fillText(
        "Victory Points:" + state.G.players[i].victorypoints,
        375 + 800 * i,
        1450
      ) */
      }

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
        await drawPicture(ctx, "quest2.png", 100 + i * 800, 1550 + j * 200, 300, 150)
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
          1620+j*200
        );
        adventurerIconList(
          ctx,
          state.G.players[i].quests[j].rewards,
          250 + i * 800,
          1673+j*200)
        ctx.fillStyle = "black"
        ctx.font = "bold 20px sans-serif"
        ctx.fillText(state.G.players[i].quests[j].name, 250 + i * 800, 1580+j*200)
        ctx.font = "14px sans-serif"
        ctx.fillText("Requirements", 170 + i * 800, 1603+j*200)
        ctx.fillText("Rewards", 154 + i * 800 , 1656+j*200)
        ctx.beginPath()
        ctx.moveTo(125+i*800, 1640+j*200)
        ctx.lineTo(175+i*800, 1640+j*200)
        ctx.stroke()
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
      } */}

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
