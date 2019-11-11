const router = require('express').Router()
const bookcontroller = require('../controller/bookController')
const usercontroller= require('../controller/userController')
router.post('/add',bookcontroller.add);
router.post('/signUp',usercontroller.signUp);
router.get('/verify',usercontroller.linkVerify)

module.exports=router;