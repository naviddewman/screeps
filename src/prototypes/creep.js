// Commonly used functions are called from the prototype to increase readability.
// Add ---> require('prototypes.creep') to modules that require these.
require('constants');


Creep.prototype.findSources = 
    function() {
        return this.room.find(FIND_SOURCES);
    };

Creep.prototype.findContainers =
    function(status) {
        const containers = this.room.find(FIND_STRUCTURES, {
            filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER); }
        });
        
        if (status == FULL) {
            return _.filter(containers, (c) => c.store.getFreeCapacity() == 0 );
        }
        else if (status == EMPTY) {
            return _.filter(containers, (c) => c.store.getUsedCapacity() == 0);
        }
        else    
            return containers;
    };
