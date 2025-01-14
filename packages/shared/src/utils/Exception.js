"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIException = void 0;
class APIException extends Error {
    constructor(code, error, message) {
        super(message);
        this.code = code;
        this.error = error;
        this.message = message;
    }
}
exports.APIException = APIException;
//# sourceMappingURL=Exception.js.map