import api from "./api";

const createNote = async (note) => api.post('/notes', note);
const getNotes = async () => api.get('/notes');
const updateNote = async (id, note) => api.put(`/notes/${id}`, note);
const deleteNote = async (id) => api.delete(`/notes/${id}`);

export {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
};
