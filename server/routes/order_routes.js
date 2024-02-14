const Router = require('express')
const orderController = require('../controller/order_controller')
const router = new Router()





router.post('/order-send' , orderController.addOrder)



module.exports = router