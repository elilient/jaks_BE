const Client = require("../models/client");
const User = require("../models/user");
const mongoose = require("mongoose");

module.exports = {
    // Clients Create
    async clientCreate(req, res, next) {
        try {
            const user = req.user._id;
            const { _id } = user;
            let client = new Client(req.body);
            client.set({ lawyerid: _id });
            let lawyer = await User.findByIdAndUpdate({ _id }, { $push: { clients: client } });
            await client.save();
            lawyer.save();
            res.status(201).send({client});
        } catch (error) {
            res.status(400).send(error)
        }

    },
}
