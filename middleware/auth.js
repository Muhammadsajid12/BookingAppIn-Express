const jwt=require('jsonwebtoken');
const SECRET_KEY='NotePost'


const Auth=(( req , res , next)=>{
 


   try {
    
// Get token from header

let token = req.headers.authorization;

if(token){
     token= token.split(" ")[1];

     
     
     let user = jwt.verify(token , SECRET_KEY)

    

     req.userId=user.id
     req.userEmail=user.email

}else{
    res.status(400).json({message:'unauthoriazed user'})
}

next();


   } catch (error) {
    
res.status(500).json({message:'something went wrong.'})

   } 
    



})

    
module.exports=Auth

