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
const Note = mongoose.model('Note', noteSchema);

export default Note