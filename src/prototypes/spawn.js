StructureSpawn.prototype.doSpawning = 
    function(roles) {
        const room = this.room;
        const creeps = room.find(FIND_MY_CREEPS);
        
        const globalScavengers = findGlobalCreeps('scavenger');
        const globalBuilders = findGlobalCreeps('builder');
        const globalColonisers = findGlobalCreeps('coloniser');

        let population = {};
        for (let name in roles)
            population[name] = _.sum(creeps, (c) => c.memory.role == name);

        const sources = this.room.find(FIND_SOURCES);

        for (let source of sources) {
            if (!_.some(creeps, c => c.memory.role == 'miner' && c.memory.targetId == source.id)) {
                var containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                });
                if (containers.length > 0) {
                    this.spawnTargetedCreep(roles['miner'], source.id);
                    break;
                }
            }
        }

        if (population['miniHauler'] < this.memory.miniHaulers) {
            this.spawnNonTargetedCreep(roles['miniHauler']);
        }
        
        if (population['worker'] < this.memory.miniWorkers) {
            this.spawnNonTargetedCreep(roles['worker']);
        }
        
        if (population['hauler'] < this.memory.haulers) {
            this.spawnNonTargetedCreep(roles['hauler']);
        }
        
        if (population['upgrader'] < this.memory.upgraders) {
            this.spawnNonTargetedCreep(roles['upgrader']);
        }
    
        if (population['fixer'] < this.memory.fixers) {
            this.spawnNonTargetedCreep(roles['fixer']);
        }
        
        if (population['trucker'] < this.memory.truckers) {
            this.spawnNonTargetedCreep(roles['trucker']);
        }

        if (population['apprentice'] < this.memory.apprentices) {
            this.spawnNonTargetedCreep(roles['apprentice']);
        }
    
        if (population['builder'] < this.memory.builders) {
            this.spawnNonTargetedCreep(roles['builder']);
        }
    
        if (population['combatEngineer'] < this.memory.combatEngineers) {
            this.spawnNonTargetedCreep(roles['combatEngineer']);
        }
    
        // if there is a room marked to be claimed and there is no coloniser already.
        if (Game.flags.claimRoom && globalColonisers.length < 1) {
            this.spawnTargetedCreep(roles['coloniser'], Game.flags.claimRoom);
        }
    
        if (population['hauler'] == 0 && this.spawning == null) {
            if (population['harvester'] < this.memory.harvesters) {
                this.spawnNonTargetedCreep(roles['harvester']);
            }
        }
    
        //if scavengers is in the spawn's memory
        if (this.memory.scavengers) {
            if (globalScavengers.length < this.memory.scavengers) {
                this.spawnNonTargetedCreep(roles['scavenger']);
            }
        }
        
        if (population['handler'] < this.memory.handlers) {
            this.spawnNonTargetedCreep(roles['handler']);
        }
    }

StructureSpawn.prototype.spawnNonTargetedCreep = 
    function(role) {
        const body = genBody(role);
        const name = role.name + '-' + this.room.name + '-' + String(Game.time).slice(-4);
        
        return this.spawnCreep(body, name, { 
            memory: {
                role: role.name,
                dumper: false
            }});
    }

StructureSpawn.prototype.spawnTargetedCreep = 
    function(role, targetId) {
        const body = genBody(role);
        const name = role.name + '-' + this.room.name + '-' + String(Game.time).slice(-4);
        
        return this.spawnCreep(body, name, { 
            memory: {
                role: role.name,
                dumper: false,
                targetId: targetId
            }});
    }

function genBody(role) {
    let body = [];
    for (let part of role.parts) {
        let partCount = part.factor;
        for (let i = 0; i < partCount; i++) { body.push(part.type); }
    }
    return body;
}

function findGlobalCreeps(role) {
    return _.filter(Game.creeps, (c) => c.memory.role == role);
}