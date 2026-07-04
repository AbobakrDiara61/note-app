import api from "./api";

const createFolder      = async (folder) => api.post('/folder', folder);
const getFolders        = async () => api.get('/folder');
const updateFolder      = async (identifier, folder) => api.put(`/folder/${identifier}`, folder);
const softDeleteFolder  = async (identifier) => api.patch(`/folder/soft-delete/${identifier}`);
const restoreFolder     = async (identifier) => api.patch(`/folder/restore/${identifier}`);
const archiveFolder     = async (identifier) => api.patch(`/folder/archive/${identifier}`);
const pinFolder         = async (identifier) => api.patch(`/folder/pin/${identifier}`);
const unpinFolder       = async (identifier) => api.patch(`/folder/unpin/${identifier}`);
const deleteFolder      = async (identifier) => api.delete(`/folder/${identifier}`);

export {
    createFolder,
    getFolders,
    updateFolder,
    softDeleteFolder,
    restoreFolder,
    archiveFolder,
    pinFolder,
    unpinFolder,
    deleteFolder,
};