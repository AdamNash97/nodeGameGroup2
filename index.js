//Allows users to exit at anytime from prompt line
import promptSync from 'prompt-sync';
const prompt = promptSync({sigint: true});
import * as inv from './inventory.js';
import * as game from './minigames.js';
import * as math from 'mathjs';
import { template } from 'lodash';

//Intro function
function startGame() {
    console.log('Welcome to Cannibal Retribution!')
    const wantToPlay = prompt("Do you want to play? (Y/N)");
    if (wantToPlay.toLowerCase() == "y") {
      gameIntro();
    }
    else {
      console.log("Okay, no worries!");
    }
};

function locationChoice (locationIndex){
    /* Location Indexes
        0 : Village Square
        1 : Shop
        2 : Tavern
        3 : Casino
        4 : Gallows
        5 : Forest
        6 : Temple      */
    switch (Number(locationIndex)){
      case 0:
        villageSquare();
        break;
      case 1:
        shop();
        break;
      case 2:
        tavern();
        break;
      case 3:
        casino();
        break;
      case 4:
        gallows();
        break;
      case 5:
        forest();
        break;
      case 6:
        temple();
        break;
    }
}

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
  const villageSquarePrompt = prompt("Please pick a number (1-6) to travel to your destination...");
  locationChoice(villageSquarePrompt);
}

function shop() {
  console.log("")
  console.log("Welcome to the shop");
  console.log("1: Browse or Buy");
  console.log("2: Sell");
  console.log("0: Go back to village square");
  let shopPrompt = prompt("Pick a number");
  shopPrompt = Number(shopPrompt);
  ///////////////////////////////////////////////////////////////////////
  if (shopPrompt == 0){
    locationChoice(0);
  }
  ///////////////////////////////////////////////////////////////////////
  else if (shopPrompt == 1){
    displayItems();
    const browseOrBuy = prompt("Enter 1 to buy an item or Enter 2 to examine an item");
    /////////////////////////////////////
    if(browseOrBuy == 1){
      const itemBuying = prompt("What item do you want to buy? (Press 'x' to cancel)");
      if (itemBuying == 'x'){
        shop();
      }
      else {
        shopInventory[Number(itemBuying)];
        if ((pouch.gold - shopInventory[itemBuying].value) < 0 ){
        console.log("You are too poor!");
        shop();
        }
        else {
          pouch.buy(shopInventory[itemBuying].value);
          playersInventory.push(shopInventory[itemBuying]);
          console.log("Your inventory now contains:");
          for (let i in playersInventory){
          console.log(playersInventory[i].name);
          };
          //await sleep(2000);
          shop();
        };
      }
    }
    else if(browseOrBuy == 2){
      const selectItemToBrowse = prompt("Give the number of the item you want described...");
      inv.examineItem(shopInventory[Number(selectItemToBrowse)])
      shop();
    }
  }
  /////////////////////////////////////////////////////////////////////////
  else if (shopPrompt == 2){
    const sellItem = prompt("what would you like to sell?")
    shop();
  }
}


function casino() {
  console.log("")
  console.log("Welcome to the casino");
  console.log("What do you wanna do?");
  console.log("1: Play Blackjack");
  console.log("0: Go back to village square");
  const casinoPrompt = prompt("Pick a number");
  if (casinoPrompt == 0){
    locationChoice(0);
  }
}

function gallows() {
  console.log("")
  console.log("Welcome to the gallows");
  console.log("What do you want to do?");
  console.log("1: Play Hangman");
  console.log("0: Go back to village square");
  const gallowsPrompt = prompt("Pick a number");
  if (gallowsPrompt == 0){
    locationChoice(0);
  };
};

function tavern() {
  console.log("")
  console.log("Welcome to the tavern");
  console.log("What do you want to do?");
  console.log("1: get booze");
  console.log("0: Go back to village square");
  const tavernPrompt = prompt("Pick a number");
  if (tavernPrompt == 0){
    locationChoice(0);
  };
};

function forest() {
  console.log("")
  console.log("Welcome to the forest");
  console.log("What do you want to do?");
  console.log("1: Fight a monster");
  console.log("0: Go back to village square");
  const forestPrompt = prompt("Pick a number");
  if (forestPrompt == 0){
    locationChoice(0);
  };
};

function temple() {
  console.log("")
  console.log("Welcome to the temple");
  console.log("In the centre there is a mysterious glowing orb on a pillar...")
  console.log("What do you want to do?");
  console.log("1: Touch the orb");
  console.log("0: Go back to village square");
  const templePrompt = prompt("Pick a number");
  if (templePrompt == 0){
    locationChoice(0);
  };
};

// Allows waiting between executing lines eg. building suspense in dialog
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function gameIntro() {
  console.log('You awaken feeling queezy in the back of a carriage... Your head ringing...');
  console.log('');
  await sleep(2000);
  // console.log('Carriage Driver: "Alright.. this is where they paid me to drop you off"');
  // console.log('');
  // await sleep(2000);
  // console.log('You look around but don\'t recognise this town.');
  // console.log('');
  // await sleep(2000);
  // console.log('I wonder if anyone in town might be able to help you...');
  // console.log('');
  // await sleep(2000);
  // console.log('You start stumbling towards the village sqaure');
  // console.log('');
  // await sleep(2000);
  // console.log('Carriage Driver: "HEY!! Don\'t forget your things!"');
  // console.log('');
  // await sleep(2000);
  for (let i in playersInventory) {
    console.log('You have: ' + playersInventory[i].name + ' in your inventory.')
  };
  console.log('The leather pouch contains ' + pouch.gold + ' gold.')
  await sleep(2000);
  console.log('Carriage Driver: "Oh and one last thing. If it all gets too much you can press ctrl-c to quit at anytime!"')
  await sleep(2000);
  console.log('You\'re not sure what he\'s talking about but carry on into the town anyway...')
  await sleep(4000);
  locationChoice(0);
}

//function to display items in shop
function displayItems() {
  for (let i in shopInventory) {
    console.log(`${i} : ${shopInventory[i].name}, Price: ${shopInventory[i].value}`);
  }
}

//Creating instances of the inventory objects in the gaming environment.
let woodenStick = new inv.Weapon ("wooden stick", 1, 3, 0);
let pouch = new inv.Wallet ("leather pouch", 10, 3, 0);
let portableTrebuchet = new inv.Weapon ("pocket-sized trebuchet", 10, 1, 10);
let ironSword = new inv.Weapon ("iron sword", 5, 1, 7);
let poisonousJellyBean = new inv.Weapon ("poisonous jelly bean", 7, 1, 9);
let shimmeringBlade = new inv.Weapon ("shimmering blade", 13, 1, 20);
var existingItems = [woodenStick, pouch, portableTrebuchet, ironSword, poisonousJellyBean, shimmeringBlade];

woodenStick.description = "The trees were generous, this stick will mould you into a great warrior!";
pouch.description = "The finest of cows sacrificed themselves for this pouch!";
portableTrebuchet.description = "Take down the biggest of beasts with this little pocket-rocket!";
ironSword.description = "Crafted by the best iron monger in the village!";
poisonousJellyBean.description = "a lethal version of the children's favourite!";
shimmeringBlade.description = "a blade so shiny it's blinding"

//Adding all current object instances to a running inventory.
var playersInventory = [];
var shopInventory = [];

for (let i of existingItems) {
  if (i.state === 3) {
      playersInventory.push(i);
  }else{
    shopInventory.push(i);
};
}
{startGame();}

