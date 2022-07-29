const express = require("express")
import { addCategory, getAllCategories, getSingleCategory, updateCategory } from '../controller/CategoryController';


const router = express.Router()


router.get('/categories', getAllCategories);
router.post('/categories', addCategory);
router.get('/categories/:id', getSingleCategory);
router.put('/categories/:id', updateCategory);

export default router;