import { useEffect } from "react";
import { fetchUsers } from "../../lib/usersUtils";

const AdminDashboard = () => {
    useEffect(() => {
        const loadUsers = async () => {
            console.log(await fetchUsers());
        }
        loadUsers();
    }, [])
    return (
        <div>AdminDashboard</div>
    )
}

export default AdminDashboard