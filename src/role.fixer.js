require('prototypes.creep.utils');

var roleFixer = {
    
    run: function(creep) {
        
        const controller = creep.room.controller;
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax
        });
        
        const storage = Game.getObjectById('63340f12ac9df436b4f8618d');

        if (!creep.isFull() && !creep.memory.dumper) {
            creep.energize(storage);
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


module.exports = roleFixer;