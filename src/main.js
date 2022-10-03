require('prototypes.tower');
require('prototypes.link');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleHarvester = require('role.harvester');
var roleHauler = require('role.hauler');
var roleMiner = require('role.miner');
var roleFixer = require('role.fixer');
var roleColoniser = require('role.coloniser');
var roleTrucker = require('role.trucker');
var roleCombatEngineer = require('role.combatEngineer');
var roleScavenger = require('role.scavenger');
var roleHandler = require('role.handler');
var runTower = require('runTower');

module.exports.loop = function() {
    
    var upgraders = filterRole('upgrader');
    var builders = filterRole('builder');
    var harvesters = filterRole('harvester');
    var haulers = filterRole('hauler');
    var miners =  filterRole('miner');
    var fixers = filterRole('fixer');
    var colonisers = filterRole('coloniser');
    var truckers = filterRole('trucker');
    var combatEngineers = filterRole('combatEngineer');
    var scavengers = filterRole('scavenger');
    var handlers = filterRole('handler');
    
    const spawn = Game.spawns['Spawn1'];
    const towers = spawn.room.find(FIND_MY_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    
    const sources = spawn.room.find(FIND_SOURCES);
    for (let source of sources) {
        if (!_.some(miners, c => c.memory.targetId == source.id)) {
            var containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });
            if (containers.length > 0) {
                createMiner(source.id);
                break;
            }
        }
    }
    
    if (haulers.length < 3) {
        createCreep([WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY], 'hauler');
    }
    
    if (upgraders.length < 1) {
        createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], 'upgrader');
    }

    // if (fixers.length < 3) {
    //     createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY], 'fixer');
    // }
    
    if (truckers.length < 1) {
        createCreep([CARRY,CARRY,CARRY,MOVE,MOVE], 'trucker');
    }

    if (builders.length < 2) {
        createCreep([WORK,WORK,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY], 'builder');
    }

    if (combatEngineers.length < 1) {
        createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], 'combatEngineer');
    }

    // if (colonisers.length < 1) {
    //     createCreep([MOVE,MOVE,MOVE,MOVE,CLAIM], 'coloniser');
    // }

    if (haulers.length == 0 && spawn.spawning == null) {
        if (harvesters.length < 1) {
            createCreep([WORK,MOVE,MOVE,CARRY], 'harvester');
        }
    }

    if (scavengers.length < 2) {
        createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 'scavenger');
    }
    
    if (handlers.length < 1) {
        createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], 'handler');
    }



    for (var name in upgraders) {
        var creep = upgraders[name];
        roleUpgrader.run(creep);
    }
    
    for (var name in harvesters) {
        var creep = harvesters[name];
        roleHarvester.run(creep);
    }
    
    for (var name in builders) {
        var creep = builders[name];
        roleBuilder.run(creep);
    }
   
   
    for (var name in haulers) {
        var creep = haulers[name];
        roleHauler.run(creep);
    }
   
    for (var name in miners) {
        var creep = miners[name];
        roleMiner.run(creep);
    }
    
    for (var name in truckers) {
        var creep = truckers[name];
        roleTrucker.run(creep);
      }
  
    for (var name in fixers) {
        var creep = fixers[name];
        roleFixer.run(creep);
    }

    for (var name in combatEngineers) {
        var creep = combatEngineers[name];
        roleCombatEngineer.run(creep, towers);
    }

    for (var name in scavengers) {
        var creep = scavengers[name];
        roleScavenger.run(creep);
    }

    for (var name in handlers) {
        var creep = handlers[name];
        roleHandler.run(creep);
    }

    for (var tower of towers) {
        runTower.run(tower);
    }

    // const tower = Game.getObjectById('633695b0521c81d44934dc18');
    // tower.defend();
    // tower.repairStructures();

    const link = Game.getObjectById('63396cab64973c7a612afe7c');
    const destination = Game.getObjectById('633933adfaf8548fddf7dad2');
    link.sendTo(destination);
  
    
}

var filterRole = function(role) {
    return _.filter(Game.creeps, (creep) => creep.memory.role == role);
}

var createCreep = function(body, role) {
    Game.spawns['Spawn1'].spawnCreep(body, role + Game.time, {
        memory: {
            role: role,
            dumper: false,
            repairing: false,
            shutdown: false,
            recycle: false,
            pickUp: false,
            attack: false
        }
    });
}

var createMiner = function(targetId) {
    let body = [WORK,WORK,WORK,WORK,WORK,MOVE,MOVE];
    Game.spawns['Spawn1'].spawnCreep(body, 'miner' + Game.time, {
        memory: {
            role: 'miner',
            targetId: targetId
        }
    });
}





