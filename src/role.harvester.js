require('prototypes.creep.utils');



var roleHarvester = {
    
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        var controller = creep.room.controller;
        var spawn = Game.spawns['Spawn1'];
        
        
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            creep.moveTo(sources[0]);
        
        creep.drop(RESOURCE_ENERGY);
        
        // if(creep.memory.dumper == false && creep.store.getFreeCapacity() > 0) {
        //         creep.moveTo(sources[0]);
        //         creep.harvest(sources[0]);
        // }
        
        // if (creep.memory.dumper == false && creep.store.getFreeCapacity() == 0)
        //         creep.memory.dumper = true;

        // else if (creep.memory.dumper) {
        //     // creep.moveTo(25,27);
        //     //  if (creep.pos.x == 25 && creep.pos.y == 27)
        //     //      creep.drop(RESOURCE_ENERGY);
        //     creep.moveTo(spawn);
        //     creep.transfer(spawn, RESOURCE_ENERGY);
            
        //     if(creep.store.getUsedCapacity() == 0)
        //         creep.memory.dumper = false;
        // }
    }
};

module.exports = roleHarvester;