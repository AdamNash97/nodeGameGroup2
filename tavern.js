import * as ind from './index.js';
import promptSync from 'prompt-sync';
const prompt = promptSync({sigint: true});
import * as inv from './inventory.js';
import * as com from './combat.js';

// TAVERN
export function tavern(player) {
    console.log("")
    console.log("Welcome to the tavern");
    console.log("What do you want to do?");
    console.log("1: get booze and replenish your health (price: 3 gold)");
    console.log("0: Go back to village square");
    const tavernPrompt = prompt("Pick a number: ");
    if (tavernPrompt == 1){
      console.log(`\n`);
      inv.pouch.changeGold(-3)
      console.log('You get some booze and a nice hot meal...');
      com.player.restoreHealth();
      console.log('You have been restored to full health.')
      console.log(`You have ${com.player.health} health.`);
      ind.locationChoice(0);
    }
    else if (tavernPrompt == 0){
      ind.locationChoice(0);
    }
    else {
      console.log("Invalid input, sorry.");
      tavern();
    }
  }
  