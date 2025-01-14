"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = exports.ROLE = void 0;
const openapi = require("@nestjs/swagger");
exports.ROLE = {
    STUDENT: 'STUDENT',
    USER: 'USER',
    ADMIN: 'ADMIN',
    TUTOR: 'TUTOR',
};
class UserDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, role: { required: true, type: () => Object } };
    }
}
exports.UserDTO = UserDTO;
//# sourceMappingURL=user.dto.js.map