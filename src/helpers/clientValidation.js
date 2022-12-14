import Joi from "joi";

// Add Client Validation
const addClientValidation = (data) => {
    const schema = Joi.object({
        dni: Joi.string()
            .min(4)
            .required(),
        firsName: Joi.string()
            .min(2)
            .required(),
        secondName: Joi.string()
            .allow('')
            .required(),
        firstSurname: Joi.string()
            .min(2)
            .required(),
        secondSurname: Joi.string()
            .allow('')
            .required(),
        email: Joi.string()
            .min(4)
            .email()
            .required(),
        address: Joi.string()
            .allow('')
            .required(),
        phoneNumber: Joi.string()
            .allow('')
            .required()
    });

    return schema.validate(data);
}

// Get Client Validation
const getClientValidation = (data) => {
    const schema = Joi.object({
        dni: Joi.string()
            .min(4)
            .required()
    });

    return schema.validate(data);
}

// Get Client By Email Validation
const getClientByEmailValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(4)
            .email()
            .required()
    });

    return schema.validate(data);
}

// Update Client Validation
const updateClientValidation = (data) => {
    const schema = Joi.object({
        dni: Joi.string()
            .min(4)
            .required(),
        firsName: Joi.string()
            .min(2)
            .required(),
        secondName: Joi.string()
            .min(2),
        firstSurname: Joi.string()
            .min(2)
            .required(),
        secondSurname: Joi.string()
            .min(2),
        email: Joi.string()
            .min(4)
            .email(),
        address: Joi.string()
            .min(4),
        phoneNumber: Joi.string()
            .min(4)
            .required()
    });

    return schema.validate(data);
}

// delete Client Validation
const deleteClientValidation = (data) => {
    const schema = Joi.object({
        dni: Joi.string()
            .min(4)
            .required()
    });

    return schema.validate(data);
}

exports.addClientValidation = addClientValidation;
exports.getClientValidation = getClientValidation;
exports.getClientByEmailValidation = getClientByEmailValidation;
exports.updateClientValidation = updateClientValidation;
exports.deleteClientValidation = deleteClientValidation;