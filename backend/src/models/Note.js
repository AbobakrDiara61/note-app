import mongoose from 'mongoose'
// Create a Schema
const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, {timestamps: true} // created at and updated at
);
// model bassed on the schema
/** @type {import('mongoose').Model} */
const Note = mongoose.model('Note', noteSchema);

export default Note