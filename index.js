//Allows user input and for users to exit at anytime from the prompt line using ctrl-c
import promptSync from 'prompt-sync';
const prompt = promptSync({sigint: true});
//Importing modules for each location:
import * as gal from './gallows.js';
import * as com from './combat.js';
import * as sh from './shop.js';
import * as te from './temple.js';
import * as ta from './tavern.js';
import * as ca from './casino.js';
import * as fo from './forest.js';
import * as vs from './villageSquare.js';
import * as gi from './gameIntro.js';


// LOCATION SELECTOR
export function locationChoice (locationIndex){
    switch (Number(locationIndex)){ //Location Indexes
      case 0: //0 : Village Square
        vs.villageSquare();
        break;
      case 1: //1 : Shop
        sh.shop();
        break;
      case 2: //2 : Tavern
        ta.tavern();
        break;
      case 3: //3 : Casino
        ca.casino();
        break;
      case 4: //4 : Gallows
        gal.gallows();
        break;
      case 5: //5 : Forest
        fo.forest();
        break;
      case 6: //6 : Temple 
        te.temple();
        break;
    }
}

//Start game
export function gameStart(){
console.log('Welcome to Cannibal Retribution!')
var yes = /^y(?:es)?/i;
var no = /^no?/i;
const wantToPlay = prompt("Do you want to play? (y/n)");
if(yes.test(wantToPlay)){
  console.log('Carriage Driver: "Hey you back there, whats your name? They never tell me anything..."');
  const nameChoice = prompt('Enter name:');
  com.player.name = nameChoice;
  console.log('');
  gi.gameIntro();
} else if (no.test(wantToPlay)){
  console.log("Okay, no worries!");
  process.exit();
} else{
  console.log("Invalid entry, sorry, please try again.");
  gameStart();
}
}

// Allows waiting between executing lines using async functions eg. building suspense in dialog
export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

//Initializing game
gameStart();

