const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const reviewsController = require('../controllers/reviewsController')
const {catchErrors} = require('../handlers/errorHandlers')


router.get('/', storeController.homepage);
router.get('/writing', storeController.getWriting);
// //add writing snippets
// // router.get('/add', authController.isLoggedIn, storeController.addWriting );
router.get('/add', authController.isLoggedIn, storeController.addWriting );
router.post('/add', storeController.createWriting);
// //create the editing flow
router.post('/add/:id', (storeController.updateWriting));
router.get('/writings/:id/edit', authController.isLoggedIn,(storeController.editWriting));
// //get single writing page
router.get('/writing/:id', storeController.getSingleWriting);

router.get('/login', userController.loginForm)
router.post('/login', authController.login)

router.get('/register', userController.registerForm);
router.post('/register', 
//validate registration data
userController.validateRegister
,//register user
 userController.register
,
authController.login
// //log them in
);

//logout route
router.get('/logout', authController.logout);

// //user profile
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', userController.updateAccount);

// //the reviews route

router.post('/reviews/:id', authController.isLoggedIn, reviewsController.addReview);

router.get('/exampler', (req, res) =>{res.render('loginExample')})
module.exports = router;

//favorites
router.post('/api/writings/:id/heart', storeController.heartWriting)
router.get('/hearts', authController.isLoggedIn, storeController.heartsPage)