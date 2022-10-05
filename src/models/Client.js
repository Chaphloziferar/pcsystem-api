import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    dni: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    firsName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    secondName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    firstSurname: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    secondSurname: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    address: {
        type: String,
        required: false,
        min: 4,
        max: 255
    },
    phoneNumber: {
        type: String,
        required: false,
        min: 4,
        max: 255
    }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model("Client", clientSchema);