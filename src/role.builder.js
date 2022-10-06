
module.exports = {
    name: 'builder',
    parts: [
        {type: WORK, factor: 2},
        {type: CARRY, factor: 2},
        {type: MOVE, factor: 4},
    ],

    
    
    run: function(creep) {
        const spawn = Game.spawns['Spawn1'];
        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        const controller = creep.room.controller;

        // Take from specific container.
        const container = Game.getObjectById('63340f12ac9df436b4f8618d');
        
        if ((creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) && creep.memory.dumper == false) {
            creep.moveTo(container);
        }
        
        if ((creep.memory.dumper == false) && (creep.store.getFreeCapacity() == 0))
            creep.memory.dumper = true;
        
        if (creep.memory.targetId != undefined && creep.room.name != creep.memory.targetId) {
            creep.moveTo(Game.flags.buildInRoom);
        }

        if (creep.memory.dumper) {
            if (targets.length > 0) {
                let target = creep.pos.findClosestByPath(targets);
                
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            // else {
            //     if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE)
            //         creep.moveTo(controller);
            // }  
        }
        
        if (creep.store.getUsedCapacity() == 0)
            creep.memory.dumper = false;
    }
};