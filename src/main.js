var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleHarvester = require('role.harvester');
var roleHauler = require('role.hauler');
var roleMiner = require('role.miner');
var roleFixer = require('role.fixer');
var roleColoniser = require('role.coloniser');
var roleTrucker = require('role.trucker');

module.exports.loop = function() {
    
    var upgraders = filterRole('upgrader');
    var builders = filterRole('builder');
    var harvesters = filterRole('harvester');
    var haulers = filterRole('hauler');
    var miners =  filterRole('miner');
    var fixers = filterRole('fixer');
    var colonisers = filterRole('coloniser');
    var truckers = filterRole('trucker');
    
    const spawn = Game.spawns['Spawn1'];
    
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
    
    if (haulers.length < 2) {
        createCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY,CARRY], 'hauler');
    }
    
    // if (upgraders.length < 2) {
    //     createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], 'upgrader');
    // }

    // if (fixers.length < 3) {
    //     createCreep([WORK,WORK,WORK,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY], 'fixer');
    // }
    
    // if (truckers.length < 1) {
    //     createCreep([CARRY,CARRY,CARRY,MOVE,MOVE], 'trucker');
    // }

    // if (builders.length < 3) {
    //     createCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY], 'builder');
    // }

    // if (colonisers.length < 1) {
    //     createCreep([MOVE,MOVE,MOVE,MOVE,CLAIM], 'coloniser');
    // }

    if (harvesters.length < 1) {
        createCreep([WORK,MOVE,MOVE,CARRY], 'harvester');
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
            pickUp: false
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





