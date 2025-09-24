const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET  // Use your secret key from environment variables

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded;  // Attach user data to request object
    next();  // Proceed to the next middleware or route handler
  });
};

module.exports = { authenticate };
