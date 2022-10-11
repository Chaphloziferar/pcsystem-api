import Joi from 'joi';

// Add Product Validation
const addProductValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .required(),
        description: Joi.string()
            .min(6)
            .required(),
        price: Joi.number()
            .min(6)
            .required(),
        category: Joi.string()
            .min(4)
            .required()
    });

    return schema.validate(data);
}

// Get Product Validation
const getProductValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .required()
    });

    return schema.validate(data);
}

// Update Product Validation
const updateProductValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .required(),
        description: Joi.string()
            .min(6)
            .required(),
        category: Joi.string()
            .min(4)
            .required()
    });

    return schema.validate(data);
}

// Update Product Price Validation
const updateProductPriceValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .required(),
        price: Joi.number()
            .min(6)
            .required()
    });

    return schema.validate(data);
}

// Delete Product Validation
const deleteProductValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .required()
    });

    return schema.validate(data);
}

exports.addProductValidation = addProductValidation;
exports.getProductValidation = getProductValidation;
exports.updateProductValidation = updateProductValidation;
exports.updateProductPriceValidation = updateProductPriceValidation;
exports.deleteProductValidation = deleteProductValidation;