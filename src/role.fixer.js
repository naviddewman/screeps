
var roleFixer = {
    
    run: function(creep, targets) {
        
        const spawn = Game.spawns['Spawn1'];
        const containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER &&
                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        
        if (creep.memory.recycle == false) {
        
            if ((creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) && creep.memory.dumper == false)
                creep.moveTo(containers[0]);
            
            if (creep.memory.dumper == false && creep.store.getFreeCapacity() == 0)
                    creep.memory.dumper = true;
            
            if (creep.memory.dumper) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE)
                    creep.moveTo(targets[0]);
            }
            
            if (creep.store.getUsedCapacity() == 0)
                creep.memory.dumper = false;
        }
        
        else {
            if (creep.memory.dumper) {
                if (creep.pos.x == 25 && creep.pos.y == 27)
                    creep.drop(RESOURCE_ENERGY);
                else
                    creep.moveTo(25,27);
            }
            
            if (creep.store.getUsedCapacity() == 0)
                creep.memory.dumper = false;
            
            if (creep.memory.dumper == false) {
                if (spawn.recycleCreep(creep) == ERR_NOT_IN_RANGE)
                    creep.moveTo(spawn);
                
            }
        }
    }
};

module.exports = roleFixer;