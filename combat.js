import promptSync from 'prompt-sync';
import {locationChoice} from './index.js';
import * as math from 'mathjs';

const prompt = promptSync({sigint: true});
//Player to take part in battle
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
    restoreHealth() {
        this.health = this.maxHealth;
    }

    useItem(Consumable, playersInventory) {
        if (this.health == this.maxHealth){
            console.log('You are already full health! You have lost your potion due to stupidity.')
        } else {
            if ((this.health + Consumable.healthRegen) >= this.maxHealth){
                this.health = this.maxHealth
                
            }
            else{
                this.health = this.health + Consumable.healthRegen;
                
            }
            console.log(`You have healed and now have ${this.health} health`)
           

        }
        playersInventory.splice((playersInventory.indexOf(Consumable)),1);
    }
}

//Monster to battle against
export class Monster {
    constructor (health, maxHealth, attack, name, value) {
        this.health = health;
        this.maxHealth = maxHealth;
        this.attack = attack;
        this.name = name;
        this.value = value;
    };
    Attack(player) {
        let damage = math.randomInt(1, this.attack);
        player.health = player.health - damage;
        console.log(`${this.name} deals ${damage} damage!`)
    };
}

//Begin combat events
export function initiateCombat(player, monstersArray, playersInventory, pouch){
    //randomly selecting a monster
    console.log(`\n`);
    let selectedMonster = monstersArray[math.randomInt(0,9)];
    console.log(`You come across ${selectedMonster.name}, ${selectedMonster.description}`);
    console.log('What would you like to do?');
    combat(player, selectedMonster, playersInventory, pouch);
}
//Initiate attack during combat
export function combat(player, selectedMonster, playersInventory, pouch) {
    console.log(`${selectedMonster.name} has ${selectedMonster.health} health`)
    console.log(`You have ${player.health} health`)
    console.log('1: Attack');
    console.log('2: Use a potion');
    console.log('3: Flee');
    let combatOption = prompt('Enter the number of the action you would like: ');
    combatOption = Number(combatOption);
    if (combatOption == 1){
        attackOption(player, selectedMonster, playersInventory, pouch);
    }
    else if (combatOption == 2){
        usePotion(player, selectedMonster, playersInventory, pouch);
    }
    else if (combatOption == 3){
        fleeOption(player, selectedMonster, playersInventory, pouch);
    } else{
    console.log('Invalid input, sorry.');
    combat(player, selectedMonster, playersInventory, pouch)
    }
}


//Function to check if Player or Monster is dead after each round of combat
export function healthCheck(selectedMonster, player, playersInventory, pouch){
if (selectedMonster.health <= 0){
    console.log("")
    console.log(`Congratulations, you have defeated ${selectedMonster.name}!`);
    console.log(`You gained ${selectedMonster.value} gold!`);
    pouch.changeGold(selectedMonster.value);
    console.log(`you have ${player.health} health`)
    selectedMonster.health = selectedMonster.maxHealth
    locationChoice(0);
}
 else if (player.health <= 0){
    console.log("")
    console.log(`Damn, you're an awful warrior, maybe try flipping burgers instead!`);
    console.log(`As punishment you've lost half your gold, sorry!`);
    pouch.changeGold(-pouch.gold / 2);
    player.health = player.maxHealth;
    console.log('your health has been restored');
    locationChoice(0);
    } 
    
    else {
    combat(player, selectedMonster, playersInventory, pouch);
    }
}

//Creating instances of monsters to battle
let mrBlobby = new Monster(10, 10, 7, 'Mr. Blobby', 10);
let naughtySanta = new Monster(5, 5, 2, 'Naughty Santa', 5);
let satanHimself = new Monster(666, 666, 10,'Satan Himself', 200);
let regularPigeon = new Monster(10, 10, 50, 'a Pigeon', 100);
let rabidSquirrel = new Monster(7, 7, 10, 'Rabid Squirrel', 10)
let zombie = new Monster(20, 20, 3, 'Zombie', 10)
let shiaLaBeouf = new Monster(15, 15, 4, 'Shia La Beouf', 69)

mrBlobby.description = "a spotted beast so rare that he'll tickle you down to the ground.";
naughtySanta.description = "an angry santa who fires elves at a rapid rate.";
satanHimself.description = "you don't wanna meet this boy in a dark alley.";
regularPigeon.description = "a completely normal pigeon...?";
rabidSquirrel.description = "just a little fluffy squirrel...thats foaming at the mouth and hungry for blood.";
zombie.description = "an ugly beast hungry for your brains.";
shiaLaBeouf.description = "an actual cannibal!";

export var monstersArray = [mrBlobby,naughtySanta,satanHimself,mrBlobby,regularPigeon,rabidSquirrel,zombie,shiaLaBeouf,zombie,rabidSquirrel];

//Creating a new player instance for the user that will be used globally across all modules
export var player = new Player('player', 20, 20);

//Attack option for combat
export function attackOption(player, selectedMonster, playersInventory, pouch) {
    for (let i in playersInventory){
        if ("damage" in playersInventory[i]){
            console.log(`${i} :  ${playersInventory[i].name}, deals between 1 and ${playersInventory[i].damage} damage`);
        }
    }
    const weaponchoice = prompt('Enter which weapon you would like to attack with: ')
    console.log("")
    if (playersInventory.includes(playersInventory[Number(weaponchoice)]) && "damage" in playersInventory[Number(weaponchoice)]){
        player.Attack(selectedMonster, playersInventory[Number(weaponchoice)]);
        if (selectedMonster.health > 0) {
            console.log(`${selectedMonster.name} attacks you back!`)
            selectedMonster.Attack(player)
            healthCheck(selectedMonster, player, playersInventory, pouch)
        } else {
            healthCheck(selectedMonster, player, playersInventory, pouch)
        }
    }
    else {
        console.log('invalid input')
        combat(player, selectedMonster, playersInventory, pouch);
    }
}

//Use potion option for combat
export function usePotion(player, selectedMonster, playersInventory, pouch) {
    for (let i in playersInventory){
        if ("damage" in playersInventory[i]){
            console.log(`${i} :  ${playersInventory[i].name}, deals between 1 and ${playersInventory[i].damage} damage`);
        }
    }
    const weaponchoice = prompt('Enter which weapon you would like to attack with: ')
    console.log("")
    if (playersInventory.includes(playersInventory[Number(weaponchoice)]) && "damage" in playersInventory[Number(weaponchoice)]){
        player.Attack(selectedMonster, playersInventory[Number(weaponchoice)]);
        if (selectedMonster.health > 0) {
            console.log(`${selectedMonster.name} attacks you back!`)
            selectedMonster.Attack(player)
            healthCheck(selectedMonster, player, playersInventory, pouch)
        } else {
            healthCheck(selectedMonster, player, playersInventory, pouch)
        }
    }
    else {
        console.log('invalid input')
        combat(player, selectedMonster, playersInventory, pouch);
    }
}

//Flee option for combat
export function fleeOption(player, selectedMonster, playersInventory, pouch) {
    let fleeProb = math.random()
             if (fleeProb < 0.2){
                 console.log('You couldn\'t get away!')
                 selectedMonster.Attack(player);
                 healthCheck(selectedMonster, player, playersInventory, pouch);
             } else{
                    console.log('Successfully fled!')
                    locationChoice(0);
                }    
}