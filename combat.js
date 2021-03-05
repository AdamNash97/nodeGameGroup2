import promptSync from 'prompt-sync';
import {locationChoice} from './index.js';
import * as math from 'mathjs';
import * as inv from './inventory.js'
const prompt = promptSync({sigint: true});
export class Player {
    constructor (name, health, maxHealth) {
        this.health = health;
        this.name = name;
        this.maxHealth = maxHealth;
    }
    Attack(enemy, Weapon) {
        let damage = math.randomInt(1, Weapon.damage);
        enemy.health = enemy.health - damage;
        console.log(`${this.name} deals ${damage} damage!`)
    }

    Flee() {
        let fleeProb = math.random()
            if (fleeProb < 0.2){
                console.log('You couldn\'t get away!')
            } else{
                console.log('Successfully fled!')
                locationChoice(0);
            }
    }
    useItem(Consumable) {
        if ((this.health + Consumable.healthRegen <= this.maxHealth)){
            this.health = 20
        } else {
            this.health = this.health + Consumable.healthRegen;
            playerHealthBar.increase(healthRegen);
            //console.log(playerHealthBar);

        }
        playersInventory.splice((playersInventory.indexOf(Consumable)),1);
    }
}

export class Monster {
    constructor (health, attack, name, value) {
        this.health = health;
        this.attack = attack;
        this.name = name;
        this.value = value;
    };
    Attack(player) {
        let damage = math.randomInt(1, this.attack);
        player.health = player.health - damage;
        playerHealthBar.decrease(damage);
        console.log(`${this.name} deals ${damage} damage!`)
        console.log(playerHealthBar);
    };
}

export function initiateCombat(player, monstersArray, playersInventory, pouch){
    //randomly selecting a monster//
    let selectedMonster = monstersArray[math.randomInt(0,9)];
    console.log(`You come across ${selectedMonster.name}, ${selectedMonster.description}`);
    console.log('What would you like to do?');
    combat(player, selectedMonster, playersInventory, pouch);
}
export function combat(player, selectedMonster, playersInventory, pouch) {
    console.log('1: Attack');
    console.log('2: Use a potion');
    console.log('3: Flee');
    
    let combatOption = prompt('Enter the number of the action you would like');
    combatOption = Number(combatOption);
    if (combatOption == 1){
        for (let i in playersInventory){
            if ("damage" in playersInventory[i]){
                console.log(`${i} :  ${playersInventory[i].name}, deals between 1 and ${playersInventory[i].damage} damage`);
            } else{}
        }
        const weaponchoice = prompt('Enter which weapon you would like to attack with')
        player.Attack(selectedMonster, playersInventory[Number(weaponchoice)]);
        console.log(`${selectedMonster.name} attacks you back!`)
        selectedMonster.Attack(player)
        healthCheck(selectedMonster, player, playersInventory, pouch)
    }
    else if (combatOption == 2){
        if ("potion" in playersInventory){
        useItem(healingPotion);
        console.log(`${selectedMonster.name} attacks while you're drinking the potion!`)
        selectedMonster.Attack(player)
        healthCheck(selectedMonster, player, playersInventory, pouch);
        }
        else {
            console.log('you don\'t have any potions!');
            combat(player, selectedMonster, playersInventory, pouch);
        }
    }
    else if (combatOption == 3){
        player.Flee();
        if(locationChoice.locationIndex == 5){
        selectedMonster.Attack(player)
        healthCheck(selectedMonster, player, playersInventory, pouch)
        }else{}
    }
}

export function healthCheck(selectedMonster, player, playersInventory, pouch){
if (selectedMonster.health <= 0){
    console.log(`Congratulations, you have defeated ${selectedMonster.name}!`);
    pouch.changeGold(selectedMonster.value);
    console.log(`You gained ${selectedMonster.value} gold!`);
    countMoney(pouch);
    locationChoice(0);
}
 else if (player.health <= 0){
    console.log(`Damn, you're an awful warrior, maybe try flipping burgers instead!`);
    pouch.changeGold(-pouch.gold / 2);
    console.log(`As punishment you've lost half your gold, sorry! \n You now have ${pouch.gold} gold in your pouch!`);
    locationChoice(0);
    } 
    
    else {
    combat(player, selectedMonster, playersInventory, pouch);
    }
}
//Creating health bar 

export function HealthBar(color, length) {
  this.barLength=length;
  this.color=color;
  this.isdead= false;
}
HealthBar.prototype.increase = function (amount) 
{
  if ( this.barLength<=20){this.barLength+=amount};
   this.changeColor();
}
HealthBar.prototype.decrease = function(amount)
{
 if (!this.isdead)
  {
         this.barLength-=amount;
  }
 this.changeColor;
}
HealthBar.prototype.changeColor= function()
{
   switch(this.barLength)
  {
     case (14<=this.barLength<=20):
     {
          this.color='yellow';
     }
      case (8<=this.barLength<=14):
     {
          this.color='orange';
     }
     case (1<=this.barLength<=8):
        {
             this.color='red';
        }
  }
}

//Instantiating health bars
const playerHealthBar= new HealthBar('green',20);
//const monsterHealthBar= new HealthBar('green',Monster.health);

//Creating instances of monsters to battle

let mrBlobby = new Monster(10,7, 'Mr. Blobby', 10);
let naughtySanta = new Monster(5,2, 'Naughty Santa', 5);
let satanHimself = new Monster(666,10,'Satan Himself', 20);
let regularPigeon = new Monster(10,50, 'a Pigeon', 100);
let rabidSquirrel = new Monster(7, 10, 'Rabid Squirrel', 10)
let zombie = new Monster(20, 3, 'Zombie', 10)
let shiaLaBeouf = new Monster(15, 4, 'Shia La Beouf', 69)

mrBlobby.description = "a spotted beast so rare that he tickle you down to the ground.";
naughtySanta.description = "an angry santa who fires elves at a rapid rate.";
satanHimself.description = "you don't wanna meet this boy in a dark alley.";
regularPigeon.description = "a completely normal pigeon";
rabidSquirrel.description = "just a little fluffy squirrel...thats foaming at the mouth and hungry for blood.";
zombie.description = "an ugly beast hungry for your brains."
shiaLaBeouf.description = "an actual cannibal!"

export var monstersArray = [mrBlobby,naughtySanta,satanHimself,mrBlobby,regularPigeon,rabidSquirrel,zombie,shiaLaBeouf,zombie,rabidSquirrel];
