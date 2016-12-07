'use strict';

class Character{
    constructor(HP, NM){
        this.defaultHP = HP;
        this.health = HP;
        this.name = NM;
        this.power = 1;
        this.defence = 0;
    }

    getName()          {return this.name;}
    getHP()            {return this.health;}
    getDefaultHP()     {return this.defaultHP;}
    getPower()         {return this.power;}
    getDefence()       {return this.defence;}
    setHP(value)       {this.health  = value;}
    setPower(value)    {this.power   = value;}
    setDefence(value)  {this.defence = value;}
    fightWith(someone) {someone.setHP(someone.getHP() - (this.getPower() - someone.getDefence()));}
    addWeapon(type)    {
        this.setPower(type.getDamage());
        this.setDefence(type.getDefence());
    }
    logStats()         {console.log(this.getName(),'\'s health is', this.getHP(), 'and his power is', this.getPower());}
}

class Warrior extends Character {}
class Priest  extends Character{
    fightWith(someone) {
        if (this.getHP() < this.getDefaultHP()) {this.health += 1;}
        someone.setHP(someone.getHP() - this.getPower());
    }
}

class Battle {
    constructor(Character1, Character2){
        this.winner = 'default';

        for(var i = 0; Character1.getHP() > 0 && Character2.getHP() > 0; i++){
            Character1.fightWith(Character2);
            if(Character2.getHP() > 0) {Character2.fightWith(Character1);}
        }
        if (Character1.getHP() > 0 ) {this.setWinner(Character1);}
        else {this.setWinner(Character2);}
    }

    getWinner() {return this.winner;}
    setWinner(somebody) {this.winner = somebody.getName();}
    logWinner() {console.log('The winner of this battle is', this.getWinner());}
}

class Weapon {
    constructor(){
        this.damage = 1;
        this.defence = 0;
        this.setDamage();
        this.setDefence();
    }

    getDamage()  {return this.damage; }
    getDefence() {return this.defence;}
    setDamage()  {this.damage  = 1;}
    setDefence() {this.defence = 0;}
}

class Sword extends Weapon {
    setDamage()  {this.damage  = 7;}
    setDefence() {this.defence = 2;}
}

class Dagger extends Weapon {
    setDamage()  {this.damage  = 5;}
    setDefence() {this.defence = 4;}
    
}

class MagicRod extends Weapon {
    setDamage()  {this.damage  = 8;}
    setDefence() {this.defence = 1;}
}

module.exports.warrior  = Warrior;
module.exports.battle   = Battle;
module.exports.priest   = Priest;
module.exports.sword    = Sword;
module.exports.dagger   = Dagger;
module.exports.magicrod = MagicRod;