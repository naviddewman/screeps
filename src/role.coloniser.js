// creep to claim new rooms for the motherland.

var roleColoniser = {

    run: function(creep) {
        const exit = creep.room.find(FIND_EXIT_BOTTOM);
        const homeRoom = 'E43N29';

        if (creep.room.name == homeRoom)   
            creep.moveTo(exit[0]);

    }
};

module.exports = roleColoniser;