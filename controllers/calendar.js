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
        res.send(calendar);
    },
    // Calendar show all entries
    async calendarShow(req,res, next) {
        let user = await User.findById(req.params.id);
        const { calendar } = user;
        res.send(calendar);
    },
    // Calendar show entry by ID
    async calendarShowId(req,res, next) {
        let user = await User.findById(req.params.id);
        const foundCalendar = user.calendar.find(calendar => calendar._id == req.params.calid);
        res.send(foundCalendar);
    },
    // Calendar delete entry
    async calendarDelete(req, res, next) {
        let user = await User.findById(req.params.id);
        const foundCalendar = user.calendar.find(calendar => calendar._id == req.params.calid);
        user.calendar.pull(foundCalendar);
        user.save();
        res.send("Entry deleted");
    },
};
