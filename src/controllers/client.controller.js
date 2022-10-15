import Client from '../models/client.js';
import { addClientValidation, getClientValidation, getClientByEmailValidation, updateClientValidation, deleteClientValidation } from '../helpers/clientValidation.js';

const addClient = async (req, res) => {
    // Validate the data
    const {error} = addClientValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if client is already in the database
    const clientExist = await Client.findOne({dni: req.body.dni});
    if (clientExist) return res.status(400).send('Client already exist');

    // Create a new client
    const client = new Client({
        dni: req.body.dni,
        firsName: req.body.firsName,
        secondName: req.body.secondName,
        firstSurname: req.body.firstSurname,
        secondSurname: req.body.secondSurname,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    });

    try {
        await client.save();
        return res.status(201).send('Client added');
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        return res.status(200).json({clients: clients});
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getClient = async (req, res) => {
    // Validate the data
    const {error} = getClientValidation(req.query);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const client = await Client.findOne({dni: req.query.dni});
        return res.status(200).json({client: client});
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getClientByEmail = async (req, res) => {
    // Validate the data
    const {error} = getClientByEmailValidation(req.query);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const client = await Client.findOne({email: req.query.email});
        return res.status(200).json({client: client});
    } catch (error) {
        return res.status(400).send(error);
    }
}

const updateClient = async (req, res) => {
    // Validate the data
    const {error} = updateClientValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const filter = { dni: req.body.dni };
    const update = {
        firsName: req.body.firsName,
        secondName: req.body.secondName,
        firstSurname: req.body.firstSurname,
        secondSurname: req.body.secondSurname,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    };

    try {
        await Client.findOneAndUpdate(filter, update);
        return res.status(200).send('Client updated');
    } catch (error) {
        return res.status(400).send(error);
    }
}

const deleteClient = async (req, res) => {
    // Validate the data
    const {error} = deleteClientValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const client = await Client.findOneAndDelete({dni: req.body.dni});
        if (!client) return res.status(400).send('Client not found');
        return res.status(200).send('Client deleted');
    } catch (error) {
        return res.status(400).send(error);
    }
}

exports.addClient = addClient;
exports.getClients = getClients;
exports.getClient = getClient;
exports.getClientByEmail = getClientByEmail;
exports.updateClient = updateClient;
exports.deleteClient = deleteClient;