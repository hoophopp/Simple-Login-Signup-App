const {updatuser} = require('../controller/user');
const express = require('express');
const route = express.Router();

route.put('/', updatuser);

module.exports = route;