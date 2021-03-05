//Allows users to exit at anytime from prompt line
import promptSync from 'prompt-sync';
const prompt = promptSync({sigint: true});
import * as inv from './inventory.js';
import * as game from './minigames.js';
import * as math from 'mathjs';
import * as com from './combat.js';



// LOCATION CHANGER
export function locationChoice (locationIndex){
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
  const villageSquarePrompt = prompt("Please pick a number (1-6) to travel to your destination...");
  var locArr = ["1","2","3","4","5","6"];
  if(locArr.includes(villageSquarePrompt)){
  locationChoice(villageSquarePrompt);
  } else {
    console.log("Invalid input, sorry.");
    villageSquare();
  }
}

// SHOP
function shop() {
  console.log("")
  console.log("Welcome to the shop");
  console.log("1: Browse or Buy");
  console.log("2: Sell");
  console.log("0: Go back to village square");
  let shopPrompt = prompt("Pick a number");
  shopPrompt = Number(shopPrompt);
  
  if (shopPrompt == 0){
    locationChoice(0);
  }
  
  else if (shopPrompt == 1){
    displayItems(shopInventory);
    const browseOrBuy = prompt("Enter 1 to buy an item or Enter 2 to examine an item");
    if(browseOrBuy == 1){
      const itemBuying = prompt("What item do you want to buy? (Press 'x' to cancel)");
      if (itemBuying == 'x'){
        shop();
      }
      else if (shopInventory.includes(shopInventory[itemBuying])) {
        shopInventory[Number(itemBuying)];
        if ((pouch.gold - shopInventory[itemBuying].value) < 0 ){
        console.log("You are too poor!");
        shop();
        }
        else {
          pouch.changeGold(-shopInventory[itemBuying].value);
          playersInventory.push(shopInventory[itemBuying]);
          console.log("Your inventory now contains:");
          for (let i in playersInventory){
          console.log(playersInventory[i].name);
          };
          shop();
        }
      } else{
        console.log("Invalid input, sorry.\n");
        shop();
      };
    }
    else if(browseOrBuy == 2){
      const selectItemToBrowse = prompt("Give the number of the item you want described...");
      if(shopInventory.includes(shopInventory[selectItemToBrowse])){
        inv.examineItem(shopInventory[Number(selectItemToBrowse)])
        shop();
      } else{
        console.log("Invalid input, sorry.\n");
        shop();
      };
    } else{
      console.log("Invalid input, sorry.\n");
      shop();
    }   
  } else if (shopPrompt == 2){
    displayItems(playersInventory);
    const sellItem = prompt("what would you like to sell? (Press 'x' to cancel)");
    if (sellItem == 'x'){
      shop();
    }
    else if (playersInventory.includes(playersInventory[sellItem])){
      console.log(`you have sold your ${playersInventory[Number(sellItem)].name} for ${playersInventory[Number(sellItem)].value} gold`)
      pouch.changeGold(playersInventory[Number(sellItem)].value);
      playersInventory.splice((playersInventory[Number(sellItem)]),1);
      shop();
    } else {
      console.log("Invalid input, sorry.\n");
      shop();
    }
  } else {
    console.log("Invalid input, sorry.\n");
    shop();
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
  let casinoPrompt = prompt("Pick a number");
  casinoPrompt = Number(casinoPrompt)
  if (casinoPrompt == 0){
    locationChoice(0);
  }
  else if (casinoPrompt == 1){
    console.log("Sorry our tables are currently being repaired.")
    locationChoice(3)
  }
  else if (casinoPrompt == 2){
    game.roulette(pouch)
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
  console.log("There's nothing to do here right now...");
  console.log("");
  console.log("0: Go back to village square");
  const gallowsPrompt = prompt("Pick a number");
  if (gallowsPrompt == 0){
    locationChoice(0);
  }
  else {
    console.log("Invalid input, sorry.");
    gallows();
  }
};

// TAVERN
function tavern() {
  console.log("")
  console.log("Welcome to the tavern");
  console.log("What do you want to do?");
  console.log("1: get booze (3 gold)");
  console.log("0: Go back to village square");
  const tavernPrompt = prompt("Pick a number");
  if (tavernPrompt == 1){
    pouch.changeGold(-3)
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


// TEMPLE
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
  }else if (templePrompt == 1){
    if (orbsTouched == 0){
        orbsTouched = 1
        touchOrb1();
    }else if (orbsTouched == 1){
        touchOrb2()
    }
  }
  else {
    console.log("Invalid input, sorry.");
    temple();
  }
};

// Allows waiting between executing lines eg. building suspense in dialog
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


// GAME INTRO
async function gameIntro() {
  console.log('You\'re in a daze, unsure of your surroundings... your head is ringing.');
  console.log('');
  await sleep(2000);
  console.log('Your leg hurts like hell...');
  console.log('');
  await sleep(2000);
  console.log('You look down and there is a BITE!');
  console.log('');
  await sleep(2000);
  console.log('Carriage Driver: "Oh yeah... don\'t worry about that... it\'ll heal in no time!"');
  console.log('');
  await sleep(2000);
  console.log('Carriage Driver: "Alright.. this is where they paid me to drop you off"');
  console.log('');
  await sleep(2000);
  console.log('Horrified, you look around but don\'t recognise this town.');
  console.log('');
  await sleep(2000);
  console.log('Carriage Driver: "Well, good luck out there ' + player.name + '."');
  console.log('');
  await sleep(2000);
  console.log('You wonder if anyone in town might be able to help you...');
  console.log('');
  await sleep(2000);
  console.log('You start stumbling towards the village square.');
  console.log('');
  await sleep(2000);
  console.log('Carriage Driver: "HEY!! Don\'t forget your things!"');
  console.log('');
  await sleep(2000);
  for (let i in playersInventory) {
    console.log('You have: ' + playersInventory[i].name + ' in your inventory.')
  };
  console.log('The leather pouch contains ' + pouch.gold + ' gold.')
  await sleep(2000);
  console.log("");
  console.log('Carriage Driver: "Oh and one last thing. If it all gets too much you can press ctrl-c to quit at anytime!"')
  await sleep(2000);
  console.log("");
  console.log('You\'re not sure what he\'s talking about but carry on into the town anyway...');
  await sleep(4000);
  locationChoice(0);
}

//function to display items in shop
function displayItems(Inventory) {
  for (let i in Inventory) {
    console.log(`${i} : ${Inventory[i].name}, Price: ${Inventory[i].value}`);
  }
}

//Pouch
let pouch = new inv.Wallet ("leather pouch", 20, 3, 'DO NOT SELL');
pouch.description = "The finest of cows sacrificed themselves for this pouch!";

//Creating instances of the inventory objects in the gaming environment.
let woodenStick = new inv.Weapon ("wooden stick", 1, 3, 1);
let portableTrebuchet = new inv.Weapon ("pocket-sized trebuchet", 10, 1, 10);
let ironSword = new inv.Weapon ("iron sword", 5, 1, 7);
let poisonousJellyBean = new inv.Weapon ("poisonous jelly bean", 7, 1, 9);
let shimmeringBlade = new inv.Weapon ("shimmering blade", 13, 1, 20);
let gun = new inv.Weapon("a gun", 20, 1, 50);
let healingPotion = new inv.Consumable ("health regeneration potion", 1, 5, 5);
var existingItems = [woodenStick, pouch, portableTrebuchet, ironSword, poisonousJellyBean, shimmeringBlade, healingPotion, gun];

woodenStick.description = "The trees were generous, this stick will mould you into a great warrior!";
portableTrebuchet.description = "Take down the biggest of beasts with this little pocket-rocket!";
ironSword.description = "Crafted by the best iron monger in the village!";
poisonousJellyBean.description = "a lethal version of the children's favourite!";
shimmeringBlade.description = "a blade so shiny it's blinding";
healingPotion.description = "a potion to boost your health";
gun.description = "how did this get here?"

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


// FOREST
function forest() {
  console.log("")
  console.log("Welcome to the forest");
  console.log("What do you want to do?");
  console.log("1: Fight a monster");
  console.log("0: Go back to village square");
  const forestPrompt = prompt("Pick a number:");
  if (forestPrompt == 0){
    locationChoice(0);
  } else if (forestPrompt == 1){
    console.log(player)
    com.initiateCombat(player, com.monstersArray, playersInventory, pouch);
    //console.log(playersHealthBar);
  } else {
    console.log("Invalid input, sorry.");
    forest();
  }
};

// TOUCH ORB
async function touchOrb1(){
    console.log('Unknown voice: "HEY! WHAT DO YOU THINK YOU\'RE DOING!!!"');
    console.log('');
    await sleep(2000);
    console.log('A robed man with a hood covering his face appears from behind a pillar.');
    console.log('')
    await sleep(2000);
    console.log('Robed man: "I am the robed man, guardian of...');
    console.log('');
    await sleep(2000);
    console.log('Robed man: "THE ORB OF TRUTH"')
    console.log('');
    await sleep(2000);
    console.log('Maybe this will reveal how you got here, and who sent you...')
    console.log('');
    await sleep(2000);
    console.log('Robed man: "I see much confusion in you... perhaps I\'ll let you use the orb...')
    console.log('');
    await sleep(2000);
    console.log('Robed man: "FOR A PRICE!!! MWAHAHAHAHA *cough* *cough* excuse me..')
    console.log('');
    await sleep(2000);
    console.log('Robed man: "Yes, uhhh 200 gold should do it..."')
    console.log('');
    await sleep(2000);
    console.log('You leave with more questions than answers... but perhaps you\'re on the right track')
    console.log('');
    await sleep(4000);
    locationChoice(0);
}

  // TOUCH ORB 2
async function touchOrb2(){
  console.log('Robed man: "Oh. You\'re back...');
  console.log('');
  await sleep(2000);
  console.log('Robed man: Well, do you have the moolah, uh, I mean gold..?')
  console.log('');
  await sleep(2000);
  let orbPrompt = prompt("Hand over gold? (Y/N)")
  if (orbPrompt.toUpperCase() == "Y"){
    if (pouch.gold >= 200){
      winnerWinnerChickenDinner()
    }else{
      console.log('Robed man: "Do you think I am a fool? Fool.')
      console.log('');
      await sleep(2000);
      console.log('Robed man: "Come back when you\'re less disgustingly poor or don\' come back at all!')
      console.log('');
      await sleep(2000);
      console.log('That was a rude, you head back to the square...')
      locationChoice(0)
    };

  } else {
    console.log('Robed man: "THEN SCRAM!!! Pathetic...')
    await sleep(2000)
    locationChoice(0)
  };

}

// WIN CONDITION
async function winnerWinnerChickenDinner() {
  console.log('Robed man: "WAIT WHAT! How\'d someone like you actually get that kind of gold???')
  console.log('');
  await sleep(2000);
  console.log('Robed man: "Gods, they\'re not gonna be happy with me now..."')
  console.log('');
  await sleep(2000);
  console.log('Robed man: "Oh well, a promise is a promise..."')
  console.log('');
  await sleep(2000);
  console.log('Robed man: "Go on then, have at it."')
  console.log('');
  await sleep(2000);
  console.log('You reach out and touch the orb...')
  console.log('');
  await sleep(2000);
  console.log('A flash of blinding light! A sense of fury and rage overcomes you!')
  console.log('');
  await sleep(2000);
  console.log('You see three faces, recognisable to you...')
  console.log('');
  await sleep(2000);
  console.log('Mysterious ominous voice: "NOW YOU SEE THE TRUTH"')
  console.log('');
  await sleep(2000);
  console.log('Mysterious ominous voice: "LOOK DEEPER INSIDE YOURSELF"')
  console.log('');
  await sleep(2000);
  console.log('The memories come rushing back.')
  console.log('');
  await sleep(2000);
  console.log('NO! It can\'t be!')
  console.log('');
  await sleep(2000);
  console.log('Mysterious ominous voice: "DO NOT FEAR THE TRUTH"')
  console.log('');
  await sleep(2000);
  console.log('You can see clearly now...')
  console.log('');
  await sleep(2000);
  console.log('It was them who sent you here...')
  console.log('');
  await sleep(2000);
  console.log('Harry, Matt and Adam!!!')
  console.log('');
  await sleep(2000);
  console.log('Those bastards...')
  console.log('');
  await sleep(2000);
  console.log('To be continued..?')
  console.log('');
  await sleep(2000);
}

//Start game
let player = new com.Player('player', 20, 20)
var orbsTouched = 0
console.log('Welcome to Cannibal Retribution!')
const wantToPlay = prompt("Do you want to play? (Y/N)");
if (wantToPlay.toLowerCase() == "y") {
  console.log('Carriage Driver: "Hey you back there, whats your name? They never tell me anything..."');
  const nameChoice = prompt('Enter name:');
  player.name = nameChoice;
  console.log('');
  gameIntro();
}
else if(wantToPlay.toLowerCase() == "n") {
   console.log("Okay, no worries!");
} else {
  console.log("Invalid entry, sorry");
} 
