// import { Schema, model } from 'mongoose';

// const ticketSchema =
//     new Schema() <
//     TicketDocument >
//     ({
//         type: { type: String, required: true },
//         index: { type: Number, required: true },
//         result: { type: Number, required: true },
//         leaf: { type: String, required: true },
//         proof: { type: [String], required: true },
//     },
//     { timestamps: true });

// const TicketModel = model < TicketDocument > ('Ticket', ticketSchema);

// export default TicketModel;

const mongoose = require('mongoose');

const TicketModel = new mongoose.Schema(
    {
        type: { type: String, required: true },
        index: { type: Number, required: true },
        result: { type: Number, required: true },
        leaf: { type: String, required: true },
        proof: { type: [String], required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Ticket', TicketModel);
