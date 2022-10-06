// creep to claim new rooms for the motherland.

module.exports = {
    name: 'coloniser',
    parts: [
        {type: CLAIM, factor: 1},
        {type: MOVE, factor: 1},
    ],

    run: function(creep) {
        const exit = creep.room.find(FIND_EXIT_BOTTOM);
        const homeRoom = 'E43N29';

        
            
            const controller = creep.room.controller;
            
            if (creep.room.name = homeRoom) {
                creep.moveTo(Game.flags.E44N29);
            }
            // else {

            // }
            
            // if(creep.claimController(controller) == ERR_NOT_IN_RANGE)
            //     creep.moveTo(controller);
        

    }
};