const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const loginController = async(req,res) => {

    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.send(200).status({message:`message that user already existss... @!@`, sucess : false})
        }
        const isMatch = await bcrypt.compare(req.body.password , user.password)
        if(!isMatch) return res.status({message:` invalid password or email check once @!@`})
            const token = jwt.sign({id : user._id},process.env.JWT_TOK, {expiresIn:"1d"})
           res.status(200).send({message:"Login sucessfull " , sucess : true , token })
       
    } catch (error) {
        res.status(500).send({message:`error in login CTRL ${error.message}`})
    }



}

const authController = async (req,res) =>{
  try {
    const user = await userModel.findOne({id : req.body.userId})
    if(!user) {
      return res.status(200).send({
        message: "user not found "
        , sucess: false
      })
  
    }
    else{
      res.status(200).send({
        sucess : true,
        data :{
            name : user.name
          , email : user.email
        }
      })
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).send({message:`error in auth CTRL ${error.message}`})
  }
}

module.exports = { loginController , registerController , authController}


// routes handling..