
var roleCombatEngineer = {

    run: function(creep) {
        
        const controller = creep.room.controller;
        const storage = Game.getObjectById('63340f12ac9df436b4f8618d');
        const tower = Game.getObjectById('633695b0521c81d44934dc18');
        const walls = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_WALL &&
                s.hits < 50000
        });
        const hostiles = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return object.getActiveBodyparts(ATTACK) == 0;
            }
        });
        
        creep.memory.attack = (hostiles.length > 0) ? true : false;
            
        if (creep.memory.attack) {
            if(creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE)
                creep.moveTo(hostiles[0]);
        }
        else {
            if(!creep.isFull() && !creep.memory.dumper) {
                creep.energize(storage);    
            }
            
            else if (creep.isFull())
                creep.memory.dumper = true;
            
            if (creep.memory.dumper) {
                // maintain tower
                if (tower.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        creep.moveTo(tower);
                }
                //fortify walls
                else if (walls.length > 0) {
                    if (creep.repair(walls[0]) == ERR_NOT_IN_RANGE)
                        creep.moveTo(walls[0]);
                }
                else {
                    if(creep.upgradeController(controller) ==  ERR_NOT_IN_RANGE)
                        creep.moveTo(controller);
                }
            }

            if (creep.isEmpty())
                creep.memory.dumper = false;
        }
        
        
        


        //maintain ramparts

    }

};

module.exports = roleCombatEngineer;