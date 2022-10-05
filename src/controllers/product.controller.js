import Product from '../models/Product';
import { addProductValidation, getProductValidation, updateProductValidation, updateProductPriceValidation, deleteProductValidation } from '../helpers/productValidation';

const addProduct = async (req, res) => {
    // Validate the data
    const {error} = addProductValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if product is already in the database
    const productExist = await Product.findOne({name: req.body.name});
    if (productExist) return res.status(400).send('Product already exist');

    // Create a new product
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    });

    try {
        await product.save();
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

const updateProduct = async (req, res) => {
    // Validate the data
    const {error} = updateProductValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const filter = { name: req.body.name };
    const update = {
        description: req.body.description, 
        category: req.body.category
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

        return res.status(200).send('Product deleted');
    } catch (error) {
        return res.status(400).send(error);
    }
}

exports.addProduct = addProduct;
exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.updateProduct = updateProduct;
exports.updateProductPrice = updateProductPrice;
exports.deleteProduct = deleteProduct;