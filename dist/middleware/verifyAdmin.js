"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const AdminValidation = (req, res, next) => {
    console.log('Verifying admin');
    try {
        //Recogemos datos del payload del token
        const admin = req.user.isAdmin;
        console.log(admin);
        if (admin != true) {
            return res.json('You are not admin');
        }
        //eres administrador
        return next();
    }
    catch (_a) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' });
    }
};
exports.AdminValidation = AdminValidation;
//# sourceMappingURL=verifyAdmin.js.map