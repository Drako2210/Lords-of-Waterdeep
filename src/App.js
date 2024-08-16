import { Client } from "boardgame.io/client";
import { Local, SocketIO } from "boardgame.io/multiplayer";
import { resetOnClicks } from "./canvas";
import { LordsOfWaterdeep } from "./LordsOfWaterdeep";
import { drawPicture, onClick } from "./canvas";
const isMultiplayer = import.meta.env.VITE_REMOTE === "true";

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
const multiplayer = isMultiplayer
  ? SocketIO({ server: "localhost:8000" })
  : Local();

class GameClient {
  constructor(rootElement) {
    this.rootElement = rootElement;

    this.client = Client({
      game: LordsOfWaterdeep,
    });

    this.client.subscribe((state) => this.update(state));
    this.client.start();
  }

  update(state) {
    resetOnClicks();
    console.log(state);
    ctx.fillRect(0, 0, 2000, 3000);
    //offene Quests
    ctx.textAlign = "center";
    for (let i = 0; i <= 3; i++) {
      ctx.fillStyle = `rgb(255 255 255)`;
      ctx.fillRect(400 + i * 350, 50, 300, 150);
      ctx.fillStyle = `rgb(0 0 0)`;
      ctx.fillText(state.G.openedQuestCards[i].type, 450 + i * 350, 100);

      ctx.fillText(
        "Requirements:" + state.G.openedQuestCards[i].requirements,
        550 + i * 350,
        150
      );
      ctx.fillText(
        "Rewards:" + state.G.openedQuestCards[i].rewards,
        550 + i * 350,
        170
      );
    }

    ctx.fillStyle = `rgb(50 50 50)`;
    ctx.fillRect(50, 50, 300, 150);
    //gebaute PlayerBuilings links
    ctx.fillStyle = `rgb(0 255 255)`;
    for (let i = 0; i <= 4; i++) {
      ctx.fillRect(50, 250 + i * 200, 150, 150);
    }
    //gebaute PlayerBuilings rechts
    for (let i = 0; i <= 4; i++) {
      ctx.fillRect(1600, 250 + i * 200, 150, 150);
    }
    //Buildings, großes oben in der Mitte
    ctx.fillStyle = `rgb(255 0 0)`;
    ctx.fillRect(625, 350, 550, 100);
    //Buildings, kleine
    for (let j = 0; j <= 1; j++) {
      for (let i = 0; i <= 2; i++) {
        ctx.fillRect(625 + j * 400, 500 + i * 150, 150, 75);
        if (i == 2) {
          ctx.fillRect(825, 500 + i * 150, 150, 75);
        }
      }
    }
    onClick(1025,500,150,75,()=>{this.client.moves.placeAgent("nonPlayer",3)})
    //Building: Builders Hall
    ctx.fillRect(700, 920, 400, 100);
    //offene nicht gebaute Buildings
    for (let i = 0; i <= 2; i++) {
      ctx.fillStyle = `rgb(0 255 0)`;
      ctx.fillRect(625 + 200 * i, 1100, 150, 150);
      ctx.fillStyle = "black";
      ctx.fillText(state.G.openedBuildings[i].cost, 675 + i * 200, 1150);
      ctx.fillStyle = "red";
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
    //Player Cards
    for (let i = 0; i <= 1; i++) {
      ctx.fillStyle = state.G.players[i].playerColor;
      ctx.fillRect(50 + 800 * i, 1400, 750, 1600);
      ctx.fillStyle = "white";
      ctx.fillRect(100 + 800 * i, 1400, 650, 100);
      ctx.fillStyle = "black";
      // Resources
      for(let j = 0; j <= 5; j++){
      ctx.fillText(state.G.players[i].resources[j], 125 + 50 * j + 800 * i, 1450);
      /* ctx.fillText("Orange:" + state.G.players[i].orange, 175 + 800 * i, 1450);
      ctx.fillText("Black:" + state.G.players[i].black, 225 + 800 * i, 1450);
      ctx.fillText("Purple:" + state.G.players[i].purple, 275 + 800 * i, 1450);
      ctx.fillText("Gold:" + state.G.players[i].gold, 325 + 800 * i, 1450);
      ctx.fillText(
        "Victory Points:" + state.G.players[i].victorypoints,
        375 + 800 * i,
        1450
      ) */;}
      //Quest Cards der SPIELER
      for (let j = 0; j <= state.G.players[i].quests.length - 1; j++) {
        ctx.fillStyle = "white";
        ctx.fillRect(100 + i * 800, 1550 + j * 200, 300, 150);
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
  }
}
const appElement = document.getElementById("app");
const app = new GameClient(appElement);
