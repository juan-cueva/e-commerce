import mongoose from "mongoose";

const cartCollection = 'carts';

const cartsSchema = mongoose.Schema({
    products: {
        type: [
            {
                _id: false,
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: Number
            }
        ],
        default: []
    }
},
    {
        versionKey: false
    }
);

cartsSchema.pre("findOne", function (next) {
    this.populate("products.product");
    next();
});
const cartsModel = mongoose.model(cartCollection, cartsSchema);
export default cartsModel;