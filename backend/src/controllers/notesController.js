import Folder from '../models/Folder.js';
import Note from '../models/Note.js';
import { pick } from '../utils/sanitize.js';

export const getNotes = async (req, res) => {
    try {
        /** @type {import('mongoose').Document[]} */
        const { _id } = req.user;
        const notes = await Note.find({ owner: _id }).sort({ createdAt: -1 }); // -1 for descending newest first 
        res.json({ message: "Notes fetched successfully", notes });
    } catch (error) {
        console.error("Error in getAllnotes Controller", error);
        res.status(500).json({ error: "Error With Fetching Notes" });
    }
}

export const getNoteById = async (req, res) => {
    try {
        res.json({ message: "Note fetched successfully", note: req.note });
    } catch (error) {
        console.error("Error in getNoteById Controller", error);
        res.status(500).json({ error: "Error With Fetching the note from the Database" });
    }
}

export const createNote = async (req, res) => {
    try {
        const { _id } = req.user;
        const noteAttributes = pick(req.body, [ 'title', 'description', 'contentType', 'tags', 'folder', 'preferences']);
        const folderExists = await Folder.findById(noteAttributes.folder);
        if(!folderExists) 
            return res.status(400).json({ message: "The folder doesn't exists" });
        
        /** @type {import('mongoose').Document} */
        const note = new Note({ ...noteAttributes,  owner: _id });
        // const exists = await Note.findOne({ title: noteAttributes.title });
        // if (exists)
            // return res.status(202).json({ error: "Note Already Exists" });
        await note.save();
        return res.status(201).json({ message: "Note created successfully", note });
    } catch (error) {
        console.error("Error in CreatNote Controller", error);
        res.status(500).json({ error: "Error With Creating The Note in Database" });
    }
}

/* export const updateNote = async (req, res) => {
    try {
        const { _id: owner } = req.user;
        const noteAttributes = pick(req.body, [ 'title', 'description', 'contentType', 'tags', 'folder', 'preferences']);
        const note = req.note;
        Object.assign(note, noteAttributes);
        await note.save();
        
        res.status(200).json(note);

    } catch (error) {
        console.error("error in updating note controller ", error);
        res.status(500).json({ error: "Error With Updating The Note in Database" });
    }
} */

export const deleteNote = async (req, res) => {
    /** @type {import('mongoose').Document} */
    try {
        const note = req.note;
        await note.deleteOne();
        res.json({ message: "Note Deleted Successfully" });
    } catch (error) {
        console.error("Error in deleteNote Controller", error);
        res.status(500).json({ error: "Error With Deleting The Note in Database" });
    }
}

const makeNoteUpdater = (updates, successMessage, errorMessaage, options = {}) => async (req, res) => {
    try {
        const note = req.note;
        console.log(updates);
        const resolved = typeof updates === 'function' ? updates(note, req) : updates;
        Object.assign(note, resolved);
        note.editedAt = new Date();
        await note.save();

        const body = options.returnNote
            ? { note, message: successMessage }
            : { message: successMessage };

        return res.status(200).json(body);
    } catch (error) {
        console.error(`Error updating note:`, error);
        return res.status(500).json({ message: errorMessaage || "Failed to update note" });
    }
};

export const updateNote = makeNoteUpdater(
    (_, req) => pick(req.body, ['title', 'description', 'contentType', 'tags', 'folder', 'preferences']),
    "Note updated successfully",
    null,
    { returnNote: true }
);

export const softDeleteNote = makeNoteUpdater({ status: 'trash', deletedAt: new Date() }, "Note moved to trash");
export const archiveNote    = makeNoteUpdater({ status: 'archive' }, "Note archived successfully");
export const restoreNote    = makeNoteUpdater({ status: 'active', deletedAt: null },  "Note restored successfully");
export const pinNote        = makeNoteUpdater({ pinned: true }, "Note pinned successfully");
export const unpinNote      = makeNoteUpdater({ pinned: false }, "Note unpinned successfully");