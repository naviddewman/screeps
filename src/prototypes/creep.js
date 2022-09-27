// Commonly used functions are called from here to increase readability.

Creep.prototype.findSources = 
    function() {
        return this.room.find(FIND_SOURCES);
    };