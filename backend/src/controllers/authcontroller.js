import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/user.model.js"
import orderModel from "../models/order.model.js"
import JWT from "jsonwebtoken"


//REGISTER controller
 export const registerController = async (req, res) => {
   try {
          const {name, email, password, phone, address, answer} = req.body;

          // validation
          if (!name) {
             return res.send({message: "name is Required"})
          }
          if (!email) {
            return res.send({message: "email is Required"})
         }
         if (!password) {
            return res.send({message: "password is Required"})
         }
         if (!phone) {
            return res.send({message: "phone number is Required"})
         }
         if (!address) {
            return res.send({message: "address is Required"})
         }
         if (!answer) {
            return res.send({message: "answer is Required"})
         }
         const existinguser = await userModel.findOne({email})
         // existinguser check
         if (existinguser) {
             return res.status(200).send({
               success: false,
                message: " already Register please login"
             })
         }
         const hashedPassword = await hashPassword(password)

         //save
         const user =  await new  userModel({
            name,
            email,
            phone,
            address,
            answer,
            password: hashedPassword
         }).save()
           res.status(201).send({
            success: true,
            message: "user Register succesfully",
            user
         })

   } catch (error) {
      console.log(error);
       res.status(500).send({
        success: false,
        message: "error in Regsiteration",
        error
    })
   }


}

// LOGIN controller
export const loginController  = async (req, res) => {
   try {
        const {email, password} = req.body;

      //validation
      if (!email || !password) {
         return res.status(401).send({
            success: false,
            message: "Invalid email or password"
         })
      }
      const user = await userModel.findOne({email})
       if (!user) {
          return res.status(404).send({
            success: false,
            message: "email is not Registerd"
          })
       }
       const match = await comparePassword(password, user.password)
       if (!match) {
          return res.status(200).send({
            success: false,
            message: "invalid password"
          })
       }
         
       //token
        const token = await JWT.sign( {_id: user._id}, process.env.JWT_SECRET , {expiresIn: '7d'})

       return res.status(200).send({
         success: true,
         message: "Login successfully",
         user: {
            name: user.name,
            email : user.email,
            phone: user.phone,
            address: user.address,
            role: user.role
         },
         token
         
       })
       

   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: "error in login",
         error
      })
   }

}
 

export const forgotPasswordController = async(req, res) => {
   try {
       const {email, answer, newpassword } = req.body;

     if (!email) {
         res.status(400).send({
           message: "email is Required"
         })
     }
     if (!answer) {
      res.status(400).send({
        message: "answer is Required"
      })
  }
  if (!newpassword) {
   res.status(400).send({
     message: "New Password  is Required"
   })
}
   //check
    const user = await userModel.findOne({email, answer})
    //validation
    if (!user) {
        return res.status(404).send({
         success: false,
         message: "Wrong email or answer"
        })
    }
        const hashed = await hashPassword(newpassword)
       await userModel.findByIdAndUpdate(user._id, {password: hashed})
       res.status(200).send({
         success: true,
         message: "Password Reset successfully"
      })

   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: "something went wrong",
         error
      })
   }
}

//test controller
export const testController = (req, res) => {

   res.send("test routers")
}

// update user profile controller

 export const  updataProfileController = async(req, res) => {
  try {
     const {name, email, password, address, phone} = req.body
     const user = await userModel.findById( req.user_id)
  // password
   if (password && password.length < 6 ) {
       return res.json({error: "password is required and 6 character long"})
   }
     const hashedPassword = password ?  await hashPassword(password) : undefined
    const updatedUser =  await userModel.findByIdAndUpdate(req.user._id, {
       name: name || user.name,
       password:  hashedPassword || user.password,
       phone : phone || user.phone,
       address: address || user.address,
 
    }, {new: true})
    res.status(200).send({
      success: true,
      message: "User profile updated successfully",
      updatedUser
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while updating user profile",
      error
    })


  }

}

//orders controller
export const getOrdersController = async(req,res) => {
  
   try {
       const orders = await  orderModel.find({buyer: req.user._id}).populate("products", "-photo").populate("buyer","name")
       res.json(orders)
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message: "error while getting orders",
         error
      })
   }
  

}

// All orders
export const  getAllOrdersController= async(req,res) => {
  
   try {
       const orders = await  orderModel.find({}).populate("products", "-photo").populate("buyer","name").sort({createdAt: -1})
       res.json(orders)
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success:false,
         message: "error while getting orders",
         error
      })
   }
  

}



export const  orderStatusController = async(req,res) => {
 try {
    const {orderID} = req.params
    const {status} = req.body
  
    const orders = await orderModel.findByIdAndUpdate(orderID, {status} , {new: true})
    res.json(orders)
 } catch (error) {
   console.log(error);
   res.status(500).send({
      success: false,
      message: "error while updating order",
      error
   })
 }
}