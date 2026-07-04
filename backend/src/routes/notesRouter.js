import express from 'express'
import Note from '../models/Note.js';
import { createNote, deleteNote, duplicateNote, getArchivedNotes, getFolderNotes, getNoteById, getNotes, getPinnedNotes, getRecentNotes, getTrashNotes, getUnfiledNotes, moveNote, archiveNote, copyNote, pinNote, restoreNote, search, softDeleteNote, unpinNote, updateNote } from '../controllers/notesController.js';
import authentication from '../middlewares/authentication.js';
import { findFolder } from '../middlewares/folderMiddleware.js';
const router = express.Router();
/** 
 * @typedef {Object} Note
 * @property {string} title
 * @property {string} description
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

router.route('/')
    .get(authentication, getNotes)
    .post(authentication, createNote);
router.get('/search', authentication, search);
router.get('/folder/:identifier', authentication, findFolder, getFolderNotes);

router.get('/unfiled' , authentication, getUnfiledNotes);
router.get('/recent'  , authentication, getRecentNotes);
router.get('/trash'   , authentication, getTrashNotes);
router.get('/archived', authentication, getArchivedNotes);
router.get('/pinned'  , authentication, getPinnedNotes);

router.route('/:id')
    .get(authentication, getNoteById)
    .put(authentication, updateNote)
    .delete(authentication, deleteNote);

router.patch('/soft-delete/:id', authentication, softDeleteNote);
router.patch('/archive/:id', authentication, archiveNote);
router.patch('/restore/:id', authentication, restoreNote);
router.patch('/pin/:id', authentication, pinNote);
router.patch('/unpin/:id', authentication, unpinNote);

router.patch('/move/:id', authentication, moveNote);
router.post('/copy/:id', authentication, copyNote);
router.post('/duplicate/:id', authentication, duplicateNote);

router.param('id', async(req, res, next, id) => {
    // This is a middleware function
    // One Of Middleware Use Cases is a check if the note exits in the database or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    req.id = id;
    const note = await Note.findById(id);
    if(!note) {
        console.error("Param method called");
        return res.status(404).json({error: "Note Not Found Try a Different ID"});
    }
    req.note = note;
    next();
})

export default router