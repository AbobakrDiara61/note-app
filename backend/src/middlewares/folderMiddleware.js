import Folder from "../models/Folder.js";

const findFolder = async (req, res, next) => {
    const { _id, slug } = req.params;
    // console.log({ params: req.params })
    if (!_id && !slug) {
        return res.status(400).json({ message: "Folder id or slug is required" });
    }

    try {
        let filter = {};
        if (_id) filter._id = _id;
        if (slug) {
            filter.owner = req.user._id;
            filter.slug = slug;
        }
        const folder = await Folder.findOne(filter);
        // console.log({ folder });
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