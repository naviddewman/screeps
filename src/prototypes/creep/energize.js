require('prototypes.creep.utils');

Creep.prototype.energize = 
    function(store = false) {

        // if there is no targeted energy store, fetch from nearest store.
        if(!store) {
           const energyStores = this.room.find(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_STORAGE ||
                    s.structureType == STRUCTURE_CONTAINTER) &&
                    s.getUsedCapacity(RESOURCE_ENERGY) > 0    
           }); 
           const closestStore = this.pos.findClosestByPath(energyStores);

           if (this.withdraw(closestStore) == ERR_NOT_IN_RANGE)
                this.moveTo(closestStore);
        }
        else {
            console.log('else');
            if (this.withdraw(store) == ERR_NOT_IN_RANGE)
                this.moveTo(store);
        }
    };