const Client = require("../models/client");
const User = require("../models/user");
const Data = require("../models/data");
const jwt = require("jsonwebtoken");

module.exports = {
    // Clients Create
    async clientCreate(req, res, next) {
        try {
            let usertoken = req.headers.authorization.split(' ');
            let userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
            let client = new Client(req.body);
            client.set({ lawyerid: userInfo._id });
            await client.save();
            await User.findByIdAndUpdate(userInfo._id, { $push: { clients: client } });
            res.status(201).send(client);
        } catch (error) {
            res.status(400).send(error)
        }
    },
    // Clients Show Page
    async clientShow(req, res, next) {
        const usertoken = req.headers.authorization.split(' ');
        const userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        await User.findById(mongodb.ObjectId(userInfo._id));
        let client = await Client.find({ lawyer_id: userInfo._id }, { lawyer_id: 0 });
        res.send(client);
    },
    // Clients Update
    async clientUpdate(req, res, next) {
        let usertoken = req.headers.authorization.split(' ');
        let userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        let foundClient = await Client.findByIdAndUpdate(req.params.id, req.body, { lawyer_id: userInfo._id, lawyer_id: 0, new: true });
        res.send(foundClient);
    },
    // Clients Delete
    async clientDelete(req, res, next) {
        let usertoken = req.headers.authorization.split(' ');
        let userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        await Client.findByIdAndRemove(req.params.id);
        let user = await User.findById(userInfo._id);
        user.clients.remove(req.params.id);
        res.send("Deleted client");
    },
    // Clients Create Data
    async dataCreate(req, res, next) {
        let client = await Client.findById(req.params.id);
        let data = await new Data(req.body);
        client.data.push(data);
        client.save();
        res.send(client);
    },
};
