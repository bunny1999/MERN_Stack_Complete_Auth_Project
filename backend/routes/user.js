const express = require('express')
const router = express.Router()
const {getUserByID,userData} = require('../controllers/user')
const {isSignedin,isAuthenticated} = require('../controllers/auth')

router.param('userID',getUserByID);

router.get('/user/:userID',isSignedin,isAuthenticated,userData);

module.exports = router;