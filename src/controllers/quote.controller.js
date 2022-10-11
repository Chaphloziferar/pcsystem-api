import Quote from "../models/Quote.js";
import Client from "../models/Client.js";
import Product from "../models/Product.js";
import { addQuoteValidation, addProductToQuoteValidation, deleteProductFromQuoteValidation, getQuoteValidation, deleteQuoteValidation } from "../helpers/quoteValidation.js";

const addQuote = async (req, res) => {
    // Validate the data
    const {error} = addQuoteValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const findClient = await Client.findOne({dni: req.body.clientDni});
    if (!findClient) return res.status(400).send("Client not found");
    const clientId = findClient._id;

    const status = "pending";

    // Create a new quote
    const quote = new Quote({
        client: clientId,
        products: [],
        total: 0,
        status: status
    });

    try {
        await quote.save();
        return res.status(201).send("Quote added");
    } catch (error) {
        return res.status(400).send(error);
    }
}

const addProductToQuote = async (req, res) => {
    // Validate the data
    const {error} = addProductToQuoteValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const findQuote = await Quote.findById(req.body.quoteId);
    if (!findQuote) return res.status(400).send("Quote not found");

    const findProduct = await Product.findOne({name: req.body.productName});
    if (!findProduct) return res.status(400).send("Product not found");
    const productId = findProduct._id;

    const productPrice = findProduct.price;
    const newTotal = findQuote.total + productPrice;

    const filter = {_id: req.body.quoteId};
    const update = {
        products: [...findQuote.products, productId],
        total: newTotal
    };

    try {
        const updatedQuote = await Quote.findOneAndUpdate(filter, update, {new: true});
        return res.status(200).send(updatedQuote);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const deleteProductFromQuote = async (req, res) => {
    // Validate the data
    const {error} = deleteProductFromQuoteValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const findQuote = await Quote.findById(req.body.quoteId);
    if (!findQuote) return res.status(400).send("Quote not found");

    const findProduct = await Product.findOne({name: req.body.productName});
    if (!findProduct) return res.status(400).send("Product not found");
    const productId = findProduct._id;

    const productExists = findQuote.products.includes(productId);
    if (!productExists) return res.status(400).send("Product not found in the quote");

    const productPrice = findProduct.price;
    const newTotal = findQuote.total - productPrice;

    let isDeleted = false
    let newProducts = findQuote.products.filter(product => {
        if(product.valueOf() === productId.valueOf() && !isDeleted) {
            isDeleted = true;
            return;
        }

        return product;
    });

    const filter = {_id: req.body.quoteId};
    const update = {
        products: [...newProducts],
        total: newTotal
    };

    try {
        const updatedQuote = await Quote.findOneAndUpdate(filter, update, {new: true});
        return res.status(200).send(updatedQuote);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find().populate("client").populate("products");
        return res.status(200).json({quotes: quotes});
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getQuote = async (req, res) => {
    // Validate the data
    const {error} = getQuoteValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const quote = await Quote.findOne({_id: req.body.quoteId}).populate("client").populate("products");
        return res.status(200).json({quote: quote});
    } catch (error) {
        return res.status(400).send(error);
    }
}

const deleteQuote = async (req, res) => {
    // Validate the data
    const {error} = deleteQuoteValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        await Quote.findOneAndDelete({_id: req.body.quoteId});
        return res.status(200).send("Quote deleted");
    } catch (error) {
        return res.status(400).send(error);
    }
}

exports.addQuote = addQuote;
exports.addProductToQuote = addProductToQuote;
exports.deleteProductFromQuote = deleteProductFromQuote;
exports.getQuotes = getQuotes;
exports.getQuote = getQuote;
exports.deleteQuote = deleteQuote;