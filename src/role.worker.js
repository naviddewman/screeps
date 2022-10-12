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
        const container = Game.getObjectById('6344287f0eda7399b760688d');
        
        if (!creep.isFull() && !creep.memory.dumper) {
            creep.harvest(sources[0]);
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