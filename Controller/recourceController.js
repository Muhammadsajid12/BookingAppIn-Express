const { error } = require("@hapi/joi/lib/base");
const Resource = require("../model/resource");
const {validateResource}=require('../Validator/resourceValidator')


const resourceGet= async(req, res ,next)=>{

    try {
        const locations=await Resource.find();
  return res.status(200).json({
     results:locations.length,
     msg:'Resource get',
     data:locations,  
     
     })
    } catch (error) {
      return next(error)
    }

        

    
    
}

const resourceGetById= async(req, res ,next)=>{
    const {id}=req.params

  try {
    const delresource = await Resource.findById(id);
   return res.status(200).json({
        msg: 'resourceType',
        data:delresource
        })

  } catch(error) {
    return next(error)
  }
    
}





const resourcePost= async(req, res , next)=>{
const{error,value}=validateResource(req.body)

 

    const{name,resourceType,} = value



         createdResource=new Resource({
            name,
            resourceType,
            userId:req.userId
         })

try {
// Joi check
    if(error) throw error
       
    

    await createdResource.save()
   return res.status(201).json({message:"resource created"})
} catch (error) {
  return  next(error)
}

}






const resourcePut= async(req, res , next)=>{

const{error,value}=validateResource(req.body)


    const {id}=req.params

   const {name, resourceType}=value
    updatedResource={
        name, resourceType,
        userId:req.userId 
    }
try {
     // Joi check
    if(error) throw error

    await Resource.findByIdAndUpdate(id,updatedResource)
   return res.status(201).json({
        msg: 'resourceType is updated',
        data: updatedResource
        })

} catch (error) {
   return next(error)
}


    
   
}

// ! --------------------Delete route-----------------------------------------------
const resourceDelete= async(req, res , next)=>{
    const {id}=req.params

  try {
    const delresource = await Resource.findByIdAndRemove(id);
    res.status(200).json({
        msg: 'resourceType is deleted',
        data:delresource
        })

  } catch (error) {
   return next(error)
  }
    

}

module.exports={
    resourceGet,
    resourcePost,
    resourcePut,
    resourceDelete,
    resourceGetById
}