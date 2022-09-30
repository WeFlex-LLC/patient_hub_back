require('dotenv').config();

const authentication = (req, resp, next) => {
    let token = req.headers['authorization'];

    if (token === null) return res.sendStatus(403);
    
    req.token = token;

    next();
}

module.exports = { authentication };