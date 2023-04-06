const { error } = require('@hapi/joi/lib/base');
const UserBooking = require('../model/userBooking');
const { validateUserBookings } = require('../Validator/userBookingValidator');

const userBookingGet= async( req,res,next)=>{


try {
const userBookings= await UserBooking.find()
    return res.status(200).json({
        status:'success',
         result:userBookings.length,
        data:userBookings
        })

} catch (error) {
  return  next(error)
}

}

const  getUserScheduleBooking= async( req,res,next)=>{

const currentbookings =await UserBooking.find() 

const Currentdate=Date.now();
var dateFormat= new Date(Currentdate)




// res.json('get method');

try {
const userBookings=currentbookings.filter((bookings)=>dateFormat.getMonth()+1 < bookings.date[0] ||dateFormat.getMonth()+1 == bookings.date[0]  && dateFormat.getDate()<bookings.date[2] )
    return res.status(200).json({
        status:'successfully get Schedule bookings  ',
         result:userBookings.length,
        data:userBookings
        })

} catch (error) {
   return next(error)
}

}
const  getUserCurrentBooking= async( req,res,next)=>{

const currentbookings =await UserBooking.find() 

const Currentdate=Date.now();
var dateFormat= new Date(Currentdate)



try {
const userBookings=currentbookings.filter((bookings)=>dateFormat.getMonth()+1 == bookings.date[0] && dateFormat.getDate()==bookings.date[2] )
    return res.status(200).json({
        status:'successfully get Schedule bookings  ',
         result:userBookings.length,
        data:userBookings
        })

} catch (error) {
   return next(error)
}

}


const  getUserPastBooking= async( req,res,next)=>{


const currentbookings =await UserBooking.find() 

const Currentdate=Date.now();
var dateFormat= new Date(Currentdate)





try {
const AllPasttBookings= currentbookings.filter((bookings)=>dateFormat.getMonth()+1 > bookings.date[0] ||dateFormat.getMonth()+1 == bookings.date[0]  && dateFormat.getDate()>bookings.date[2]);
 return res.status(200).json({
        status:'success',
         result:AllPasttBookings.length,
        data:AllPasttBookings
        })

} catch (error) {
   return next(error)
}

}




const userBookingGetById= async( req,res,next)=>{

// res.json('get method');

try {
 const id=req.params.id
  const userBooking = await UserBooking.findById(id);
 return res.status(200).json(  {
        status:"success",
        msg: userBooking
        })
} catch (error) {
  return  next(error)
}

}






const userBookingPost= async( req,res,next)=>{

const {error, value}=validateUserBookings(req.body)

const{name,email,bookingStartTime, bookingEndTime, date,resourceType,} = value





// Crruent Metting..................
  const  userBooking=new UserBooking({
            name,
            email,
            bookingStartTime,
            bookingEndTime,
            date,
            resourceType,
            userId:req.userId
         })

   


try {
if(error) throw error

await userBooking.save()
 
return res.status(201).json({
        status:'successfully Booked',
         
         data:userBooking
        })


}catch (error) {
   return next(error)
}

}



const userBookingPut= async( req,res,next)=>{

    const {id}=req.params;
    const {error, value}=validateUserBookings(req.body)

    const checkuser= await UserBooking.findOne({userId:req.userId})
    

    const{name,
            email,
            bookingStartTime,
            bookingEndTime,
            date,
            resourceType,
            } = value

    updateUserBooking= {
        name,
            email,
            bookingStartTime,
            bookingEndTime,
            date,
            resourceType,
            userId:req.userId
        
     }



try {
if(error) throw error

  checkuser===null? res.status(404).json("This user is not Authenticated to perform this operation")
  :
    await UserBooking.findByIdAndUpdate(id,updateUserBooking)
    return res.status(201).json({
        status:'sucess',
        data:updateUserBooking})
  
    
    
   

   
} catch (error) {
   return next(error)
}


}



const userBookingDelete= async( req,res,next)=>{

// res.json('get method');

try {
 const {id}=req.params
  const userBooking = await UserBooking.findByIdAndRemove(id);
    return res.status(200).json(  {
        status:"success",
        msg: userBooking
        })
} catch (error) {
   return next(error)
}

}


module.exports={
    userBookingGet,
    userBookingPost,
    userBookingPut,
    userBookingDelete,
    userBookingGetById,
    getUserScheduleBooking,
    getUserPastBooking,
    getUserCurrentBooking
}