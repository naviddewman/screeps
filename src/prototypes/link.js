StructureLink.prototype.sendTo = 
function(destination) {
    
    if (this.store.getFreeCapacity() == 0)
        this.transferEnergy(destination);
};