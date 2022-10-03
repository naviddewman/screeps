StructureTower.prototype.repairStructures =
    function() {
        const target = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
        });

        if (target) {
            this.repair(target);
        }
    };