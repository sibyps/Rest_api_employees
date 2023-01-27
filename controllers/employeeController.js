
const createError = require("http-errors");
const User = require("../model/userSchema");
const bcrypt = require("bcrypt")



//creating employees
module.exports.register = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
  
      //check if the user already exists or not
      const isExists = await User.findOne({ email: email });
      if (isExists) throw createError.Conflict("This email already in use");
  
      //hash the password
      const hash = await bcrypt.hash(password, 12);
  
      //create a new user
      const newUser = new User({
        name,
        email,
        password: hash,
      });
  
      //save the user to db
      await newUser.save();
  
      res.status(200).json({ success: true, message:"successfully created" });
  
    } catch (error) {
      next(error);
    }
  };




module.exports.getAll=async(req,res,next)=>{
    try {
        const allEmployee =await User.find({})
        res.status(200).json({success:true,allEmployee})
    } catch (error) {
        next(error)
    }
}


module.exports.getOne=async(req,res,next)=>{
    try {
        const oneEmployee  = await User.findOne({_id:req.params.id})
        if(!oneEmployee) throw createError.NotFound("No employee found")

        res.status(200).json({success:true,oneEmployee})
    } catch (error) {
        next(error)
    }
}

module.exports.update=async(req,res,next)=>{

    try {

        const oneEmployee  = await User.findOne({_id:req.params.id})
        if(!oneEmployee) throw createError.NotFound("No employee found")

        const employee = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true},
    )
    res.status(200).json({message:"updated successfully",employee})
    } catch (error) {
        next(error)
    }

}


module.exports.deleteEmployee = async(req,res,next)=>{
    try {
        
        const oneEmployee  = await User.findOne({_id:req.params.id})
        if(!oneEmployee) throw createError.NotFound("No employee found")

        await User.deleteOne({_id:req.params.id})

        res.status(200).json({success:true,message:"successfully deleted"})
    } catch (error) {
        next(error)
    }
}






  