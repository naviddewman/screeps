// creep to claim new rooms for the motherland.

var roleColoniser = {

    run: function(creep) {
        const exit = creep.room.find(FIND_EXIT_BOTTOM);
        const homeRoom = 'E43N29';

        
            
            const controller = creep.room.controller;
            
            if (creep.room.name = homeRoom) {
                creep.moveTo(Game.flags.E44N29);
            }
            
            if(creep.claimController(controller) == ERR_NOT_IN_RANGE)
                creep.moveTo(controller);
        

    }
};

module.exports = roleColoniser;