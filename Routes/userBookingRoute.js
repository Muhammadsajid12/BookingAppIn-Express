const express = require('express');
const {    userBookingGet,
    userBookingPost,
    userBookingPut,
    userBookingDelete,
    userBookingGetById,
    getUserScheduleBooking,
    getUserPastBooking,
    getUserCurrentBooking}= require('../Controller/userBookingController')
    const Auth = require('../middleware/auth')
const router = express.Router();


router.get('/user_booking',userBookingGet)
router.get('/user_current_booking',getUserCurrentBooking)
router.get('/user_schedule_booking',getUserScheduleBooking)
router.get('/user_past_booking',getUserPastBooking)
router.get('/user_booking/:id',userBookingGetById)
router.post('/user_booking',Auth, userBookingPost)   
router.put('/user_booking/:id',Auth, userBookingPut)   
router.delete('/user_booking/:id',Auth, userBookingDelete)   
   
module.exports = router;
    
    
    
    
    
    