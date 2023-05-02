
const Locations = require("../model/location");
const cloudinary = require('cloudinary').v2
const {validateLocation}=require('../Validator/locationValidator');
const appError = require("../utils/appError");
const { INVALID_SUBSCRIPTION } = require("../utils/errorCode");
const apiError = require("../utils/apiError");


// Configuration 
cloudinary.config({
  cloud_name: "dlx4mdnhq",
  api_key: "164325494617638",
  api_secret: "kwGp3PPMGYMC7Lf0KoD0CKWEReo"
});







const locationGet= async(req, res ,next)=>{
  
  
         Locations.find().then((locations)=>{

        return  res.json({ data:locations,   status:'get locations' ,results:locations.length })

         }).catch((error)=>{
          
    return  next(error)


           })

}


const locationGetById= async(req, res , next)=>{

    const {id}=req.params


   Locations.findById(id).then((locations)=>{

   return res.status(200).json(  {msg: locations})

   }).catch((error)=>{
 return next(error)
   })


}

const user=false;

const locationPost= async(req, res , next)=>{

      const {error,value} = validateLocation(req.body)


    

    const{name,address,resourceType} =value

         createdLocation=new Locations({
            name,
            address,
            resourceType,
            userId:req.userId
         })

    
try {
 
// Joi check and throw error that will handled in middleware fn...
 
    if(error) throw error


 if(!user){
    // throw new appError(INVALID_SUBSCRIPTION ,'subscription not found ' , 403)

  next( apiError.badRequest('Bad request'))
  
 }

  if(req.file){
    // Upload 
const result = await cloudinary.uploader.upload(req.file.path, {public_id: "Session Datas"})


createdLocation.image=result.secure_url

await createdLocation.save()

  return res.status(201).json({message:"Location created"})
  }

    
} catch (error) {
   return next(error)
}

}




const locationPut= async(req, res , next)=>{

  const {error,value}=    validateLocation(req.body)


    // Joi check
    if(error){
      return  next( error)
    }
    



    const {id}=req.params;

    const checkuser= await Locations.findOne({userId:req.userId})
    

    const{name,address,resourceType} = value

    updatedLocation= {
        name,
        address,
        resourceType,
        
     }



try {

  checkuser===null? next(error)
  :
    await Locations.findByIdAndUpdate(id,updatedLocation)
   return res.status(201).json(updatedLocation)
  
    
    
   

   
} catch (error) {

    return  next( error)
}
    
   
}

// ! --------------------Delete route-----------------------------------------------
const locationDelete= async(req, res)=>{
    const {id}=req.params
  const locations = await Locations.findByIdAndRemove(id);
    res.status(200).json(  {msg: locations})

}

module.exports={
    locationGet,
    locationPost,
    locationPut,
    locationDelete,
    locationGetById,
    
}