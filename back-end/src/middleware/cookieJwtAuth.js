import jwt from 'jsonwebtoken';

const cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token)
        return res.status(401).json({ message: 'Acces denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default cookieJwtAuth;