import cartsModel from "../models/carts.js";

export default class Carts {
    createCart = async cart => {
        let result = await cartsModel.create(cart);
        return result;
    }
}