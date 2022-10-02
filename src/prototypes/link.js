StructureLink.prototype.sendTo = 
function(destination) {

    if (this.store.getFreeCapacity(RESOURCE_ENERGY) == 0)
        this.transferEnergy(destination);
};