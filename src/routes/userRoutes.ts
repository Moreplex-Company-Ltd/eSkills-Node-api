const express = require('express');
import { addInterest, getUserInfo } from "../controller/UserController";


const router = express.Router()



router.post('/interest', addInterest);
router.get('/:id', getUserInfo);


export default router;