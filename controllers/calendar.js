const Client = require("../models/client");
const User = require("../models/user");
const Calendar = require("../models/calendar");
const mongoose = require("mongoose");

module.exports = {
    // Calendar create entry
    async calendarCreate(req, res, next) {
        let client = await Client.findById(req.params.id);
        let calendar = await new Calendar(req.body);
        client.calendar.push(calendar);
        client.save();
        res.send(client);
    },
    // Calendar show all entries
    async calendarShow(req,res, next) {
        let client = await Client.findById(req.params.id);
        res.send(client.calendar);
    },
};
