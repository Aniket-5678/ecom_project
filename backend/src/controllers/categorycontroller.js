import categoryModel from "../models/category.model.js";
import slugify from "slugify"

// create category
 export const  CreateCategoryController = async(req, res) => {
 try {
      const {name} = req.body;
       if (!name) {
           return res.status(401).send({message: "Name is Required"})
       }
      
      const  existingCategory = await categoryModel.findOne({name})
      if (existingCategory) {
        return res.status(200).send({
            success: true,
            message: "Category is already exists"
        })
      }
      const category = await new categoryModel({name, slug: slugify(name)}).save()
      res.status(200).send({
        success: true,
        message: "category created successfully",
        category
      })

 } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error category",
        error
      })
 }

}

// update category

export const updateCategoryController = async(req, res) => {

 try {
     const {name} = req.body;
     const {id} = req.params

     const  category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true})
    res.status(200).send({
        success: true,
        message: "Category updated successfully",
        category
    })

 } catch (error) {
    console.log(error);
     res.status(500).send({
        success:false,
        message: "error while updating category"
     })
 }


}
// get all category 

export const categoryController = async(req, res) => {
  

    try {
        const category = await categoryModel.find({})
        res.status(200).send({
          success: true,
          message: "All categories list ",
          category
        })
    } catch (error) {
         console.log(error);
         res.status(500).send({
            success: false,
            message: "error while getting all category",
            error
         })

    }
}

// get single categrory
export const  singleCategoryController = async(req, res) => {
     
  try {
     const category = await categoryModel.findOne({slug: req.params.slug})
     res.status(200).send({
      success:true,
      message: " get single category  successfully",
      category
     })

  } catch (error) {
      
      console.log(error);
      res.status(500).send({
        success: false,
        message: "errror while getting single product",
        error
      })  

  }

}


export const deleteCategoryController = async (req, res) => {
       
     try {
       const   {id} = req.params;
       await categoryModel.findByIdAndDelete(id)
       res.status(200).send({
        success: true,
        message: "delted categroy successfull"
       })


     } catch (error) {
         console.log(error);
        res.status(500).send({
           success: false,
           message: " error while deleting  category "
        })

     }


}