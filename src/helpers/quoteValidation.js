import Joi from "joi";

// Add Quote Validation
const addQuoteValidation = (data) => {
    const schema = Joi.object({
        clientDni: Joi.string()
            .min(4)
            .required()
    });

    return schema.validate(data);
}

// Add Product to Quote Validation
const addProductToQuoteValidation = (data) => {
    const schema = Joi.object({
        quoteId: Joi.string()
            .min(4)
            .required(),
        productName: Joi.string()
            .min(4)
            .required()
    });

    return schema.validate(data);
}

// Delete Product from Quote Validation
const deleteProductFromQuoteValidation = (data) => {
    const schema = Joi.object({
        quoteId: Joi.string()
            .min(4)
            .required(),
        productName: Joi.string()
            .min(4)
            .required()
    });

    return schema.validate(data);
}

// Get Quote Validation
const getQuoteValidation = (data) => {
    const schema = Joi.object({
        quoteId: Joi.string()
            .min(4)
            .required()
    });

    return schema.validate(data);
}

// Edit Quote Status Validation
const editQuoteStatusValidation = (data) => {
    const schema = Joi.object({
        quoteId: Joi.string()
            .min(4)
            .required(),
        status: Joi.string()
            .min(4)
            .required()
    });

    return schema.validate(data);
}

// Delete Quote Validation
const deleteQuoteValidation = (data) => {
    const schema = Joi.object({
        quoteId: Joi.string()
            .min(4)
            .required()
    });

    return schema.validate(data);
}

exports.addQuoteValidation = addQuoteValidation;
exports.addProductToQuoteValidation = addProductToQuoteValidation;
exports.deleteProductFromQuoteValidation = deleteProductFromQuoteValidation;
exports.getQuoteValidation = getQuoteValidation;
exports.editQuoteStatusValidation = editQuoteStatusValidation;
exports.deleteQuoteValidation = deleteQuoteValidation;