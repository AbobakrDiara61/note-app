import api from "./api";

const getUsers = async () => api.get('/users');

export {
    getUsers,
};