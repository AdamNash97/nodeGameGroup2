//Allows users to exit at anytime from prompt line
import promptSync from 'prompt-sync';
const prompt = promptSync({sigint: true});
//Importing modules for each location:
import * as inv from './inventory.js';
import * as game from './minigames.js';
import * as gal from './gallows.js';
import * as com from './combat.js';
import * as sh from './shop.js';
import * as te from './temple.js';

// LOCATION SELECTOR
export function locationChoice (locationIndex){
    switch (Number(locationIndex)){ //Location Indexes
      case 0: //0 : Village Square
        villageSquare();
        break;
      case 1: //1 : Shop
        sh.shop();
        break;
      case 2: //2 : Tavern
        tavern();
        break;
      case 3: //3 : Casino
        casino();
        break;
      case 4: //4 : Gallows
        gallows();
        break;
      case 5: //5 : Forest
        forest();
        break;
      case 6: //6 : Temple 
        te.temple();
        break;
    }
}

// VILLAGE SQUARE
function villageSquare() {
  console.log("")
  console.log("Welcome to the village square! You see many interesting places around you...");
  console.log("Where would you like to go?");
  console.log("1 : Shop");
  console.log("2 : Tavern");
  console.log("3 : Casino");
  console.log("4 : Gallows");
  console.log("5 : Forest");
  console.log("6 : Temple");
  const villageSquarePrompt = prompt("Please pick a number (1-6) to travel to your destination: ");
  var locArr = ["1","2","3","4","5","6"];
  if(locArr.includes(villageSquarePrompt)){
  locationChoice(villageSquarePrompt);
  } else {
    console.log("Invalid input, sorry.");
    villageSquare();
  }
}

// CASINO
function casino() {
  console.log("")
  console.log("Welcome to the casino");
  console.log("What do you wanna do?");
  console.log("1: Play Blackjack");
  console.log("2: Play Roulette")
  console.log("0: Go back to village square");
  let casinoPrompt = prompt("Pick a number: ");
  casinoPrompt = Number(casinoPrompt);
  if (casinoPrompt == 0){
    locationChoice(0);
  }
  else if (casinoPrompt == 1){
    game.blackjack(inv.pouch);
  }
  else if (casinoPrompt == 2){
    game.roulette(inv.pouch);
    locationChoice(3);
  } else {
    console.log("Invalid input, sorry.");
    casino();
  }
}

// GALLOWS

function gallows() {
  console.log("")
  console.log("Welcome to the gallows");
  console.log("What do you wanna do?");
  console.log("1: Watch the hanging");
  console.log("2: Try and stop the hanging")
  console.log("0: Go back to village square");
  let gallowsPrompt = prompt("Pick a number: ");
  gallowsPrompt = Number(gallowsPrompt);
  if (gallowsPrompt == 0){
    locationChoice(0);
  }
  else if (gallowsPrompt == 1){
    gal.initiateHanging();
  }
  else if (gallowsPrompt == 2){
    let hangmanSuccess = gal.hangmanGame();
    if (hangmanSuccess) {
      console.log('Criminal: Oh wow, you saved me ' + player.name + '! I don\'t have much but I owe you everything!')
      inv.pouch.changeGold(3)
      locationChoice(0)
    }
    else {
      console.log('Executioner: "He got what he deserved... don\'t meddle next time."')
      locationChoice(0)
    }

  } else {
    console.log("Invalid input, sorry.");
    casino();
  }

};

// TAVERN
function tavern() {
  console.log("")
  console.log("Welcome to the tavern");
  console.log("What do you want to do?");
  console.log("1: get booze and replenish your health (price: 3 gold)");
  console.log("0: Go back to village square");
  const tavernPrompt = prompt("Pick a number: ");
  if (tavernPrompt == 1){
    console.log(`\n`);
    inv.pouch.changeGold(-3)
    console.log('You get some booze and a nice hot meal');
    player.restoreHealth();
    console.log('You have been restored to full health.')
    console.log(`You have ${player.health} health.`);
    locationChoice(0);
  }
  else if (tavernPrompt == 0){
    locationChoice(0);
  }
  else {
    console.log("Invalid input, sorry.");
    tavern();
  }
}




// Allows waiting between executing lines eg. building suspense in dialog
export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


// GAME INTRO
async function gameIntro() {
  // console.log('You\'re in a daze, unsure of your surroundings... your head is ringing.');
  // console.log('');
  // await sleep(2000);
  // console.log('Your leg hurts like hell...');
  // console.log('');
  // await sleep(2000);
  // console.log('You look down and there is a BITE!');
  // console.log('');
  // await sleep(2000);
  // console.log('Carriage Driver: "Oh yeah... don\'t worry about that... it\'ll heal in no time!"');
  // console.log('');
  // await sleep(2000);
  // console.log('Carriage Driver: "Alright.. this is where they paid me to drop you off"');
  // console.log('');
  // await sleep(2000);
  // console.log('Horrified, you look around but don\'t recognise this town.');
  // console.log('');
  // await sleep(2000);
  // console.log('Carriage Driver: "Well, good luck out there ' + player.name + '."');
  // console.log('');
  // await sleep(2000);
  // console.log('You wonder if anyone in town might be able to help you...');
  // console.log('');
  // await sleep(2000);
  // console.log('You start stumbling towards the village square.');
  // console.log('');
  // await sleep(2000);
  console.log('Carriage Driver: "HEY!! Don\'t forget your things!"');
  console.log('');
  await sleep(2000);
  for (let i in inv.playersInventory) {
    console.log('You have: ' + inv.playersInventory[i].name + ' in your inventory.')
  };
  console.log('The leather pouch contains ' + inv.pouch.gold + ' gold.')
  await sleep(2000);
  console.log("");
  console.log('Carriage Driver: "Oh and one last thing. If it all gets too much you can press ctrl-c to quit at anytime!"')
  await sleep(2000);
  console.log("");
  console.log('You\'re not sure what he\'s talking about but carry on into the town anyway...');
  await sleep(4000);
  locationChoice(0);
}
// FOREST
function forest() {
  console.log("")
  console.log("Welcome to the forest");
  console.log("What do you want to do?");
  console.log("1: Fight a monster");
  console.log("0: Go back to village square");
  let forestPrompt = prompt("Pick a number:");
  forestPrompt = Number(forestPrompt);
  if (forestPrompt == 0){
    locationChoice(0);
  } else if (forestPrompt == 1){
    console.log(player)
    com.initiateCombat(player, com.monstersArray, inv.playersInventory, inv.pouch);
    //console.log(playersHealthBar);
  } else {
    console.log("Invalid input, sorry.");
    forest();
  }
};

//Start game
function gameStart(){
let player = new com.Player('player', 20, 20)
console.log('Welcome to Cannibal Retribution!')
var yes = /^y(?:es)?/i;
var no = /^no?/i;
const wantToPlay = prompt("Do you want to play? (y/n)");
if(yes.test(wantToPlay)){
  console.log('Carriage Driver: "Hey you back there, whats your name? They never tell me anything..."');
  const nameChoice = prompt('Enter name:');
  player.name = nameChoice;
  console.log('');
  gameIntro();
} else if (no.test(wantToPlay)){
  console.log("Okay, no worries!");
  process.exit();
} else{
  console.log("Invalid entry, sorry, please try again.");
  gameStart();
}
}

//Initializing game
gameStart();

