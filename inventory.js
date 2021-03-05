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