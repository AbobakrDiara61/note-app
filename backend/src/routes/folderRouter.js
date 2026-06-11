import express from 'express'
import {
    createFolder,
    getAllFolders,
    updateFolder,
    hardDeleteFolder,
    softDeleteFolder,
    restoreFolder,
    archiveFolder,
    pinFolder,
    unPinFolder
} from '../controllers/folderController.js';
import authentication from '../middlewares/authentication.js';
import { findFolder } from '../middlewares/folderMiddleware.js';
const router = express.Router();

router.get('/', authentication, getAllFolders);
// router.get('/id/_id', authentication, findFolder, getAllFolders);
// router.get('/id/slug', authentication, findFolder, getAllFolders);
router.post('/', authentication, createFolder);

router.put('/:_id', authentication, findFolder, updateFolder);

// copying or moving folder later to add
router.patch('/soft-delete/:_id', authentication, findFolder, softDeleteFolder);
router.patch('/restore/:_id', authentication, findFolder, restoreFolder);
router.patch('/archive/:_id', authentication, findFolder, archiveFolder);
router.patch('/pin/:_id', authentication, findFolder, pinFolder);
router.patch('/unpin/:_id', authentication, findFolder, unPinFolder);

router.delete('/id/:_id', authentication, findFolder, hardDeleteFolder);
router.delete('/slug/:slug', authentication, findFolder, hardDeleteFolder);

export default router;