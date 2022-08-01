import { addModule, getAllCouseMoudules, updateModuleName } from "../controller/ModuleController";

const express = require('express');
const passport =  require('passport')
const { session} = require('passport/lib');

const router = express.Router()


router.post('/', passport.authenticate('jwt', { session: false }), addModule );
router.get('/:id', passport.authenticate('jwt', { session: false }), getAllCouseMoudules);
router.put('/', passport.authenticate('jwt', {session: false}), updateModuleName);


export default router