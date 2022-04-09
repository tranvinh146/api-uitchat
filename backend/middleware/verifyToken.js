import jwt from 'jsonwebtoken';

async function verifyToken (req, res, next) {
    try {
        const token = req.headers['authorization'].replace('Bearer ', '');
        const isVerified = await jwt.verify(token, process.env.JWT_ACCESS_KEY);
        if (isVerified) {
            next();
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}

export default verifyToken;