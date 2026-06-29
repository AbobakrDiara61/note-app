import Folder from "../models/Folder.js";
import Note from "../models/Note.js";

const makeFolderUpdater = (overrides, message) => async (req, res) => {
    try {
        const folder = req.folder;
        Object.assign(folder, typeof overrides === "function" ? overrides(folder, req) : overrides);
        await folder.save();
        return res.status(200).json({ message, folder });
    } catch (error) {
        console.error(`Error: ${message} in makeFolderUpdater`, error);
        return res.status(500).json({ message: "Internal server error in updating the folder" });
    }
};

const cascadeUpdate = async (folderId, folderOverrides, noteOverrides) => {
    const folder = await Folder.findById(folderId);
    if (!folder) 
        return res.status(400).json({ message: "Can't update folder" });

    const resolvedFolderOverrides = typeof folderOverrides === "function"
        ? folderOverrides()
        : folderOverrides;

    const resolvedNoteOverrides = typeof noteOverrides === "function"
        ? noteOverrides()
        : (noteOverrides ?? resolvedFolderOverrides);

    Object.assign(folder, resolvedFolderOverrides);
    await folder.save();

    await Note.updateMany(
        { folder: folderId },
        { $set: resolvedNoteOverrides }
    );

    const subFolders = await Folder.find({ parentFolder: folderId });
    await Promise.all(subFolders.map(sub => cascadeUpdate(sub._id, folderOverrides, noteOverrides)));
};


const makeCascadeUpdater = (folderOverrides, noteOverrides, message) => async (req, res) => {
    try {
        await cascadeUpdate(req.folder._id, folderOverrides, noteOverrides);
        return res.status(200).json({ message, folder: req.folder });
    } catch (error) {
        console.error(`Error in cascadeUpdater [${message}]:`, error);
        return res.status(500).json({ message: "Internal server error in updating the folder" });
    }
};

const createFolder = async (req, res) => {
    try {
        const { _id } = req.user;
        const { parentFolder } = req.body;
        const { name, slug, preferences } = req.body;
        
        const path = parentFolder
            ? [...(parentFolder.path || []), parentFolder._id]
            : [];

        const folder = await Folder.create({
            name,
            slug,
            parentFolder: parentFolder?._id,
            path,
            preferences,
            owner: _id,

        });

        return res.status(201).json({ message: "Folder created successfully.", folder });
    } catch (error) {
        console.error("Error in createFolder controller", error);
        return res.status(500).json({ message: "Failed to create folder" });
    }
}

const getAllFolders = async (req, res) => {
    try {
        const { _id } = req.user;
        const folders = await Folder.find({ owner: _id });
        if (!folders)
            return res.status(404).json({ message: "No folders found." })

        return res.status(200).json({ message: "Folders fetched successfully.", folders })
    } catch (error) {
        console.error("Error in getAllFolders controller", error);
        return res.status(500).json({ message: "Failed to get folders" });
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
        
        return res.status(200).json({ message: "Folder updated successfully.", folder });
    } catch (error) {
        console.error("Error in updateFolder controller", error);
        return res.status(500).json({ message: "Failed to update folder" });
    }
}

const hardDeleteFolder = async (req, res) => {

    const hardDeleteCascade = async (folderId) => {
        await Note.deleteMany({ folder: folderId });
        const subFolders = await Folder.find({ parentFolder: folderId });
        await Promise.all(subFolders.map(sub => hardDeleteCascade(sub._id)));
        await Folder.findByIdAndDelete(folderId);
    }
    
    try {
        await hardDeleteCascade(req.folder._id);
        return res.status(200).json({ message: "Folder permanently deleted." });
    } catch (error) {
        console.error("Error in hardDeleteFolder", error);
        return res.status(500).json({ message: "Failed to delete folder" });
    }
};

const softDeleteFolder = makeCascadeUpdater(
    () => ({ status: "trash", deletedAt: new Date() }),
    null,
    "Folder deleted successfully."
);

const archiveFolder = makeCascadeUpdater(
    { status: "archived" },
    null,
    "Folder archived successfully."
);

const restoreFolder = makeCascadeUpdater(
    { status: "active", deletedAt: null },
    null,
    "Folder restored successfully."
);

const pinFolder        = makeFolderUpdater(       { pinned: true                              },  "Folder pinned successfully."   );
const unPinFolder      = makeFolderUpdater(       { pinned: false                             },  "Folder unpinned successfully." );

export { createFolder, getAllFolders, updateFolder, softDeleteFolder, hardDeleteFolder, archiveFolder, restoreFolder, pinFolder, unPinFolder };