import Joi from "joi";

// Add Category Validation
const addCategoryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(4)
            .required(),
        description: Joi.string()
            .min(6)
            .required(),
        imageUrl: Joi.string()
            .min(6)
            .optional()
            .allow("")
    });

    return schema.validate(data);
}

// Get Category Validation
const getCategoryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(4)
            .required()
    });

    return schema.validate(data);
}

// Update Category Validation
const updateCategoryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(4)
            .required(),
        description: Joi.string()
            .min(6)
            .required(),
        imageUrl: Joi.string()
            .min(6)
            .optional()
            .allow("")
    });

    return schema.validate(data);
}

// Delete Category Validation
const deleteCategoryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(4)
            .required()
    });

    return schema.validate(data);
}

exports.addCategoryValidation = addCategoryValidation;
exports.getCategoryValidation = getCategoryValidation;
exports.updateCategoryValidation = updateCategoryValidation;
exports.deleteCategoryValidation = deleteCategoryValidation;