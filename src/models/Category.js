import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    imageUrl: {
        type: String,
        required: false,
        min: 6,
        max: 255
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);