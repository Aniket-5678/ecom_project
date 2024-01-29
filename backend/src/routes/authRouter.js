import express from "express"
import {registerController, loginController, testController, forgotPasswordController, updataProfileController, getOrdersController, getAllOrdersController, orderStatusController, } from "../controllers/authcontroller.js"
import { isAdmin, requireSignIn } from "../middlewear/authMiddlewear.js"

//router object
const router = express.Router()

//routing
//Register // METHOD POST
router.post('/register', registerController)

//Login // METHOD POST
router.post('/login', loginController )

  // Foreget password METHOD POST
  router.post('/forgot-password', forgotPasswordController)

//test router
router.get("/test", requireSignIn, isAdmin, testController)

//protected route user auth

router.get('/user-auth' , requireSignIn , (req, res) => {
    res.status(200).send({ok: true});
})

 //Protected Admin route auth
router.get('/admin-auth' , requireSignIn , isAdmin, (req, res) => {
  res.status(200).send({ok: true});
})

// update profile
router.put('/profile', requireSignIn, updataProfileController)


// orders
router.get('/orders', requireSignIn, getOrdersController)


// All orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)


// order status update
router.put('/order-status/:orderID', requireSignIn, isAdmin, orderStatusController)
export default router



