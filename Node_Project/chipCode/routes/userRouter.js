const router=require('express').Router()

const userData=require('../webServices/userController')



 router.post('/signUp',userData.signUp)

 router.post('/sendOTP',userData.sendOTP)


router.post('/getAllUser',userData.getAllUser)
router.post('/addFriend',userData.addFriend)


router.post('/getFriendDetails',userData.getFriendDetails)







 

console.log("i am router")





module.exports=router;