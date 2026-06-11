import mongoose from "mongoose";
import Folder from "../models/Folder.js";

const findFolder = async (req, res, next) => {
    const { identifier } = req.params;
    if (!identifier) {
        return res.status(400).json({ message: "Folder id or slug is required" });
    }
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
    
    try {
        console.log({ params: req.params, isObjectId })
        const folder = isObjectId ? await Folder.findById(identifier) : await Folder.findOne({ slug: identifier, owner: req.user._id });
        if(!folder)
            return res.status(404).json({ message: "Folder not found." });
        req.folder = folder;

        next();
    } catch (error) {
        console.error("Error in findFolder middleware", error);
        return res.status(500).json({ message: "Failed to find folder" });
    }
}

export {
    findFolder,
};