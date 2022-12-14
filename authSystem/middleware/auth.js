const jwt = require("jsonwebtoken");

// model is optional

const auth = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

    if(!token) {
        return res.status(403).send("Token is missing");
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode);
        req.user = decode;
        // can bring in info from db also and push to user

    } catch (error) {
        return res.status(401).send("Invalid token");
    }

    return next();
};

module.exports = auth;