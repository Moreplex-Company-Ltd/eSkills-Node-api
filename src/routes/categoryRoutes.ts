const express = require("express");
const passport = require('passport')
const { session } = require('passport/lib')

import { addCategory, getAllCategories, getSingleCategory, updateCategory } from '../controller/CategoryController';


const router = express.Router()


router.get('/categories', passport.authenticate('jwt', { session: false }), getAllCategories);
router.post('/categories', addCategory);
router.get('/categories/:id', getSingleCategory);
router.put('/categories/:id', updateCategory);

export default router;