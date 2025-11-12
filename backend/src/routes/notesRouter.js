import express from 'express'
import Note from '../models/Note.js';
const router = express.Router();
/** 
 * @typedef {Object} Note
 * @property {string} title
 * @property {string} description
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

router.route('/').get(async (req, res) => {
    try {
        /** @type {import('mongoose').Document[]} */
        const notes = await Note.find().sort({createdAt: -1}); // -1 for descending newest first 
        res.json(notes);
    } catch (error) {
        console.log("Error in getAllnotes Controller", error);
        res.status(500).send("Error With Fetching Notes");
    }
}).post(async (req, res) => {
    try {
        const {title, description} = req.body;
        /** @type {import('mongoose').Document} */
        const note = new Note({title, description}); 
        const notes = await Note.find();
        if(notes.find(n => n.title === note.title)) {
            return res.status(400).json({error: "Note Already Exists"});
        }
        const savedNote = await note.save({new: true});
        if(!savedNote) 
            return res.status(500).json({error: "Error With Creating The Note in Database"});
        
        // res.send("You Created The Note");
        
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in CreatNote Controller", error);
        res.status(500).json({error: "Error With Creating The Note in Database"});
    }
});

router.route('/:id').get(async(req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) 
            return res.status(404).json({error: "Note Not Found Try a Different ID"});
        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error With Fetching the note from the Database"});        
    }
}).put(async (req, res) => {
    try {
        const {title, description} = req.body;
        const note = await Note.findByIdAndUpdate(req.params.id, {title, description}, {
            new: true
        });
        // const note = Note.findById(req.params.id);
        /* if(!note) 
            return res.status(404).json({error: "Note Not Found Try a Different ID"}); */
        /* note.title = title;
        note.description = description;
        const updatedNote = await note.save({new: true}); */
        if(!note) 
            return res.status(404).json({error: "Note Not Found Try a Different ID"});
        res.status(200).json(note);
        
    } catch (error) {
        console.error("error in updating note controller ",error);
        res.status(500).json({error: "Error With Updating The Note in Database"});
    }
}).patch((req, res) => {
    res.send("You Updated The Note with The Associated ID");
}).delete(async (req, res) => {
    /** @type {import('mongoose').Document} */
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    // const note = Note.findById(req.params.id);
    if(!deletedNote) 
        return res.status(404).json({error: "Can't Delete A Not Existing Note"});
    // const deletedNote = note.deleteOne({new: true});
    res.json({message: "Note Deleted Successfully", ...deletedNote});
});

router.param('id', async(req, res, next, id) => {
    // req.params.id === id 

    next();
})

// module.exports = router
export default router