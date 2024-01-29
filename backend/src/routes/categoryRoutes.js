import express from "express"
import { isAdmin, requireSignIn } from "../middlewear/authMiddlewear.js"
import { CreateCategoryController,  categoryController,  deleteCategoryController,  singleCategoryController,  updateCategoryController } from "../controllers/categorycontroller.js"


const router = express.Router()

// category Route
//create category
router.post('/create-category', requireSignIn, isAdmin, CreateCategoryController)

// update category route
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

// get all category
router.get('/get-category', categoryController  ) 

// single categroy 
router.get('/single-category/:slug', singleCategoryController)

//Delete category
 router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router