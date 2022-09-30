require('prototypes.creep.utils');

var roleScavenger = {

    run: function(creep) {
        const homeRoom = 'E43N29';
        const targetRoom = 'EN43N28';
        const source = Game.getObjectById('5bbcaf829099fc012e63ab04');
        const storage = Game.getObjectById('63340f12ac9df436b4f8618d');

        if (!creep.isFull() && !creep.memory.dumper) {
            if (creep.room.name == homeRoom) {
                creep.moveTo(Game.flags.EN43N28);
            }
            
            if(creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);
        }
        else if (creep.isFull())
            creep.memory.dumper = true;
        
        if (creep.memory.dumper) {
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(storage);
        }

        if (creep.isEmpty())
            creep.memory.dumper = false;
    }
};

module.exports = roleScavenger;