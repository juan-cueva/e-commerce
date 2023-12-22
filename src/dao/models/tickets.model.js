import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ticketCollection = "tickets";

const ticketSchema = mongoose.Schema({
    code: { type: String, default: uuidv4 },
    purchase_datetime: {type: Date, default: Date.now},
    amount: Number,
    purchaser: String
})
{
    versionKey: false
}

const ticketsModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketsModel;