const apiError = require("../utils/apiError");
const appError = require("../utils/appError");


const errorHandler=(err, req,res,next)=>{

console.log(err);

if(err.name==="ValidationError"){

 return res.status(400).json({ type:'validation Error', details: err.details  })

}

// solution 1

if(err instanceof appError){

return res.status(err.statusCode ).json({
    type:err.errorCode,
    message:err.message
})

}

// Solution 2

if(err instanceof apiError){

return res.status(err.code ).json({
    msg:err.message
})

}



 return res.status(400).json({msg: err , status:'Failed'})

}

module.exports=errorHandler