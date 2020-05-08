const Client = require("../models/client");
const User = require("../models/user");
const Calendar = require("../models/calendar");
const mongoose = require("mongoose");

module.exports = {
    // Calendar create entry
    async calendarCreate(req, res, next) {
        let user = await User.findById(req.params.id);
        let calendar = await new Calendar(req.body);
        user.calendar.push(calendar);
        user.save();
        res.send(user);
    },
    // Calendar show all entries
    async calendarShow(req,res, next) {
        let user = await User.findById(req.params.id);
        const { calendar,} = user;
        res.send(calendar);
    },
    // Calendar show entry by ID
    async calendarShowId(req,res, next) {
        let user = await User.findById(req.params.id);
        for (let i = 0; i<user.calendar.length; i++) {
            if (user.calendar[i]._id == req.params.calid) {
                res.send(user.calendar[i]);
            }
        }
    },
    // Calendar delete entry
    async calendarDelete(req, res, next) {
        let calendar = await Calendar.findById(req.params.id);
        res.send(calendar);
    },
};
