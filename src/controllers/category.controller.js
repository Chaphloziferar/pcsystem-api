import Category from "../models/Category";
import { addCategoryValidation, getCategoryValidation, updateCategoryValidation, deleteCategoryValidation } from "../helpers/categoryValidation";

const addCategory = async (req, res) => {
    // Validate the data
    const {error} = addCategoryValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if category is already in the database
    const categoryExist = await Category.findOne({name: req.body.name});
    if (categoryExist) return res.status(400).send('Category already exist');

    // Create a new category
    const category = new Category({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        quantity: 0
    });

    try {
        await category.save();
        return res.status(201).send('Category added');
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({categories: categories});
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getCategory = async (req, res) => {
    // Validate the data
    const {error} = getCategoryValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const category = await Category.findOne({name: req.body.name});
        return res.status(200).json({category: category});
    } catch (error) {
        return res.status(400).send(error);
    }
}

const updateCategory = async (req, res) => {
    // Validate the data
    const {error} = updateCategoryValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const filter = { name: req.body.name };
    const update = {
        description: req.body.description,
        imageUrl: req.body.imageUrl
    };

    try {
        const updatedCategory = await Category.findOneAndUpdate(filter, update, { new: true });
        if (!updatedCategory) return res.status(400).send('Product not found');

        return res.status(200).send('Product updated');
    } catch (error) {
        return res.status(400).send(error);
    }
}

const deleteCategory = async (req, res) => {
    // Validate the data
    const {error} = deleteCategoryValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const deletedCategory = await Category.findOneAndDelete({name: req.body.name});
        if (!deletedCategory) return res.status(400).send('Category not found');

        return res.status(200).send('Category deleted');
    } catch (error) {
        return res.status(400).send(error);
    }
}

exports.addCategory = addCategory;
exports.getCategories = getCategories;
exports.getCategory = getCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;