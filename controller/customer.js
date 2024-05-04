const { customer } = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

async function createCustomer(req, res) {
    let hash = null;
    if (req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        hash = bcrypt.hashSync(req.body.password, salt);
    }
    const newCustomer = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
        address: req.body.address,
        profile_image: req.body.profile_image,
    };

    try {
        const respData = await customer.create(newCustomer);
        res.json(respData);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}

async function checkCustomer(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const data = await customer.findOne({
            where: {
                email
            }
        });

        if (bcrypt.compareSync(password, data.password)) {
            // Generate token
            const token = jwt.sign({ id: data.id }, 'secretkey', { expiresIn: '1h' });
            res.cookie('token', token);
            res.json({ token });
        } else {
            res.json("Username or Email is incorrect!");
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

async function getCustomers(req, res) {
    try {
        const data = await customer.findAll({});
        if (data == null) res.send('User not found!!');
        else res.json(data);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

async function getCustomer(req, res) {
    const id = req.params.id;
    try {
        const data = await customer.findOne({
            where: {
                id
            }
        });
        if (data == null) res.send('User not found!!');
        else res.json(data);
    } catch (err) {
        res.send(err);
    }
}

async function updateCustomer(req, res) {
    try {
        const id = req.params.id;
        if (id == null) res.send('ID not found!!');

        let hash = null;
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            hash = bcrypt.hashSync(req.body.password, salt);
        }
        const newData = {
            name: req.body.name,
            password: hash,
            phone_number: req.body.phone_number,
            gender: req.body.gender,
            address: req.body.address,
            profile_image: req.body.profile_image,
        };

        const respData = await customer.update(newData, {
            where: {
                id
            }
        });

        if (respData[0] == 0) res.send('User not updated!!');
        else res.send('User updated successfully!!');
    } catch (err) {
        res.send(err);
    }
}

async function deleteCustomer(req, res) {
    try {
        const id = req.params.id;
        if (id == null) res.send('ID not found!!');

        const data = await customer.destroy({
            where: {
                id
            }
        });

        if (data == 0) res.send('Customer is deleted!!');
        else res.send('Customer has been deleted!!');
    } catch (err) {
        res.send(err);
    }
}

module.exports = { createCustomer, getCustomers, checkCustomer, getCustomer, updateCustomer, deleteCustomer };