

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'hamzaisagood@$boy';

const fetchUSer = (req, res, next) => {
    // Get the user from jwt token and add id to re request object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({erro: 'Plaese enter a valid token'});
    }
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
}

module.exports = fetchUSer;