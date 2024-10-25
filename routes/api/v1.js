import express from 'express';
import {Authenticate, Authorize} from '../../app/middlewares/AuthMiddleware.js';
import * as AuthController from '../../app/controllers/AuthController.js';
import * as UserController from '../../app/controllers/UserController.js';
import * as SkillController from '../../app/controllers/SkillController.js';

const router = express.Router();

router.post('/auth/login', AuthController.login);
router.get('/auth/logout', Authenticate, UserController.logout);

// skills
router.get('/skills', Authenticate, SkillController.getSkills);


export default router;