import mongoose from "mongoose";
import Folder from "../models/Folder.js";

const findFolder = async (req, res, next) => {
    const { identifier } = req.params;
    if (!identifier) {
        return res.status(400).json({ message: "Folder id or slug is required" });
    }
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
    
    try {
        const folder = isObjectId ? await Folder.findById(identifier) : await Folder.findOne({ slug: identifier, owner: req.user._id });
        console.log({ params: req.params, isObjectId, userId: req.user._id, owner: folder.owner })
        if(!folder)
            return res.status(404).json({ message: "Folder not found." });
        req.folder = folder;
        if(!folder.owner.equals(req.user._id))
            return res.status(403).json({ message: "You can't access." });
        next();
    } catch (error) {
        console.error("Error in findFolder middleware", error);
        return res.status(500).json({ message: "Failed to find folder" });
    }
}

const validateFolder = async (req, res, next) => {
    const { parentFolder: parentFolderId } = req.body;
    if (!parentFolderId) 
        return next();
    try {
 
        const parentFolder = await Folder.findById(parentFolderId);
        if(!parentFolder) 
            return res.status(400).json({ message: "Can't put a folder inside a non-existing one" }) 
        if(!parentFolder.owner.equals(req.user._id)) 
            return res.status(403).json({ message: "You do not have permission to use this parent folder." })
        if(parentFolder.status !== 'active')
            return res.status(400).json({ message: "Restore the folder first" })   

        req.parentFolder = parentFolder;
        return next();

    } catch (error) {
        console.error("Error in validateFolder middleware", error);
        return res.status(500).json({ message: "Internal server error while Validating" });
    }
}

export {
    findFolder,
    validateFolder,
};