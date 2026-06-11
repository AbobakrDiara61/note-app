import Folder from "../models/Folder.js";
import Note from "../models/Note.js";

const createFolder = async (req, res) => {
    try {
        const { _id } = req.user;
        const { name, slug, parentFolder, rootFolder, preferences } = req.body;

        if (!name)
            slug = `Untitled-Folder-${Date.now()}`;

        /*         let path = [];
                if (rootFolder) {
                    path.push(rootFolder);
                } else {
        
        } */
        const folder = await Folder.create({
            name,
            slug,
            parentFolder,
            rootFolder,
            preferences,
            owner: _id,

        });

        return res.status(201).json({
            message: "Folder created successfully.",
            folder,
        })
    } catch (error) {
        console.error("Error in createFolder controller", error);
        return res.status(500).json({ message: "Failed to create folder" });
    }
}

const getAllFolders = async (req, res) => {
    try {
        const folders = await Folder.find();
        if (!folders)
            return res.status(404).json({ message: "No folders found." })

        return res.status(200).json({
            message: "Folders fetched successfully.",
            folders,
        })
    } catch (error) {
        console.error("Error in getAllFolders controller", error);
        return res.status(500).json({ message: "Failed to get folders" });
    }
}

const getFilteredFolders = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error in getFilteredFolders controller");
        return res.status(500).json({
            message: "Failed to get folders"
        });
    }
}

const updateFolder = async (req, res) => {
    try {
        const folder = req.folder;
        const { name, slug, preferences } = req.body;

        folder.name = name;
        folder.slug = slug;
        folder.preferences = preferences;

        await folder.save();
        
        return res.status(200).json({
            message: "Folder updated successfully.",
            folder,
        })
    } catch (error) {
        console.error("Error in updateFolder controller", error);
        return res.status(500).json({ message: "Failed to update folder" });
    }
}

const hardDeleteFolder = async (req, res) => {
    try {
        const folder = req.folder;
        const result = await folder.deleteOne();

        // notes should be deleted if parent folder is hard deleted

        console.log({ result });

        if(!result.acknowledged)
            throw new Error("Database couldn't delete the folder");

        return res.status(200).json({
            message: "Folder deleted successfully.",
        });

    } catch (error) {
        console.error("Error in hardDeleteFolder controller", error);
        return res.status(500).json({ message: "Failed to delete folder" });
    }
}

const softDeleteFolder = async (req, res) => {
    try {
        const folder = req.folder;

        folder.deletedAt = new Date();
        folder.status = 'trash';
        await folder.save();

        // const children = await Folder.updateMany({ parentFolder: folder._id }, { status: 'trash', deletedAt: new Date() });
        // const notes = await Note.updateMany({ folder: folder._id }, { status: 'trash', deletedAt: new Date() });

        return res.status(200).json({
            message: "Folder deleted successfully.",
            folder,
            // children,
            // notes
        })
    } catch (error) {
        console.error("Error in softDeleteFolder controller", error);
        return res.status(500).json({ message: "Failed to soft delete folder" });
    }
}

const restoreFolder = async (req, res) => {
    try {
        const folder = req.folder;

        folder.status = 'active';
        folder.deletedAt = null;
        await folder.save();

        return res.status(200).json({
            message: "Folder restored successfully.",
            folder,
        })
    } catch (error) {
        console.error("Error in restoreFolder controller", error);
        return res.status(500).json({ message: "Failed to restore folder" });
    }
}

const archiveFolder = async (req, res) => {
    try {
        const folder = req.folder;

        folder.status = 'archived';
        await folder.save();
        // archive childern, notes - restore too
        return res.status(200).json({
            message: "Folder archived successfully.",
            folder,
        })
    } catch (error) {
        console.error("Error in archiveFolder controller", error);
        return res.status(500).json({ message: "Failed to archive folder" });
    }
}

const pinFolder = async (req, res) => {
    try {
        const folder = req.folder;

        folder.preferences.pinned = true;
        await folder.save();

        return res.status(200).json({
            message: "Folder pinned successfully.",
            folder,
        })
    } catch (error) {
        console.error("Error in pinFolder controller", error);
        return res.status(500).json({ message: "Failed to pin folder" });
    }
}

const unPinFolder = async (req, res) => {
    try {
        const folder = req.folder;

        folder.preferences.pinned = false;
        await folder.save();

        return res.status(200).json({
            message: "Folder unpinned successfully.",
            folder,
        })
    } catch (error) {
        console.error("Error in unPinFolder controller", error);
        return res.status(500).json({ message: "Failed to unpin folder" });
    }
}

export { createFolder, getAllFolders, updateFolder, softDeleteFolder, hardDeleteFolder, archiveFolder, restoreFolder, pinFolder, unPinFolder };