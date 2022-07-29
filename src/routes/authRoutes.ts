const express = require("express")
import { signIn, signUp } from '../controller/AuthController'


const router = express.Router()


// sigin user
router.post('/signin', signIn);
router.post('/signup', signUp);


export default router;