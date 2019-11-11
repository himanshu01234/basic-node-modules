const router = require('express').Router()
const bookcontroller = require('../controller/bookController')
router.post('add',bookcontroller.add);