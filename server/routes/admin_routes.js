const Router = require('express')
const adminController = require('../controller/admin_controller')
const router = new Router()





router.post('/admin-panel/orders' , adminController.getOrders)
router.get('/admin-panel/orders/:id' , adminController.getFullChequeById)


module.exports = router