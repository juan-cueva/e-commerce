import cartsModel from "../models/carts.js";

export default class Carts {
    createCart = async cart => {
        let result = await cartsModel.create(cart);
        return result;
    }

    getProductsInCart = async (cartId) => {
        let cart = undefined;
        if (cartId.match(/^[0-9a-fA-F]{24}$/)) {
            let cart = await cartsModel.findById(cartId).lean();
            return cart.products;
        }else{
            return cart;
        }
    }

    addProductToCart = async (cartId, productId) => {
        let cart = undefined;
        if (cartId.match(/^[0-9a-fA-F]{24}$/)) {
            let cart = await cartsModel.findById(cartId).lean();
            let products = cart.products.product._id;
            let cartUpdate = await cartsModel.findOneAndUpdate({_id: cartId},{ $push: {products: productId }}).lean();
            return cart.products;
        }else{
            return cart;
        }
    }
}