// Commonly used functions are called from the prototype to increase readability.
// Add ---> require('prototypes.creep') to modules that require these.

Creep.prototype.findSources = 
    function() {
        return this.room.find(FIND_SOURCES);
    };