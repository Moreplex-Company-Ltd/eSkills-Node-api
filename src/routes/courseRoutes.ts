import { addCourse, getAllCourses, getSingleCourse, updateCourseName } from "../controller/CourseController";

const express = require('express');
const passport = require('passport')
const { session } = require('passport/lib')

const router = express.Router()


router.post('/', passport.authenticate('jwt', { session: false }), addCourse);
router.get('/:id', passport.authenticate('jwt', { session: false }), getSingleCourse );
router.get('/', passport.authenticate('jwt', { session: false }), getAllCourses);
router.put('/', passport.authenticate('jwt', { session: false }), updateCourseName);

export default router;


