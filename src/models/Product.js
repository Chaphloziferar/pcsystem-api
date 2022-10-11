import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    price: {
        type: Number,
        required: true,
        min: 6,
        max: 1024
    },
    category: {
        type: String,
        required: true,
        min: 4,
        max: 255
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);