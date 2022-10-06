require('prototypes.creep.utils');

module.exports = {
    name: 'handler',
    parts: [
        {type: CARRY, factor: 16},
        {type: MOVE, factor: 1},
    ],
    
    run: function(creep) {

        const link = Game.getObjectById('633933adfaf8548fddf7dad2');
        const storage = Game.getObjectById('63340f12ac9df436b4f8618d');
        
        if (creep.pos.x == 17 && creep.pos.y == 28) {
            if (!creep.isFull() && !creep.memory.dumper) {
                creep.withdraw(link, RESOURCE_ENERGY)
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

        // if creep is about to die and has energy, transfer energy to storage.
        if (creep.ticksToLive < 50 && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
            creep.transfer(storage, RESOURCE_ENERGY);
            
    }
};
