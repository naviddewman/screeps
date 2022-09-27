
var roleBuilder = {
    
    run: function(creep) {
        const spawn = Game.spawns['Spawn1'];
        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
        // Take from specific container.
        const container = Game.getObjectById('633118832f3c176d63204257');
        
        if ((creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) && creep.memory.dumper == false) {
            creep.moveTo(container);
        }
        
        if ((creep.memory.dumper == false) && (creep.store.getFreeCapacity() == 0))
            creep.memory.dumper = true;
            
        
        if (targets.length && creep.memory.dumper) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
        
        if (creep.store.getUsedCapacity() == 0)
            creep.memory.dumper = false;
    }
};

module.exports = roleBuilder;