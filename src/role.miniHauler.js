require('prototypes.creep.utils');

module.exports = {
    name: 'miniHauler',
    parts: [
        {type: WORK, factor: 2},
        {type: CARRY, factor: 1},
        {type: MOVE, factor: 1},
    ],

    run: function(creep) {
        const controller = creep.room.controller;
        const sources = creep.room.find(FIND_SOURCES);
        const container = Game.getObjectById('63440446c677e3d2a7f324b9');
        const spawn = Game.spawns['Spawn2'];
        const extenders = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION) &&
                (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });

        if (!creep.isFull() && !creep.memory.dumper) {
            creep.energize(container);
        }
        
        else if (creep.isFull())
            creep.memory.dumper = true;
        
        // if spawn is not full --> prioritise filling spawn
        if (creep.memory.dumper && spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(spawn);
        }
        // if spawn is full and extensions are not, fill extentions
        if (creep.memory.dumper && extenders.length && spawn.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            for (object in extenders) {
                if (creep.transfer(extenders[object], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    creep.moveTo(extenders[object]);
            }
        }

        if (creep.memory.dumper && !extenders.length && spawn.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE)
                creep.moveTo(controller);
        }

        if(creep.isEmpty())
            creep.memory.dumper = false;
    }
};