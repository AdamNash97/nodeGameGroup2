export class Item {
    constructor(name, state, value) {
        this.name = name;
        this.state = state;
        this.value = value;
    }
};


export class Weapon extends Item {
    constructor(name, damage, state) {
        super(name, state, value);
        this.damage = damage;
    }
};


export class Wallet extends Item {
    constructor(name, gold, state) {
        super(name, state);
        this.gold = gold;
    }
};
