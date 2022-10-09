Creep.prototype.goHarvest = 
    function() {
        const sources = creep.room.find(FIND_SOURCES);

        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE)
            creep.moveTo(sources[1]);
    }