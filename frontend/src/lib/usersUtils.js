import { getUsers } from "../service/usersService";

const fetchUsers = async () => await getUsers();

export {
    fetchUsers,
};