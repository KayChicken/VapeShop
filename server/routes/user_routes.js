const Router = require('express')
const router = new Router()
const userController = require('../controller/user_controller')
const { registerValidator } = require('../validation/auth')
const checkAuth = require('../utils/checkAuth')





router.post('/authorization/registration' , registerValidator, userController.registration)
router.post('/authorization/login' , registerValidator, userController.login)
router.get('/authorization/me' , checkAuth , userController.getMe)
router.get('/user:id' , userController.getOneUser)


module.exports = router