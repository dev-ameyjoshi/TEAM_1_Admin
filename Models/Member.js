// Member
// --Special Role
// ----Lead
// ----Heads
// ----Project Managers
// --Role
// ----Web Developer
// ----Android Developer
// ----Flutter Developer
// ----Multimedia
// ----Management
import {model, Schema} from 'mongoose';

const memberSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    linkedInProfile: {type: String, required: true},
    role: {type: String, required: true},
    specialRole: {type: String}
});

model("members", memberSchema);