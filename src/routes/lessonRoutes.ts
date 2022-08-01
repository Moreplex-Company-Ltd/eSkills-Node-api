import { addLesson, upadateLesson } from "../controller/LessonController";

const express = require('express');
const passport =  require('passport')
const { session} = require('passport/lib');

const router = express.Router()



router.post('/', passport.authenticate('jwt', { session: false }), addLesson);
router.put('/', passport.authenticate('jwt', { session: false}), upadateLesson);

export default router;