
var roleFixer = {
    
    run: function(creep) {
        
        const targets = checkForRepairs(creep);
        console.log(targets);
        const lowestTarget = findLowestTarget(targets);
        
        const storage = Game.getObjectById('63340f12ac9df436b4f8618d');
        
        
        if ((creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) && creep.memory.dumper == false)
            creep.moveTo(storage);
            
        if (creep.memory.dumper == false && creep.store.getFreeCapacity() == 0)
                creep.memory.dumper = true;
            
        if (creep.memory.dumper) {
            if (creep.repair(lowestTarget) == ERR_NOT_IN_RANGE)
                creep.moveTo(lowestTarget);
        }
            
        if (creep.store.getUsedCapacity() == 0)
            creep.memory.dumper = false;
    }
};

var checkForRepairs = function(creep) {
    return creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType == STRUCTURE_CONTAINER ||
            structure.structureType == STRUCTURE_ROAD) &&
            structure.hits < structure.hitsMax);
        }
    });
}

var findLowestTarget = function(targets) {
    let lowest = 1000000000;
    let lowestTarget;
    for (let target in targets) {
        let hitsLeft = target.hitsMax - target.hits;
        //console.log(hitsLeft);
        if (hitsLeft < lowest) {
            lowest = hitsLeft;
            lowestTarget = target;
            
        }
    }
    return lowestTarget;
}

module.exports = roleFixer;