const express = require("express")
import { signIn, signUp, signUpWithGoogle } from '../controller/AuthController'


const router = express.Router()


// sigin user
router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/signingoogle', signUpWithGoogle)


export default router;