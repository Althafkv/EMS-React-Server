const express = require('express')
const userController = require('../Controllers/userController')
const multerInstance = require('../MulterConfig/multerMiddleware')

const router = new express.Router()

// register
router.post('/register', multerInstance.single("user_profile"), userController.register)
// get all users
router.get('/all-employees', userController.getallemployee)
// view user
router.get('/view-user/:id',userController.viewuser)
// delete user
router.delete('/delete-user/:id',userController.removeUser)
// edit user
router.put('/edit-user/:id', multerInstance.single("user_profile"),userController.edit)


module.exports = router