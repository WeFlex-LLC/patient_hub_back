require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const path = require('path');
const session = require('cookie-session');

// Admin modules
const login = require('./admin/modules/login.js');
const account = require('./admin/modules/account.js');
const users = require('./admin/modules/users.js');
const courses = require('./admin/modules/courses.js');

// Api modules
const api_courses = require('./api/modules/courses.js');
const api_user = require('./api/modules/user.js');
const api_payment = require('./api/modules/payment.js');

const createMiddleware=require('./server/main.js');

const CheckQuizes = require("./api/foo/check_quizes")

// Usage
app.use('/public', express.static(path.join(__dirname, 'admin')));
app.use('/temp', express.static(path.join(__dirname, 'admin/views')));
app.use(session({
    secret: process.env.SESSION_KEY,
}));

app.use(express.json({limit: '50MB', extended: true}));

app.use('/api', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Authorization, Content-Type, Accept");
    next();
});

app.set('views', 'admin/views');
app.set('view engine', 'ejs');

app.use((req,resp,next) => {
    resp.locals.user =  req.session.user;
    resp.locals.name =  req.session.name;
    resp.locals.status = req.session.status;
    next();
});

//Routing Admin Usage
app.use('/admin', login);
app.use('/admin/users', users);
app.use('/admin/account', account);
app.use('/admin/courses', courses);

//Routing Api Usage
app.use('/api/courses', api_courses);
app.use('/api/user', api_user);
app.use("/api/payment", api_payment);

//Routing
app.get('/admin', async (req, resp) => {
    req.session.logged ? resp.render('index') : resp.redirect('/login');
});

app.get('/login', async (req, resp) => {
    req.session.logged ? resp.redirect('/admin') : resp.render('login', {error: ''});
});

app.post('/admin/logout', (req, resp) => {
    req.session = null;
    
    if (req.session === null) {
        resp.json({success: true});
    }
});

//Cron job for disabled quizes
CheckQuizes.CheckQuizes();

app.listen(PORT);
console.log('Backend started at :' + PORT);

const assets = {
    main: {
        css: 'css/main.css',
        js: 'main.js'
    }
}

app.get('*.js', (req, res, next)=>{
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
})

const appRouter = createMiddleware.default({assets});

app.use('/assets/', express.static(path.join(__dirname, 'client')))
app.use(appRouter);