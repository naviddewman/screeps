require('prototypes.creep.utils');

var roleScavenger = {

    run: function(creep) {
        const homeRoom = 'E43N29';
        const targetRoom = 'E43N28';
        const source = Game.getObjectById('5bbcaf829099fc012e63ab04');
        const link = Game.getObjectById('63396cab64973c7a612afe7c');

        if (!creep.isFull() && !creep.memory.dumper) {
            if (creep.room.name == homeRoom) {
                creep.moveTo(Game.flags.EN43N28);
            }
            else {
                if(creep.harvest(source) == ERR_NOT_IN_RANGE)
                    creep.moveTo(source);
            }  
        }
        else if (creep.isFull())
            creep.memory.dumper = true;
        
        if (creep.memory.dumper) {
            if(creep.room.name !== homeRoom) {
                creep.moveTo(Game.flags.Home);
            }
            else {
                if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    creep.moveTo(link);
            }
        }

        if (creep.isEmpty())
            creep.memory.dumper = false;
    }
};

module.exports = roleScavenger;