import mongoose from "mongoose";

const quoteSchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.models.Quote || mongoose.model("Quote", quoteSchema);