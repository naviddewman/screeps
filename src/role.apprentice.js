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
        const container = Game.getObjectById('63440446c677e3d2a7f324b9');
        
        if (!creep.isFull() && !creep.memory.dumper)
            creep.harvest(sources[1]);
        
        else if (creep.isFull())
            creep.memory.dumper = true;

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

        if (creep.isEmpty())
            creep.memory.dumper = false;
    }
}