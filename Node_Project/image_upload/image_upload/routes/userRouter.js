const router = require('express').Router()
const usercontroller = require('../controller/userController')
router.post('/uploadImage',usercontroller.uploadImage);

module.exports=router