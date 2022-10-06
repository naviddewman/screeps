require('prototypes.tower');
require('prototypes.link');
require('prototypes.spawn');
require('prototypes.creep.utils');

var runTower = require('runTower');

const roles = {
    miner: require('role.miner'),
    hauler: require('role.hauler'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    harvester: require('role.harvester'),
    fixer: require('role.fixer'),
    coloniser: require('role.coloniser'),
    trucker: require('role.trucker'),
    combatEngineer: require('role.combatEngineer'),
    scavenger: require('role.savenger'),
    handler: require('role.handler'),
}

module.exports.loop = function() {
    
    
    for (let spawn in Game.spawns) {
        Game.spawns[spawn].doSpawning(roles);
    }
    
    for (let creep in Game.creeps) {
        Game.creeps[creep].doRole(roles);
    }
    
    const spawn = Game.spawns['Spawn1'];
    const towers = spawn.room.find(FIND_MY_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });


    for (var tower of towers) {
        runTower.run(tower);
    }

    const link = Game.getObjectById('63396cab64973c7a612afe7c');
    const destination = Game.getObjectById('633933adfaf8548fddf7dad2');
    link.sendTo(destination);
  
    
}

// var filterRole = function(role) {
//     return _.filter(Game.creeps, (creep) => creep.memory.role == role);
// }

// var createCreep = function(body, role) {
//     Game.spawns['Spawn1'].spawnCreep(body, role + Game.time, {
//         memory: {
//             role: role,
//             dumper: false,
//             repairing: false,
//             shutdown: false,
//             recycle: false,
//             pickUp: false,
//             attack: false
//         }
//     });
// }

// var createMiner = function(targetId) {
//     let body = [WORK,WORK,WORK,WORK,WORK,MOVE,MOVE];
//     Game.spawns['Spawn1'].spawnCreep(body, 'miner' + Game.time, {
//         memory: {
//             role: 'miner',
//             targetId: targetId
//         }
//     });
// }





