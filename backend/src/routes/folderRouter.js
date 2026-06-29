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
import { findFolder, validateFolder } from '../middlewares/folderMiddleware.js';
const router = express.Router();

router.get('/', authentication, getAllFolders);
// router.get('/id/_id', authentication, findFolder, getAllFolders);
// router.get('/id/slug', authentication, findFolder, getAllFolders);
router.post('/', authentication, validateFolder, createFolder);

router.put('/:identifier', authentication, findFolder, updateFolder);

// copying or moving folder later to add
router.patch('/soft-delete/:identifier', authentication, findFolder, softDeleteFolder);
router.patch('/restore/:identifier', authentication, findFolder, restoreFolder);
router.patch('/archive/:identifier', authentication, findFolder, archiveFolder);
router.patch('/pin/:identifier', authentication, findFolder, pinFolder);
router.patch('/unpin/:identifier', authentication, findFolder, unPinFolder);

router.delete('/:identifier', authentication, findFolder, hardDeleteFolder);

export default router;