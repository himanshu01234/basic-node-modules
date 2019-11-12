const router = require('express').Router()
const usercontroller = require('../controller/userController')

router.post('/signUp',usercontroller.signUp);

router.post('/add',usercontroller.add);
router.post('/remove',usercontroller.remove);
router.post('/edit',usercontroller.edit);
router.post('/display',usercontroller.display);
router.post('/setPermission',usercontroller.setPermission);


module.exports=router;