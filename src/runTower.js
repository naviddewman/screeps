require('prototypes.tower');


var runTower = {

    run: function(tower) {
        const hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostile != undefined) { tower.attack(hostile); }
        else {
            tower.repairStructures();
        }
    }
};

module.exports = runTower;