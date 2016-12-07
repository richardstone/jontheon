var Warrior  = require('./jontheon').warrior;
var Battle   = require('./jontheon').battle;
var Priest   = require('./jontheon').priest;
var Sword    = require('./jontheon').sword;
var Dagger   = require('./jontheon').dagger;
var MagicRod = require('./jontheon').magicrod;
var expect   = require('chai').expect;

describe('Warriors: the game', function() {
  var jon;
  var theon;
  var priton;
  var battle;

  beforeEach(function() {
      jon = new Warrior(20, 'Jon');
      theon = new Warrior(12, 'Theon');
      priton = new Priest(14, 'Priton');
  });

  describe('Initializing', function() {

    it('should set Jon\'s HP to 20', function() {
      var jonHP = jon.getHP();
      expect(jonHP).to.eql(20);
    });

    it('should set Theon\'s HP to 12', function() {
      var theonHP = theon.getHP();
      expect(theonHP).to.eql(12);
    });

    it('should set Priton\'s HP to 14', function() {
      var pritonHP = priton.getHP();
      expect(pritonHP).to.eql(14);
    });

  });

  describe('Attack', function() {

    beforeEach(function(){
      jon.fightWith(theon);
    });

    it('After Jon attacks Theon, Jon\'s HP should be 20, but Theon\'s HP should be 11', function() {
      var jonHP = jon.getHP();
      var theonHP = theon.getHP();
      expect(jonHP).to.eql(20) && expect(theonHP).to.eql(11);
    });

    it('After Jon attacks Theon and Theon strikes back, Jon\'s HP should be 19, but Theon\'s HP should be 11', function() {
      theon.fightWith(jon);
      var jonHP = jon.getHP();
      var theonHP = theon.getHP();
      expect(jonHP).to.eql(19) && expect(theonHP).to.eql(11);
    });

  });

  describe('Battle: 2 warriors', function() {

    beforeEach(function(){
      battle = new Battle(jon, theon);
    });
    it('After a battle between Jon and Theon, Jon\'s HP should be 9, but Theon\'s HP should be 0', function() {
      var jonHP = jon.getHP();
      var theonHP = theon.getHP();
      expect(jonHP).to.eql(9) && expect(theonHP).to.eql(0);
    });

    it('After a battle between Jon and Theon, the winner should be Jon', function() {
      var winner = battle.getWinner();
      expect(winner).to.eql('Jon');
    });

  });

  describe('Priest', function() {

    beforeEach(function(){
      jon.fightWith(priton);
    });
    it('After Jon attacks Priton, Jon\'s HP should be 20, but Priton\'s HP should be 13', function() {
      var jonHP = jon.getHP();
      var pritonHP = priton.getHP();
      expect(jonHP).to.eql(20) && expect(pritonHP).to.eql(13);
    });

    it('After Jon attacks Priton and Priton strikes back, Jon\'s HP should be 19, but Priton\'s HP should be 14', function() {
      priton.fightWith(jon);
      var jonHP = jon.getHP();
      var pritonHP = priton.getHP();
      expect(jonHP).to.eql(19) && expect(pritonHP).to.eql(14);
    });

  });

  describe('Battle: 1 warrior 1 priest', function() {

    beforeEach(function(){
      battle = new Battle(jon, priton);
    });
    it('After a battle between Jon and Priton, Jon\'s HP should be 0, but Priton\'s HP should be 14', function() {
      var jonHP = jon.getHP();
      var pritonHP = priton.getHP();
      expect(jonHP).to.eql(0) && expect(pritonHP).to.eql(14);
    });

    it('After a battle between Jon and Priton, the winner should be Priton', function() {
      var winner = battle.getWinner();
      expect(winner).to.eql('Priton');
    });

  });

  describe('Weapons', function() {

    describe('Giving weapon to one character', function() {

      it('should give a sword to Jon, and after Jon attacks Theon, Theon\'s health should be 5', function() {
        jon.addWeapon(new Sword());
        jon.fightWith(theon);
        var theonHP = theon.getHP();
        expect(theonHP).to.eql(5);
      });

      it('should give a dagger to Jon, and after Jon attacks Theon, Theon\'s health should be 7', function() {
        jon.addWeapon(new Dagger());
        jon.fightWith(theon);
        var theonHP = theon.getHP();
        expect(theonHP).to.eql(7);
      });

      it('should give a magicrod to Jon, and after Jon attacks Theon, Theon\'s health should be 4', function() {
        jon.addWeapon(new MagicRod());
        jon.fightWith(theon);
        var theonHP = theon.getHP();
        expect(theonHP).to.eql(4);
      });

    });

    describe('Giving weapons to two character', function() {

      it('should give a sword to Jon and a dagger to Theon. After Jon attacks Theon, Theon\'s health should be 9', function() {
        jon.addWeapon(new Sword());
        theon.addWeapon(new Dagger());
        jon.fightWith(theon);
        var theonHP = theon.getHP();
        expect(theonHP).to.eql(9);
      });

    });

  });

});