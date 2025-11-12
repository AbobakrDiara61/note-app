import express from 'express'
import Note from '../models/Note.js';
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from '../controllers/notesController.js';
const router = express.Router();
/** 
 * @typedef {Object} Note
 * @property {string} title
 * @property {string} description
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

router.route('/')
    .get(getNotes)
    .post(createNote);

router.route('/:id')
    .get(getNoteById)
    .put(updateNote)
    .patch((req, res) => {
        res.send("You Updated The Note with The Associated ID");
    })
    .delete(deleteNote);

router.param('id', async(req, res, next, id) => {
    // This is a middleware function
    // One Of Middleware Use Cases is a check if the note exits in the database or not
    req.id = id;
    const note = await Note.findById(id);
    if(!note) {
        console.error("Param method called");
        return res.status(404).json({error: "Note Not Found Try a Different ID"});
    }
    next();
})

// module.exports = router
export default router