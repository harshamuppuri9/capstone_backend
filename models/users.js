class User{
    constructor(id,firstName,lastName,email,mobile,image,city,role,inCart,purchases){
        this.id=id,
        this.firstName=firstName,
        this.lastName=lastName,
        this.email = email,
        this.mobile = mobile,
        this.image = image,
        this.city = city,
        this.role = role,
        this.inCart = inCart,
        this.purchases = purchases
    }
}

module.exports = User;