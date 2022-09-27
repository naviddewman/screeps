
var roleUpgrader = require('role.upgrader');
var roleHauler = {
    
    run: function(creep) {
        const spawn = Game.spawns['Spawn1'];
        const extenders = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION) &&
                (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });
   
        // const containers = creep.room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_CONTAINER &&
        //         structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
        //     }
        // });
        
        const container = Game.getObjectById('63308368c677e3f2efed7d86');
        
            
        if (creep.memory.dumper == false && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(container);
        }
            
        let num = spawn.store.getFreeCapacity(RESOURCE_ENERGY);
        if (creep.store.getFreeCapacity() == 0 && creep.memory.dumper == false) {
            creep.memory.dumper = true;
        }
            
        if (creep.memory.dumper && spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(spawn);
        }
                
        if (creep.memory.dumper && extenders.length && spawn.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            for (object in extenders) {
                if (creep.transfer(extenders[object], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    creep.moveTo(extenders[object]);
            }
        }
      
        if (creep.store.getUsedCapacity() == 0)
            creep.memory.dumper = false;
        
        // if there is no space in the extenders, upgrade controller
        if (extenders.length == false && spawn.store.getFreeCapacity(RESOURCE_ENERGY) == 0)
            roleUpgrader.run(creep);
       
    }
};
        

module.exports = roleHauler;