require('prototypes.creep.utils');

var roleHandler = {
    
    run: function(creep) {

        const link = Game.getObjectById('633933adfaf8548fddf7dad2');
        const storage = Game.getObjectById('63340f12ac9df436b4f8618d');
        
        if (creep.pos.x == 17 && creep.pos.y == 28) {
            if (!creep.isFull() && !creep.memory.dumper) {
                if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    creep.moveTo(link); 
            }
            else if (creep.isFull()) {
                creep.memory.dumper = true;
            }
            if (creep.memory.dumper) {
                creep.transfer(storage, RESOURCE_ENERGY);

                if(creep.isEmpty())
                    creep.memory.dumper = false;
            }
        }
        else 
            creep.moveTo(17,28);
            
    }
};

module.exports = roleHandler;