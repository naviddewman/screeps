
var roleCombatEngineer = {

    run: function(creep, towers) {
        
        const drainedTowers = _.filter(towers, (t) => t.store.getFreeCapacity(RESOURCE_ENERGY) > 0);

        const controller = creep.room.controller;
        const storage = Game.getObjectById('63340f12ac9df436b4f8618d');
        const walls = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_WALL &&
                s.hits < 50000
        });
            
        if (!creep.isFull() && !creep.memory.dumper)
            creep.energize(storage);
        
        else if (creep.isFull())
            creep.memory.dumper = true;
        
        if(creep.memory.dumper) {
            if(drainedTowers.length > 0) {
                for (let tower of drainedTowers) {
                    if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        creep.moveTo(tower);
                }
            }
            else {
                //maintain walls
                //maintain ramparts
            }
            if (creep.isEmpty())
                creep.memory.dumper = false;
        }
    }
};



module.exports = roleCombatEngineer;