/*
States Explanation:
0: is out-of-play (destroyed or not yet introduced)
1: is somewhere in the game world, but not yet found by the player
2: has been handled by the player—e.g. taken and then dropped
3: is carried by the player.
*/

export class Item {
    constructor(name, state, value) {
        this.name = name;
        this.state = state;
        this.value = value;
    }
    newState(newState) {
        this.state = newState;
    }
};

export class Weapon extends Item {
    constructor(name, damage, state, value) {
        super(name, state, value);
        this.damage = damage;
    }
};

export class Consumable extends Item {
    constructor(name, state, value, healthRegen){
        super(name, state, value);
        this.healthRegen = healthRegen;
    }
};
export class Wallet extends Item {
    constructor(name, gold, state) {
        super(name, state);
        this.gold = gold;
    }
    changeGold(goldDiff) {
        this.gold = this.gold + goldDiff
        console.log('You now have ' + this.gold + ' gold.')
    }
};


export function countMoney(obj) {
    let reply = `Your ${obj.name} contains `;
    if (obj.gold) {
        reply = reply + `${obj.gold} gold`;
    };
    if (!obj.gold) {
        reply = reply + 'no'
    }
    reply = reply + " coin"
    if (obj.gold>1 || !obj.gold) {
        reply = reply + 's'
    }
    reply = reply + "."
    console.log(reply);
};


//Switch statement to deal with various states of items.
export function examineItem(obj) {
    console.log(`\n`);
    console.log(obj.name.toUpperCase());
    console.log(obj.description);
    console.log(`The value of this item is: ${obj.value} gold`);
    if ("damage" in obj) {
        console.log(`The ${obj.name} can cause ${obj.damage} points of damage.`);
    };

     switch (obj.state) {
         case 0:
             console.log(`The ${obj.name} has been destroyed (or not appeared in the game yet).`);
             break;
         case 1:
             console.log(`The ${obj.name} is in the store, but you don't own it yet.`);
             break;
         case 2:
             console.log(`You have handled (but are no longer carrying) the ${obj.name}.`);
             break;
         case 3:
             console.log(`You are carrying the ${obj.name}.`);
             break;
         default:
             console.log(`You have no idea what the state of the ${obj.name} is.`);
     };

};

//Pouch
export var pouch = new Wallet ("leather pouch", 20, 3, 'DO NOT SELL');
pouch.description = "The finest of cows sacrificed themselves for this pouch!";

//Creating instances of the inventory objects in the gaming environment.
let woodenStick = new Weapon ("wooden stick", 1, 3, 1);
let portableTrebuchet = new Weapon ("pocket-sized trebuchet", 10, 1, 10);
let ironSword = new Weapon ("iron sword", 5, 1, 7);
let poisonousJellyBean = new Weapon ("poisonous jelly bean", 7, 1, 9);
let shimmeringBlade = new Weapon ("shimmering blade", 13, 1, 20);
let gun = new Weapon("gun", 20, 1, 50);
let healingPotion = new Consumable ("health regeneration potion", 1, 5, 5);
var existingItems = [woodenStick, pouch, portableTrebuchet, ironSword, poisonousJellyBean, shimmeringBlade, healingPotion, gun];

woodenStick.description = "The trees were generous, this stick will mould you into a great warrior!";
portableTrebuchet.description = "Take down the biggest of beasts with this little pocket-rocket!";
ironSword.description = "Crafted by the best iron monger in the village!";
poisonousJellyBean.description = "a lethal version of the children's favourite!";
shimmeringBlade.description = "a blade so shiny it's blinding";
healingPotion.description = "a potion to boost your health";
gun.description = "how did this get here?"

//Adding all current object instances to a running inventory.
export var playersInventory = [];
export var shopInventory = [];

for (let i of existingItems) {
  if (i.state === 3) {
      playersInventory.push(i);
  }else{
    shopInventory.push(i);
};
}