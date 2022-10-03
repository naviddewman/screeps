StructureTower.prototype.defend =
    function() {
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) { this.attack(target); }
    };

StructureTower.prototype.repairStructures =
    function() {
        const target = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
        });
        console.log(target);

        if (target) {
            this.repair(target);
        }
    };