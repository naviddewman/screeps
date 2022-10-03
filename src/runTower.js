require('prototypes.tower');


var runTower = {

    run: function(tower) {

        console.log(tower);
        const hostile = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostile != undefined) { tower.attack(hostile); }
        else {
            tower.repairStructures();
        }
    }
};

module.exports = runTower;