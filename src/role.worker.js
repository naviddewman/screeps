require('prototypes.creep.utils');


module.exports = {
    name: 'worker',
    parts: [
        {type: WORK, factor: 1},
        {type: CARRY, factor: 1},
        {type: MOVE, factor: 2},
    ],

    run: function(creep) {
        const sources = creep.room.find(FIND_SOURCES);
        const controller = creep.room.controller;
        
        if (!creep.isFull() && !creep.memory.dumper) {
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
                creep.moveTo(sources[0]);
        }
        else if(creep.isFull())
            creep.memory.dumper = true;
        
        if (creep.memory.dumper) {
            if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE)
                creep.moveTo(controller);

        }

        if (creep.isEmpty())
            creep.memory.dumper = false;      
    }
};