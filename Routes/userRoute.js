const express = require('express');
const {  User_Sigup,
    User_Login,
    User_Profile}= require('../Controller/userController.js')
const Auth=require('../middleware/auth.js')
const router = express.Router();

router.post('/signup',User_Sigup )
router.post('/login', User_Login)   
router.get('/profile',Auth, User_Profile)
   
module.exports = router;
    
    
    
    
    
    