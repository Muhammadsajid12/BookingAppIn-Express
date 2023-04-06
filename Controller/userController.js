const User=require('../model/user');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const { validateSinup  } = require('../Validator/signupValidator');
const { validateLogin  } = require('../Validator/loginValidator');
const { error } = require('@hapi/joi/lib/annotate');

const SECRET_KEY='NotePost'


const User_Sigup=async(req,res , next)=>{



    
    const {error , value}=validateSinup(req.body)
    // Desructure the value object.......
    const{name, email,password,}=value

     
    try {

         // Joi check
    if(error) throw error
       //  Existting user
        const existtinguser = await User.findOne({email:email})
        if(existtinguser){
            return res.status(400).json({message:'User already exist'})
        }
    
    // HashedPassword
    const hashpassword= await bcrypt.hash(password,10)
    
    
    // Create the user
    const result= await User.create({name:name,email:email ,password:hashpassword})

    
    // Create JWT token
    const token=jwt.sign({email:result.email , id:result._id} , SECRET_KEY)
    
    res.status(200).json({user:result,token:token})
    
      }
    
     catch (error) {
       return next(error)
    }
    
    
    }

    const User_Login= async(req,res , next)=>{

        const {error , value}= validateLogin(req.body)

        
        // Destruct the value  
        const{ email ,password }=value
      try {
        
        if(error) throw error
    //  Check existing user....
    const existtinguser = await User.findOne({email: email})
        if(!existtinguser){
            return res.status(400).json({message:'User Not exist please signup first'})
        }
    // CamparedPassword....
    const camparedPassword=  await bcrypt.compare(password,existtinguser.password);

    
    if(!camparedPassword){
    
    res.status(400).json({message:"Invalid password"})
    
    }

    // Create JWT token
    const token=jwt.sign({email:existtinguser.email , id:existtinguser._id} , SECRET_KEY)
     if(token){
      res.status(200).json({user:existtinguser, token:token}) 
    }

    
      } catch (error) {
        
       return  next(error)
      }
    
    
    }

const User_Profile= async(req,res , next)=>{


    const userdata= await User.findById({_id:req.userId})

    if(userdata===null){
        return next(error)
    }else{

        try {
    
            res.status(200). json({data:userdata})
        } catch (error) {
           return next(error)
        }

    }



    
}

    
    module.exports={
        User_Sigup,
        User_Login,
        User_Profile
    }