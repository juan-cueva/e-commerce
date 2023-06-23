import mongoose from "mongoose";

const cartCollection = 'carts';

const cartsSchema = mongoose.Schema({
    products: {
        type: Array,
        default: []
    }
});

const cartsModel = mongoose.model(cartCollection, cartsSchema);
export default cartsModel;