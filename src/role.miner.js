
module.exports = {
    
    name: 'miner',
    parts: [
        {type: WORK, factor: 5},
        {type: MOVE, factor: 2},
    ],
    
    
    
    run: function(creep) {
        const source = Game.getObjectById(creep.memory.targetId);
        const container = source.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];
    
        if (creep.pos.isEqualTo(container.pos))
            creep.harvest(source);
        else
            creep.moveTo(container);
    }
};