"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    const { role } = req.headers;
    if (role !== 'admin') {
        res.status(403).json({ message: "Unauthorized" });
    }
    else {
        next();
    }
};
exports.authMiddleware = authMiddleware;
