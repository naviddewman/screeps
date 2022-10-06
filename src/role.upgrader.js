require('prototypes.creep.utils');

module.exports = {
    
    name: 'upgrader',
    parts: [
        {type: WORK, factor: 4},
        {type: CARRY, factor: 2},
        {type: MOVE, factor: 5},
    ],
    
    
    
    run: function(creep) {
        
        if (creep.memory.targetRoom != undefined) {
            const storage = Game.getObjectById('63340f12ac9df436b4f8618d');

            if (!creep.isFull() && !creep.memory.dumper) {
                creep.energize(storage);
            }
            else if (creep.isFull())
                creep.memory.dumper = true;
            
            if (creep.memory.dumper && creep.room.name != creep.memory.targetRoom) {
                creep.moveTo(Game.flags.buildInRoom);
            }
            if (creep.memory.dumper && creep.room.name == creep.memory.targetRoom) {
                const controller = creep.room.controller;
                if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE)
                    creep.moveTo(controller);
            }
            if (creep.isEmpty())
                creep.memory.dumper = false;

        }
        else {
            const sources = creep.room.find(FIND_SOURCES);
            const controller = creep.room.controller;
            const containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                }
            });
         
            if ((creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) && creep.memory.dumper == false) {
                creep.moveTo(containers[0]);
            }
            
            if (creep.memory.dumper == false && creep.store.getFreeCapacity() == 0)
                    creep.memory.dumper = true;
    
            else if (creep.memory.dumper) {
                creep.moveTo(controller);
                creep.upgradeController(controller);
                
                if(creep.store.getUsedCapacity() == 0)
                    creep.memory.dumper = false;
            }
        }
        
        
        
        
    }
};

