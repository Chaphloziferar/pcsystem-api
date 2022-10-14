import Product from '../models/Product';
import Category from '../models/Category';
import { addProductValidation, getProductValidation, getProductsByCategoryValidation, updateProductValidation, updateProductPriceValidation, deleteProductValidation } from '../helpers/productValidation';

const addProduct = async (req, res) => {
    // Validate the data
    const {error} = addProductValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if product is already in the database
    const productExist = await Product.findOne({name: req.body.name});
    if (productExist) return res.status(400).send('Product already exist');

    // Checking if category is already in the database
    const categoryExist = await Category.findOne({name: req.body.category});
    if (!categoryExist) return res.status(400).send('Category does not exist');
    const categoryId = categoryExist._id;

    // Create a new product
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: categoryId,
        imageUrl: req.body.imageUrl,
        stock: req.body.stock
    });

    // Update the category quantity
    const filter = { _id: categoryId };
    const update = { $inc: { quantity: 1 } };

    try {
        const productSaved = await product.save();
        if(!productSaved) return res.status(400).send('Product not saved');

        await Category.findOneAndUpdate(filter, update, {new: true});

        return res.status(201).send('Product added');
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({products: products});
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getProduct = async (req, res) => {
    // Validate the data
    const {error} = getProductValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const product = await Product.findOne({name: req.body.name});
        return res.status(200).json({product: product});
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getProductsByCategory = async (req, res) => {
    // Validate the data
    const {error} = getProductsByCategoryValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const category = await Category.findOne({name: req.body.category});
        if (!category) return res.status(400).send('Category does not exist');

        const products = await Product.find({category: category._id});
        return res.status(200).json({products: products});
    } catch (error) {
        return res.status(400).send(error);
    }
}

const updateProduct = async (req, res) => {
    // Validate the data
    const {error} = updateProductValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const filter = { name: req.body.name };
    const update = {
        description: req.body.description
    };

    try {
        const updatedProduct = await Product.findOneAndUpdate(filter, update, {new: true});

        if (!updatedProduct) return res.status(400).send('Product not found');

        return res.status(200).send('Product updated');
    } catch (error) {
        return res.status(400).send(error);
    }
}

const updateProductPrice = async (req, res) => {
    // Validate the data
    const {error} = updateProductPriceValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const filter = { name: req.body.name };
    const update = { price: req.body.price };

    try {
        const updatedProduct = await Product.findOneAndUpdate(filter, update, {new: true});

        if (!updatedProduct) return res.status(400).send('Product not found');

        return res.status(200).send('Product price updated');
    } catch (error) {
        return res.status(400).send(error);
    }
}

const deleteProduct = async (req, res) => {
    // Validate the data
    const {error} = deleteProductValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const deletedProduct = await Product.findOneAndDelete({name: req.body.name});
        if (!deletedProduct) return res.status(400).send('Product not found');
        
        const category = await Category.findById(deletedProduct.category);
        const filter = { _id: category._id };
        const update = { $inc: { quantity: -1 } };
        await Category.findOneAndUpdate(filter, update, {new: true});

        return res.status(200).send('Product deleted');
    } catch (error) {
        return res.status(400).send(error);
    }
}

exports.addProduct = addProduct;
exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.getProductsByCategory = getProductsByCategory;
exports.updateProduct = updateProduct;
exports.updateProductPrice = updateProductPrice;
exports.deleteProduct = deleteProduct;