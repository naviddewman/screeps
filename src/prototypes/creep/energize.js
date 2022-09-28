require('prototypes.creep.utils');

Creep.prototype.energize = 
    function(store = false) {
        
        // if there is no targeted energy store, fetch from nearest store.
        if(!store) {
           const energyStores = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_STORAGE ||
                    s.structureType == STRUCTURE_CONTAINTER) &&
                    s.getUsedCapacity(RESOURCE_ENERGY) > 0    
           }); 

           const closestStore = creep.pos.findClosestByPath(energyStores);

           if (creep.withdraw(closestStore) == ERR_NOT_IN_RANGE)
                creep.moveTo(closestStore);
        }
        else {
            if (creep.withdraw(store) == ERR_NOT_IN_RANGE)
                creep.moveTo(store);
        }
    };