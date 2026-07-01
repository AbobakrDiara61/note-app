import mongoose from 'mongoose'

// Revision sub-schema
// * Each revision is a full snapshot of the note at a point in time.
const revisionSchema = new mongoose.Schema({
    title: String,
    description: String,
    contentType: {
        type: String,
        enum: ['text', 'markdown', 'jsx'],
        default: 'text'
    },
    tags: [String],
    coverImage: String,
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder'
    },
    editedAt: {
        type: Date,
        default: null
    },
    editedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    version: { type: Number, required: true, default: 1 },
    commit: { type: String, maxLength: 255, default: null },
}, { timestamps: true });

// Create a Schema
const noteSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    contentType: {
        type: String,
        enum: ['text', 'markdown', 'jsx'],
        default: 'text'
    },
    tags: [String],
    coverImage: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        unique: true,
    },
    status: {
        type: String,
        enum: ['active', 'archived', 'trash', 'favorite'],
        default: 'active'
    },
    deletedAt: {
        type: Date,
        default: null
    },
    editedAt: {
        type: Date,
        default: null
    },
    editedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    preferences: {
        color: {
            type: String,
            default: '#FFFFFF'
        },
        bgColor: {
            type: String,
            default: '#333'
        },
    },
    pinned: {
        type: Boolean,
        default: false
    },
    currentVersion: Number,
    history: [revisionSchema],

}, { timestamps: true } // created at and updated at
);

noteSchema.index({ owner: 1, folder: 1, status: 1 });
noteSchema.index({ owner: 1, status: 1, createdAt: -1 });

// Middleware

/**
 - Before saving: push the current state into history, then bump the version.
 - Only runs on updates, not the initial insert.
*/
noteSchema.pre('save', async function (next) {
    const oldDoc = await this.constructor.findById(this._id).lean();
    this._previousState = oldDoc;
    if (!this.isNew && (this.isModified('title') || this.isModified('description'))) {
        if (this.history.length >= 30) this.history.shift()

        this.history.push({
            title: this._previousState?.title ?? this.title,
            description: this._previousState?.description ?? this.description,
            contentType: this.contentType,
            tags: this.tags,
            coverImage: this.coverImage,
            folder: this.folder,
            editedAt: this.editedAt,
            editedBy: this.editedBy,
            version: this.currentVersion,
        })

        this.currentVersion += 1
        this.editedAt = new Date()
    }
    next()
})

// model bassed on the schema
/** @type {import('mongoose').Model} */
const Note = mongoose.model('Note', noteSchema);

export default Note