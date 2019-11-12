const router = require('express').Router()
const usercontroller = require('../controller/userController')

router.post('/htmlToPdf',usercontroller.htmlToPdf);

module.exports=router;
