require('dotenv').config();
const crypto = require('crypto');
const sha256 = x => crypto.createHash('sha256').update(x).digest('hex');

const authorization = (req, resp, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return resp.status(401).json({ message: 'Missing Authorization Header' });
    }

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const AUTHORIZATION_USER=process.env.AUTHORIZATION_USER.split(',');
    const AUTHORIZATION_PASS=process.env.AUTHORIZATION_PASS.split(',');
    
    let authorizationS = false;
     
    for (let i = 0; i < AUTHORIZATION_USER.length; i++) {
        if (AUTHORIZATION_USER[i] === sha256(username) && AUTHORIZATION_PASS[i] === sha256(password)){
            authorizationS = true;
        }
    }

    if (!authorizationS) {
        return resp.status(401).json({message: 'Invalid Authentication Credentials'})
    }

    next();
};

const authorization_one_c = (req, resp, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return resp.status(401).json({message: 'Missing Authorization Header'});
    }

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const AUTHORIZATION_USER=process.env.AUTHORIZATION_USER_C.split(',');
    const AUTHORIZATION_PASS=process.env.AUTHORIZATION_PASS_C.split(',');
    
    let authorizationS = false;
    
    for (let i = 0; i < AUTHORIZATION_USER.length; i++) {
        if (AUTHORIZATION_USER[i] === sha256(username) && AUTHORIZATION_PASS[i]===sha256(password)){
            authorizationS=true;
        }
    }

    if (!authorizationS) {
        return resp.status(401).json({ message: 'Invalid Authentication Credentials' })
    }

    next();
};

module.exports = { authorization, authorization_one_c };