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

rout.post('/', (req, resp) => {
    let sql = "SELECT * FROM admins";
    
    DB.DB_Connect.query(sql, (err, result) => {
        if (err) return console.error(err);
        
        for (let i = 0; i < result.length; i++) {
            if (result[i].login === req.body.login && result[i].pass === sha256(req.body.pass)) {                    
                req.session.logged = true;
                req.session.status = result[i].status;   
                req.session.user = result[i].login;    
                req.session.name = result[i].name;
                if (req.body.passRiminder === 'on') req.sessionOptions.maxAge = 168 * 60 * 60 * 1000;
                resp.redirect(req.originalUrl);
                return;
            }
        }

        resp.render('login', {error: 'Wrong Us name or Password'});
    });   
});

// rout.post('/register', (req, resp) => {
//     let sql = `
//         INSERT INTO admins (login, pass, name, status) VALUES ('${req.body.login}', '${sha256(req.body.pass)}',
//         '${req.body.name}', '${req.body.status}')
//     `;

//     DB.DB_Connect.query(sql, (err, result) => {
//         if (err) return console.log(err);
        
//         console.log(result)
//     });   
// });

module.exports = rout;