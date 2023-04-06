const express = require('express');
const router = express.Router();
const { resourceGet,
    resourcePost,
    resourcePut,
    resourceDelete,
    resourceGetById} = require('../Controller/recourceController')
    const Auth=require('../middleware/auth')

router.get('/',resourceGet),
router.get('/:id',resourceGetById),
router.post('/',Auth,resourcePost),
router.put('/:id',Auth,resourcePut),
router.delete('/:id',Auth,resourceDelete)

module.exports = router;