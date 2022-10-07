require('prototypes.creep.utils');

module.exports = {
    
    name: 'fixer',
    parts: [
        {type: WORK, factor: 2},
        {type: CARRY, factor: 1},
        {type: MOVE, factor: 1},
    ],
    
    
    
    run: function(creep) {
        
        const sources = creep.room.find(FIND_SOURCES);
        const controller = creep.room.controller;
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_ROAD) &&
            s.hits < s.hitsMax
        });

        if (!creep.isFull() && !creep.memory.dumper) {
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
                creep.moveTo(sources[0]);
        }
        else if (creep.isFull())
            creep.memory.dumper = true;
        
        if (targets.length > 0 && creep.memory.dumper) {
            if (creep.memory.dumper) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE)
                    creep.moveTo(targets[0]);
            }
        }
        else if (creep.memory.dumper) {
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE)
                creep.moveTo(controller);
        }

        if(creep.isEmpty())
            creep.memory.dumper = false;
    }    
};