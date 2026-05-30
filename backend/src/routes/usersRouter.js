import express from 'express'
import authenticate from '../middlewares/authentication.js'
import role from '../middlewares/role.js'
import { getUsers } from '../controllers/usersController.js'
 
const router = express.Router();

router.get('/', authenticate, role, getUsers);

export default router;