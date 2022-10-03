



var roleHarvester = {
    
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        var controller = creep.room.controller;
        var spawn = Game.spawns['Spawn1'];
        const container = Game.getObjectById('63308368c677e3f2efed7d86');
        const storage = Game.getObjectById('63340f12ac9df436b4f8618d');
        const extenders = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION) &&
                (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        
        if (!creep.isFull() && !creep.memory.dumper) {
            creep.energize(storage);
            // if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            //     creep.moveTo(sources[0]);
        }

        if(creep.isFull())
            creep.memory.dumper = true;
        
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
        if (extenders.length == false && spawn.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE)
                creep.moveTo(controller);
        }
            
        
        // if(creep.memory.dumper == false && creep.store.getFreeCapacity() > 0) {
        //         creep.moveTo(sources[0]);
        //         creep.harvest(sources[0]);
        // }
        
        // if (creep.memory.dumper == false && creep.store.getFreeCapacity() == 0)
        //         creep.memory.dumper = true;

        // else if (creep.memory.dumper) {
        //     // creep.moveTo(25,27);
        //     //  if (creep.pos.x == 25 && creep.pos.y == 27)
        //     //      creep.drop(RESOURCE_ENERGY);
        //     creep.moveTo(spawn);
        //     creep.transfer(spawn, RESOURCE_ENERGY);
            
        //     if(creep.store.getUsedCapacity() == 0)
        //         creep.memory.dumper = false;
        // }
    }
};

module.exports = roleHarvester;