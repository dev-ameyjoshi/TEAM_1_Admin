const {getEvents, newEvent, updateEvent, deleteEvent} = require("../Controllers/events");

module.exports = (app) => {
    app.get('/events', getEvents);
    app.post('/events/newEvent', newEvent);
    app.put('/events/:title', updateEvent);
    app.delete('/events/deleteEvent', deleteEvent);
}
