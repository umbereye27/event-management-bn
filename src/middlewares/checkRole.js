export const checkRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: 'Forbidden Insufficient permissions.' });
        }
        const hasRole = roles.some(role => req.user.role.includes(role));
        if (!hasRole) {
            return res.status(403).json({ message: 'Forbidden Insufficient permissions.' });
        }
        next();
    };
};
