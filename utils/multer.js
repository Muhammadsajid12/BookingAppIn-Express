const { diskStorage } = require("multer")
const multer = require("multer")
const path=require("path")






// multer config.......
module.exports = multer({
    storage:diskStorage({}),
    fileFilter:(req,file,cb)=>{
        let ext=path.extname(file.originalname)
        if(!ext=='.png'&&!ext=='.jpeg'&&!ext=='.jpg'){
            cb(new Error("File is not allowed"),false)
        }

 cb(null,true)

    }
})