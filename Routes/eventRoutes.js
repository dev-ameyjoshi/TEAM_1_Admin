const {getEvents, newEvent} = require("../Controllers/events");

module.exports = (app) => {
    app.get('/events', getEvents);
    app.post('/events', newEvent);
    app.put('/events/:title');
}
