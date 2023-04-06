
const path=require("path")
const multer=require("multer")

// Here we spcifing the Storage.......
let Storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'upload/')
    },
    filename:function(req,file,cb){
        let ext=path.extname(file.originalname)
        cb(null,Date.now()+ext)
    }
})

// Here we uploading the file ........
let upload =multer({
    storage:Storage,
    fileFilter:function(req,file,callback ){
        if( file.mimetype=='image/png' || file.mimetype=='image/jpg' ){
            callback(null,true)
            
        }else{
            console.log('Only png and jpg is allowed');
            callback(null , false)
        }
    }

   
})

module.exports=upload