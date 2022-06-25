import mongoose from 'mongoose';
const { Schema } = mongoose;

const NoteSchema = new Schema({
    titile : {
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "General"
    },
    date: {
        type: date,
        default: date.now
    }
});

module.exports = mongoose.model('note', NoteSchema);