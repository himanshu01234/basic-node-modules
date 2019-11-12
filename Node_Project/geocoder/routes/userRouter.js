const router = require('express').Router()
const usercontroller = require('../controller/userController')
router.post('/giveAddress',usercontroller.giveAddress);
// router.post('/giveLatLong',usercontroller.giveLatLong);
module.exports=router