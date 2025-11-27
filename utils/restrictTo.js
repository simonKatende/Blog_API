// middleware/restrictTo.js
const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    // Ensure authentication was done before this
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userRoles = req.user.roles;
    
    const hasPermission = userRoles.some(role => allowedRoles.includes(role));

    if (!hasPermission) {
      return res.status(403).json({ message: "Forbidden: Insufficient permissions", userRoles, allowedRoles });
    }

    next();
  };
};

module.exports = restrictTo;
