import mongoose from 'mongoose'

const folderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        default: 'Untitled Folder'
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        default: () => `untitled-folder-${Date.now()}`
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parentFolder: { // for Hierarchy
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        default: null
    },
    path: [mongoose.Schema.Types.ObjectId],
    status: {
        type: String,
        enum: ['active', 'archived', 'trash'],
        default: 'active'
    },
    deletedAt: {
        type: Date,
        default: null
    },
    preferences: {
        color: {
            type: String,
            default: '#D1D5DB'
        },
        icon: {
            type: String,
            default: 'Folder'
        },
    },
    pinned: {
        type: Boolean,
        default: false
    },
    noteCount: {
        type: Number,
        min: 0,
        default: 0,
    },
}, {
    timestamps: true
})

folderSchema.index({ owner: 1, slug: 1 }, { unique: true }); // slug must be unique per owner (not globally)

/** @type {import('mongoose').Model} */
const Folder = mongoose.model('Folder', folderSchema);

export default Folder;