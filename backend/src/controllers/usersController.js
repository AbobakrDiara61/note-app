import User from "../models/User.js";

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -refreshToken -verificationCode -verificationCodeExpiresAt');

        if(!users)
            return res.status(404).json({ message: 'No users found' });

        return res.status(200).json({ message: "Users Fetched Successfuly", users });
    } catch (error) {
        console.error("Error in getUsers controller", error);
        res.status(500).json({ message: "Faild to fetch users" });
    }
}

/* 
    1. Edit User Role By admin
    2. Edit Profile 
    3. Adding avatar
    4. Delete User By admin
*/

export {
    getUsers,
}