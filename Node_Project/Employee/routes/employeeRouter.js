const router = require('express').Router()
const usercontroller = require('../controller/employeeController')
router.post('/detail',usercontroller.employee);
router.post('/update',usercontroller.employeeUpdate);
router.post('/speakEasy',usercontroller.speakEasy)
module.exports=router;