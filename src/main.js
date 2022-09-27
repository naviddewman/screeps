var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleHarvester = require('role.harvester');
var roleHauler = require('role.hauler');
var roleMiner = require('role.miner');
var roleFixer = require('role.fixer');

module.exports.loop = function() {
    
    var upgraders = filterRole('upgrader');
    var builders = filterRole('builder');
    var harvesters = filterRole('harvester');
    var haulers = filterRole('hauler');
    var miners =  filterRole('miner');
    var fixers = filterRole('fixer');
    var creepsInRoom = Game.creeps;
    //console.log(miners);
    
    const repairTargets = checkForRepairs(haulers[0]);
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
    
    if (upgraders.length < 2) {
        createCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY], 'upgrader');
    }
    
    if (haulers.length < 3) {
        createCreep([WORK,MOVE,MOVE,CARRY,CARRY, CARRY], 'hauler');
    }
    
    // if (harvesters.length < 1) {
    //     createCreep([WORK,MOVE,MOVE,CARRY], 'harvester');
    // }
    
    if (builders.length < 3) {
        createCreep([WORK,WORK,MOVE,MOVE,CARRY,CARRY], 'builder');
    }
    
    
    if (repairTargets.length && fixers.length < 3) {
        createCreep([WORK,WORK,MOVE,MOVE,CARRY], 'fixer');
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
  
  for (var name in fixers) {
        var creep = fixers[name];
            if (repairTargets.length ==  0)
                creep.memory.recycle = true;   
        
      roleFixer.run(creep, repairTargets);
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

var checkForRepairs = function(creep) {
    return creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType == STRUCTURE_CONTAINER ||
            structure.structureType == STRUCTURE_ROAD) &&
            structure.hits < structure.hitsMax);
        }
    });
}





