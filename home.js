const express = require("express");
const route = express.Router();
const {AllPosts} = require('../controller/post');
route.get('/',AllPosts );

module.exports = route;