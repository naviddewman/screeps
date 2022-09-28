require('prototypes.creep.utils');

var roleUpgrader = {
    
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        var controller = creep.room.controller;
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
};

module.exports = roleUpgrader;


