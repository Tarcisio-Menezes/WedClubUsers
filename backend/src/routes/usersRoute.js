const router = require('express').Router();
const controller = require('../controllers/usersController');
const multerMiddleware = require('../middlewares/uploadImage');

router.post('/users', controller.registerUser);
router.get('/users', controller.getAllUsers);
router.get('/users/:name', controller.getUserByName);
router.put('/users/:id', controller.userEdit);
router.put('/users/:id/image', multerMiddleware, controller.addImageInUser);
router.delete('/users/:id', controller.userRemove);

module.exports = router;
