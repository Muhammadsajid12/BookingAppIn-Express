const express = require('express');
const router = express.Router();
const {locationGet,
    locationPost,
    locationPut,
    locationDelete,
    locationGetById ,} = require('../Controller/locationController')
    const Auth=require('../middleware/auth')
const upload = require('../middleware/upload')





router.get('/',locationGet)
router.get('/:id',locationGetById)
router.post('/',Auth,upload.single('image'), locationPost)
router.put('/:id',Auth,locationPut)
router.delete('/:id',Auth,locationDelete)

module.exports = router;