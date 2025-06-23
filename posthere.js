const express = require('express');
const router = express.Router();
const fakeAuth = require('../auth/auth')
const { postApost } = require('../controller/post');

router.post('/', fakeAuth, postApost);

module.exports = router;
