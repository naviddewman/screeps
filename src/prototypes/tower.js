StructureTower.prototype.defend =
    function() {
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) { this.attack(target); }
    };

StructureTower.prototype.repair =
    function() {
        const targets = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_ROAD ||
                s.structureType == STRUCTURE_CONTAINER) &&
                s.hits < s.hitsMax
        });
        console.log(targets);

        if (targets.length > 0) {
            this.repair(targets[0]);
        }
    };