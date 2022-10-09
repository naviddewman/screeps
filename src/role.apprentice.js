require('prototypes.creep.harvest');
require('prototypes.creep.utils');

module.exports = {
    name: 'apprentice',
    parts: [
        {type: WORK, factor: 2},
        {type: CARRY, factor: 1},
        {type: MOVE, factor: 3},
    ],

    run: function(creep) {
        
        const controller = creep.room.controller;
        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
        if (!creep.isFull() && !creep.memory.dumper)
            creep.goHarvest(creep);
        
        creep.memory.dumper = creep.isFull();

        if (creep.memory.dumper && targets.length > 0) {
            let target = creep.pos.findClosestByPath(targets);

            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else if (targets.length < 1) {
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE)
                creep.moveTo(controller);
        }
    }
}