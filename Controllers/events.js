const mongoose = require("mongoose");
const Event = mongoose.model("events");

const newEvent = async (req, res) => {
    const {title, description, status} = req.body;
    try {
        const existingEvent = await Event.findOne({title});
        if(existingEvent) throw "event already exists";

        let newEvent = await new Event({
            title, 
            description,
            status,
            updatedAt: new Date()
        }).save();
        console.log(newEvent);
        res.status(200).json({newEvent});
    } catch (e) {
        console.error(e);
        res.status(300).json({message: "something went wrong"});
    }
}

const getEvents = async (req, res) => {
    try {
        const events = await Events.find();
        if(!events) throw "There are no events";

        res.status(200).json({events});
    } catch (e) {
        console.error(e);
        res.status(300).json({message: "something went wrong"});
    }
}

const updateEvent = async (req, res) => {
    const {title} = req.params;
    const {description, status} = req.body;
    try {
        let existingEvent = await Event.findOne({title});
        if(!existingEvent) throw "Event doesn't exist";

        let updatedEvent = {
            title: (title !== req.body.title)? req.body.title : title,
            description,
            status,
            updatedAt: new Date()
        }

        updatedEvent = await Event.findOneAndUpdate({title}, updatedEvent);
        res.status(200).json(updatedEvent);

    } catch (e) {
        console.error(e);
        res.status(300).json({message: "something went wrong"});
    }
}

exports.getEvents = getEvents;
exports.newEvent = newEvent;