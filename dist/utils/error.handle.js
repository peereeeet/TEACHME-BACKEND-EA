"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttp = void 0;
const handleHttp = (res, message, error) => {
    console.error(error || message);
    res.status(500).send({ error: message });
};
exports.handleHttp = handleHttp;
//# sourceMappingURL=error.handle.js.map