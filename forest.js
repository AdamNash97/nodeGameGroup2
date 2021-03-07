import * as ind from './index.js';
import promptSync from 'prompt-sync';
const prompt = promptSync({sigint: true});
import * as inv from './inventory.js';
import * as com from './combat.js';

// FOREST
export function forest() {
    console.log("")
    console.log("Welcome to the forest");
    console.log("What do you want to do?");
    console.log("1: Fight a monster");
    console.log("0: Go back to village square");
    let forestPrompt = prompt("Pick a number:");
    forestPrompt = Number(forestPrompt);
    if (forestPrompt == 0){
      ind.locationChoice(0);
    } else if (forestPrompt == 1){
      console.log(com.player)
      com.initiateCombat(com.player, com.monstersArray, inv.playersInventory, inv.pouch);
    } else {
      console.log("Invalid input, sorry.");
      forest();
    }
  };