class vendingUnit {
    constructor(id,name,machine_image,locationDetails,products,details1,details2,details3,details4,details5,details6){
        this.id=id,
        this.name=name,
        this.machine_image=machine_image,
        this.locationDetails = locationDetails,
        this.products = products,
        this.details1 = details1,
        this.details2 = details2,
        this.details3 = details3,
        this.details4 = details4,
        this.details5 = details5,
        this.details6 = details6
    }
}

module.exports = vendingUnit;