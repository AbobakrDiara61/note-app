import Note from '../models/Note.js';
export const getNotes = async (req, res) => {
    try {
        /** @type {import('mongoose').Document[]} */
        const notes = await Note.find().sort({createdAt: -1}); // -1 for descending newest first 
        res.json(notes);
    } catch (error) {
        console.log("Error in getAllnotes Controller", error);
        res.status(500).send("Error With Fetching Notes");
    }
}

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.id);
        if(!note) 
            return res.status(404).json({error: "Note Not Found"});
        res.json(note);
    } catch (error) {
        console.error("Error in getNoteById Controller", error);
        res.status(500).json({error: "Error With Fetching the note from the Database"});        
    }
}

export const createNote = async (req, res) => {
    try {
        const {title, description} = req.body;
        /** @type {import('mongoose').Document} */
        const note = new Note({title, description}); 
        const exists = await Note.findOne({title});
        if(exists) 
            return res.status(400).json({error: "Note Already Exists"});
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in CreatNote Controller", error);
        res.status(500).json({error: "Error With Creating The Note in Database"});
    }
}

export const updateNote = async (req, res) => {
    try {
        const {title, description} = req.body;
        const note = await Note.findByIdAndUpdate(req.id, {title, description}, {
            new: true
        });
        if(!note) 
            return res.status(400).json({error: "Error With Updating The Note in Database"});

        res.status(200).json(note);
        
    } catch (error) {
        console.error("error in updating note controller ",error);
        res.status(500).json({error: "Error With Updating The Note in Database"});
    }
}

export const deleteNote = async (req, res) => {
    /** @type {import('mongoose').Document} */
    try {
        const deletedNote = await Note.findByIdAndDelete(req.id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.json({message: "Note Deleted Successfully", deletedNote});
    } catch (error) {
        console.error("Error in deleteNote Controller", error);
        res.status(500).json({error: "Error With Deleting The Note in Database"});
    }
}