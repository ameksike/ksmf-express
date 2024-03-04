
const lib = require('../');

describe('LOAD', () => {
    it("should a valid lib", () => {
        expect(lib).toBeInstanceOf(Object);
        expect(lib.cls.Server).toBeInstanceOf(Function);
        expect(lib.cls.middleware).toBeInstanceOf(Object);
        expect(lib.cls.middleware.cookie).toBeInstanceOf(Function);
        expect(lib.cls.middleware.session).toBeInstanceOf(Function);
        expect(lib.cls.middleware.fingerprint).toBeInstanceOf(Function);
    });
});