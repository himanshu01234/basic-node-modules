const router = require('express').Router()
const usercontroller = require('../controller/userController')
router.post('/signUp',usercontroller.signUp)
router.post('/login',usercontroller.login)
router.get('/myProfile',usercontroller.myProfile)
router.post('/edit',usercontroller.edit)
module.exports=router;