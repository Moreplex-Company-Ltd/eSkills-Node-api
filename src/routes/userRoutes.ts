const express = require('express');
const passport = require('passport')
const { session } = require('passport/lib')
import { addInterest, getUserInfo } from "../controller/UserController";


const router = express.Router()



router.post('/me/interest', passport.authenticate('jwt', { session: false }), addInterest);
router.get('/me', passport.authenticate('jwt', { session: false }), getUserInfo);


export default router;