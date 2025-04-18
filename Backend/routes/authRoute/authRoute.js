const express = require('express');

const router = express.Router();
const userController  = require('../../controller/authController/authController') 


router.post('/auth/Register',userController.register)
router.post('/auth/login',userController.login)

module.exports =router;