const express = require('express');
const router = express.Router();
const {resourceTypeGet,
    resourceTypePost,
    resourceTypePut,
    resourceTypeDelete,
    resourceTypeGetById} = require('../Controller/resourceTypeController')
    const Auth=require('../middleware/auth')

router.get('/' ,resourceTypeGet),
router.get('/:id' ,resourceTypeGetById),
router.post('/',Auth,resourceTypePost),
router.put('/:id',Auth,resourceTypePut),
router.delete('/:id',Auth,resourceTypeDelete)

module.exports = router;