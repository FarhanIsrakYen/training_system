import express from 'express';
import * as ActivityController from '../../app/controllers/ActivityController.js';
import * as AuthController from '../../app/controllers/AuthController.js';
import * as SkillController from '../../app/controllers/SkillController.js';
import * as UserController from '../../app/controllers/UserController.js';
import { AuthenticateAndAuthorize } from '../../app/middlewares/AuthMiddleware.js';

const router = express.Router();

router.post('/auth/login', AuthController.login);
router.get('/auth/logout', AuthenticateAndAuthorize(), UserController.logout);

// skills
router.get('/skills', AuthenticateAndAuthorize(), SkillController.getSkills);

// user registration
router.post('/user', AuthenticateAndAuthorize("board"), UserController.register);

// activities
router.post('/activity', AuthenticateAndAuthorize("expert"), ActivityController.createActivity);
router.put('/activity/:id', AuthenticateAndAuthorize("expert"), ActivityController.updateActivity);
router.delete('/activity/:id', AuthenticateAndAuthorize("expert"), ActivityController.deleteActivity);
router.get('/activities/:skill_id', AuthenticateAndAuthorize(), ActivityController.getActivities);

export default router;