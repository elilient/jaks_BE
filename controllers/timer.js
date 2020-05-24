const User = require("../models/user");
const Timer = require("../models/timer");
const jwt = require("jsonwebtoken");
const mongodb = require('mongodb');

module.exports = {
    // Timer create entry
    async timerCreate(req, res, next) {
        let usertoken = req.headers.authorization.split(' ');
        let userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        let user = await User.findById(mongodb.ObjectId(userInfo._id));
        let timer = await new Timer(req.body);
        timer.set({lawyer_id: userInfo._id});
        user.timer.push(timer);
        user.save();
        timer.save();
        res.send(timer);
    },
    // Timer show all entries
    async timerShow(req,res, next) {
        const usertoken = req.headers.authorization.split(' ');
        const userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        await User.findById(mongodb.ObjectId(userInfo._id));
        let timer = await Timer.find({ lawyer_id: userInfo._id }, { lawyer_id: 0 });
        res.send(timer);
    },
    // Timer show entry by ID
    async timerShowId(req,res, next) {
        let usertoken = req.headers.authorization.split(' ');
        let userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        let foundTimer = await Timer.findById(req.params.id, { lawyer_id: userInfo._id, lawyer_id: 0 });
        res.send(foundTimer);
    },
    // Timer delete entry
    async timerDelete(req, res, next) {
        let usertoken = req.headers.authorization.split(' ');
        let userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        await Timer.findByIdAndDelete(req.params.id);
        let user = await User.findById(userInfo._id);
        user.timer.remove(req.params.id);
        user.save();
        res.send("Entry deleted");
    },
    // Timer update by ID
    async timerUpdate(req, res, next) {
        let usertoken = req.headers.authorization.split(' ');
        let userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        let foundTimer = await Timer.findByIdAndUpdate(req.params.id, req.body, { lawyer_id: userInfo._id, lawyer_id: 0, new: true });
        res.send(foundTimer);
    }
};
