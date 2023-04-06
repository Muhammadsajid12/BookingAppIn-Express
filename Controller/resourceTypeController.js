const Joi = require("joi");
const ResourceType = require("../model/resourceType");
const{validateResourceType}=require('../Validator/resourceTypeValidator')


const resourceTypeGet= async(req, res , next)=>{

    try {
        const resourceTypes=await ResourceType.find();
   return res.status(200).json({ 
    
    results:resourceTypes.length,
    status:'ResourceType get',
    data:resourceTypes, 


      
      })
    } catch (error) {
        
     return  next(error)

    }
    

   

}





const resourceTypeGetById= async(req, res,next)=>{
    const id=req.params.id

  
  try {

    const delresourceType = await ResourceType.findById(id);
    res.status(200).   json(  {
     msg: 'resourceType is get',
    data: delresourceType

    }
        
        )

  } catch (error) {
   return next(error)
  }
    
    
}







const resourceTypePost= async(req, res , next)=>{


const {error,value}=validateResourceType(req.body)
  
const {name,
            resource,
            location,}=value

         createdResourceType=new ResourceType({
            name,
            resource,
            location,
            userId:req.userId
         })

try {
  // Joi check
    if(error) throw error 

    await createdResourceType.save()
   return res.status(201).json({message:"resourceType created"})
} catch (error) {
  return  next(error)
}


}






const resourceTypePut= async(req, res , next)=>{

const {error,value}=validateResourceType(req.body)

    const {id}=req.params
   const {name, location}=value
 const  updatedResourceType={
        name, location,
        userId:req.userId
    }
try {
    
 // Joi check
    if(error) throw error

    await ResourceType.findByIdAndUpdate(id,updatedResourceType)

    res.status(201).json(updatedResourceType)
} catch (error) {
    next(error)
}

   
}

// ! --------------------Delete route-----------------------------------------------

const resourceTypeDelete= async(req, res , next)=>{
    const {id}=req.params

  try {
    const delresourceType = await ResourceType.findByIdAndRemove(id);
    res.status(200). json(  {
     status: 'success',
    data: delresourceType

    }
        
        )

  } catch (error) {
    next(error)
  }
    
    
}

module.exports={
    resourceTypeGet,
    resourceTypePost,
    resourceTypePut,
    resourceTypeDelete,
    resourceTypeGetById
}