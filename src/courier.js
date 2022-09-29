require('prototypes.creep.energize');
require('prototypes.creep.utils');


var roleCourier = {
    run: function(creep) {
        const spawn = Game.spawns['Spawn1'];
        const container = Game.getObjectById('63308368c677e3f2efed7d86');

        if (!creep.isFull())
            creep.energize(container);
        
        else if (creep.isFull())
            creep.memory.dumper = true;

        if (creep.memory.dumper) {
            if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(spawn);
    
            if (creep.isEmpty())
                creep.memory.dumper = false;
            }
    }
};

module.exports = roleCourier;