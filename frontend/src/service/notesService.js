import api from "./api";

const createNote = async (note) => api.post('/notes', note);
const getNotes = async () => api.get('/notes');
const getNoteById = async (id) => api.get(`/notes/${id}`);
const updateNote = async (id, note) => api.put(`/notes/${id}`, note);
const deleteNote = async (id) => api.delete(`/notes/${id}`);

const searchNotes = async (query) => api.get(`/notes/search?${query}`);

const getFolderNotes = async (identifier) => api.get(`/notes/folder/${identifier}`);

const getUnfiledNotes   = async () => api.get('/notes/unfiled');
const getRecentNotes    = async () => api.get('/notes/recent');
const getTrashNotes     = async () => api.get('/notes/trash');
const getArchivedNotes  = async () => api.get('/notes/archived');
const getPinnedNotes    = async () => api.get('/notes/pinned');

const softDeleteNote    = async (id) => api.patch(`/notes/soft-delete/${id}`);
const archiveNote       = async (id) => api.patch(`/notes/archive/${id}`);
const restoreNote       = async (id) => api.patch(`/notes/restore/${id}`);
const pinNote           = async (id) => api.patch(`/notes/pin/${id}`);
const unpinNote         = async (id) => api.patch(`/notes/unpin/${id}`);

const moveNote      = async (id, body) => api.patch(`/notes/move/${id}`, body);
const copyNote      = async (id, body) => api.post(`/notes/copy/${id}`, body);
const duplicateNote = async (id) => api.post(`/notes/duplicate/${id}`);

export {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
    searchNotes,
    getFolderNotes,
    getUnfiledNotes,
    getRecentNotes,
    getTrashNotes,
    getArchivedNotes,
    getPinnedNotes,
    softDeleteNote,
    archiveNote,
    restoreNote,
    pinNote,
    unpinNote,
    moveNote,
    copyNote,
    duplicateNote,
};