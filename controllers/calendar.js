const User = require("../models/user");
const Calendar = require("../models/calendar");
const jwt = require("jsonwebtoken");
const mongodb = require('mongodb');

module.exports = {
    // Calendar create entry
    async calendarCreate(req, res, next) {
        let usertoken = req.headers.authorization.split(' ');
        let userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        let user = await User.findById(mongodb.ObjectId(userInfo._id));
        let calendar = await new Calendar(req.body);
        calendar.set({lawyer_id: userInfo._id})
        user.calendar.push(calendar);
        user.save();
        calendar.save();
        res.send(calendar);
    },
    // Calendar show all entries
    async calendarShow(req,res, next) {
        const usertoken = req.headers.authorization.split(' ');
        const userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        let user = await User.findById(mongodb.ObjectId(userInfo._id));
        let calendar = await Calendar.find({ lawyer_id: userInfo._id }, { lawyer_id: 0 });
        res.send(calendar);
    },
    // Calendar show entry by ID
    async calendarShowId(req, res, next) {
        let usertoken = req.headers.authorization.split(' ');
        let userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        let foundCalendar = await Calendar.findById(req.params.calid, { lawyer_id: userInfo._id, lawyer_id: 0 });
        res.send(foundCalendar);
    },
    // Calendar delete entry
    async calendarDelete(req, res, next) {
        let usertoken = req.headers.authorization.split(' ');
        let userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        await Calendar.findByIdAndDelete(req.params.calid);
        let user = await User.findById(userInfo._id);
        user.calendar.remove(req.params.calid);
        user.save();
        res.send("Entry deleted");
    },
    // Calendar update by ID
    async calendarUpdate(req, res, next) {
        let usertoken = req.headers.authorization.split(' ');
        let userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        let foundCalendar = await Calendar.findByIdAndUpdate(req.params.calid, req.body, { lawyer_id: userInfo._id, lawyer_id: 0, new: true });
        res.send(foundCalendar);
    },
};
