require('prototypes.creep.energize');
require('prototypes.creep.utils');


module.exports = {

    name: 'trucker',
    parts: [
        {type: CARRY, factor: 3},
        {type: MOVE, factor: 2},
    ],
    
    
    
    run: function(creep) {
        const container = Game.getObjectById('633118832f3c176d63204257');
        const storage = creep.findStorage();
        
        if (!creep.isFull() && !creep.memory.dumper)
            creep.energize(container);
        
        else if (creep.isFull())
            creep.memory.dumper = true;
        
        if (creep.memory.dumper) {
            if(creep.transfer(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(storage[0]);

            if (creep.isEmpty())
                creep.memory.dumper = false;
        }
    }
};