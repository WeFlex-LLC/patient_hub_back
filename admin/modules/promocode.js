require('dotenv').config();
const express = require('express');
const rout = express.Router();
const path = require('path');
const bodyPars = require('body-parser');
const crypto = require('crypto');
const sha256 = x => crypto.createHash('sha256').update(x).digest('hex');
const session = require('cookie-session');

// My modules
const DB = require('../../config.js');

//Usage
rout.use('/public', express.static(path.join(__dirname, '../views')));
rout.use(bodyPars.urlencoded({extended: false}));
rout.use(session({secret: process.env.SESSION_KEY}));

express().set('views', 'admin/views');
express().set('view engine', 'ejs');
//Routing

rout.get('/', (req, resp) => {
   

        resp.render('promocode.ejs');
       
});



module.exports = rout;