import mongoose from "mongoose";

const productCollection = 'products';

const productsSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        thumbnails: String,
        code: String,
        stock: Number,
        status: Boolean,
        category: String
    },
    {
        versionKey: false
    });

const productsModel = mongoose.model(productCollection, productsSchema);
export default productsModel;