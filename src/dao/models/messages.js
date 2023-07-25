import mongoose from "mongoose";

const messageCollection = 'messages';

const messagesSchema = mongoose.Schema({
    user: String,
    message: String
}, 
    {
        versionKey: false
    }
);

const messagesModel = mongoose.model(messageCollection, messagesSchema);
export default messagesModel;