// Commonly used functions are called from the prototype to increase readability.
// Add ---> require('prototypes.creep') to modules that require these.

Creep.prototype.findSources = 
    function() {
        return this.room.find(FIND_SOURCES);
    };

Creep.prototype.findContainers =
    function(status) {
        const containers = this.room.find(FIND_STRUCTURES, {
            filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER); }
        });
        
        if (status == 'full') {
            return _.filter(containers, (c) => c.store.getFreeCapacity() == 0 );
        }
        else if (status == 'empty') {
            return _.filter(containers, (c) => c.store.getUsedCapacity() == 0);
        }
        else if (status == 'semi') {
            return _.filter(containers, (c) => c.store.getUsedCapacity() > 0);
        }
        else    
            return containers;
    };

Creep.prototype.findStorage = 
    function() {
        return this.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_STORAGE
        });
    }

Creep.prototype.isFull = 
    function() {
        return (this.store.getFreeCapacity() == 0 ? true : false);
    };

Creep.prototype.isEmpty = 
    function() {
        return (this.store.getUsedCapacity() == 0 ? true : false);
    };




    // Creep.prototype.findConstruction = 
//     function() {
//         // return all construction sites
//     };

