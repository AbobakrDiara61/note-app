import Folder from '../models/Folder.js';
import Note from '../models/Note.js';
import { pick, toCleanObject } from '../utils/sanitize.js';

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
export const moveNote       = makeNoteUpdater(
    (_, req) => ({ folder: req.body.folder }),
    "Note moved to the specified folder",
    "Failed to move note to folder"
)

const makeNoteCloner = (getOverrides, successMessage, errorMessaage) => async (req, res) => {
    try {
        const cleanedNote = toCleanObject(req.note);
        getOverrides && Object.assign(cleanedNote, getOverrides);
        const newNote = await Note.create({ ...cleanedNote, history: [] });

        return res.status(201).json({ message: successMessage });
    } catch (error) {
        console.error(`Error cloning note`, error);
        return res.status(500).json({ message: errorMessaage || "Failed to clone note" })
    }
}

export const copyNote = makeNoteCloner(
    (req) => ({ folder: req.body.folder }),
    "Note copied to the specified folder successfully",
    "Failed to copy note to folder",
    "copyNote"
);

export const duplicateNote = makeNoteCloner(
    null,
    "Note duplicated successfully",
    "Failed to duplicate note",
    "duplicateNote"
);

const makeNoteRetrieval = (getFilter, options = {}, successMessage, errorMessaage) => async (req, res) => {
    const PAGE_SIZE = 2;
    const filter = typeof getFilter === 'function' ? getFilter(req) : getFilter;
    filter.owner = req.user._id;
    filter.status = filter.status || 'active';

    const page  = Math.max(parseInt(req.query.page || options?.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || options?.limit, 10) || PAGE_SIZE, 1), 100);
    const skip = (page - 1) * limit;
    
    const sort = options.sort || { createdAt: -1 };

    console.log({
        queryPage: req.query?.page,
        queryLimit: req.query?.limit,
        page,
        limit,
        skip
    })
    try {
        const [notes, totalCount] = await Promise.all([
            Note.find(filter)
                                .populate('folder',   'name')
                                .populate('editedBy', 'name')
                                .skip(skip)
                                .limit(limit)
                                .sort(sort)
                                .lean(),
            Note.countDocuments(filter)
        ])

        res.status(200).json({ 
            message: successMessage || "Notes fetched successfully", 
            notes, 
            pagination: {
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            }
         });
    } catch (error) {
        console.error("Error in makeNoteRetrieval factory", error);
        res.status(500).json({ error: errorMessaage || "Error With retrieving The Notes in Database" });
    }

}

export const getUnfiledNotes  = makeNoteRetrieval(() => ({ folder: null }));
export const getRecentNotes   = makeNoteRetrieval(() => ({}), { sort: { updatedAt: -1 } });

export const getFolderNotes   = makeNoteRetrieval((req) => ({ folder: req.folder }), { sort: { updatedAt: -1 } });
export const getTrashNotes    = makeNoteRetrieval(() => ({ status: 'trash' }));
export const getArchivedNotes = makeNoteRetrieval(() => ({ status: 'archive' }));
export const getPinnedNotes   = makeNoteRetrieval(() => ({ pinned: true }));

export const search = async (req, res) => {
    const PAGE_SIZE = 2;
    const allowedQuery = ['status', 'contentType'];
    const allowedSort  = ['createdAt', 'updatedAt', 'title'];

    try {
        const { _id } = req.user;
        const { q, limit, page, sortBy = 'updatedAt', sortOrder = 'desc', ...queryParams } = req.query;

        const filter = allowedQuery.reduce((acc, key) => {
            return  queryParams[key] ? {...acc, [key]: queryParams[key].toString() } : acc;
        }, { owner: _id, status: { $ne: 'trash' } });

        if (queryParams.tags) {
            const tagList = queryParams.tags?.toString().split(',').map(t => t.trim()).filter(Boolean)
            if (tagList.length) filter.tags = { $in: tagList }
        }

        if(q) {
            const safeQ = q.toString().trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // const regex = new RegExp(safeQ, 'i');
            filter.$or = [
                { title: { $regex: safeQ, $options: 'i' } },
                { description: { $regex: safeQ, $options: 'i' } },
                { tags: { $regex: safeQ, $options: 'i' } },
            ]
        }

        const pageNum  = Math.max(parseInt(page, 10) || 1, 1);
        const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
        const skip = (pageNum - 1) * limitNum;

        const sort = { [allowedSort.some(s => s === sortBy) ? sortBy : 'createdAt']: sortOrder === 'asc' ? 1 : -1 };

        const [notes, total] = await Promise.all([
            Note.find(filter)
                .select('-history')
                .populate('folder', 'name')
                .populate('editedBy', 'name email')
                .skip(skip)
                .limit(limitNum)
                .sort(sort)
                .lean(),
            Note.countDocuments(filter),
        ]);

        res.json({ message: "Notes fetched successfully", notes });
    } catch (error) {
        console.error("Error in getAllnotes Controller", error);
        res.status(500).json({ error: "Error With Fetching Notes" });
    }
}