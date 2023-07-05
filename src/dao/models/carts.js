import mongoose from "mongoose";

const cartCollection = 'carts';

const cartsSchema = mongoose.Schema({
    products: [
        {
            product: {
                type: [
                    {
                        product: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "products"
                        }
                    }
                ]
            },
            quantity: Number
        }
    ]
},
    {
        versionKey: false
    });

    
const cartsModel = mongoose.model(cartCollection, cartsSchema);
export default cartsModel;