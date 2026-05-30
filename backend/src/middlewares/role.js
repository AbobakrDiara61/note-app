import User from "../models/User.js";

const role = async (req, res, next) => {
    try {
        const user = User.findById(req.user._id);
        if(!user)
            return res.status(404).json({ message: "User not found" });
        
        if(user.role !== 'admin') 
            return res.status(403).json({ message: "You don't have access to this endpoint" });

        next();
    } catch (error) {
        console.error("Error in role middleware", error);
        res.status(401).json({ message: "Faild To Authorize Role" });
    }

}

export default role;