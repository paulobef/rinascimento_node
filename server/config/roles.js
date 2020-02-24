const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
    ac.grant("USER")
        .createOwn("user")
        .readOwn("user")
        .updateOwn("user")
        .deleteOwn("user");

    ac.grant("ADMIN")
        .extend("USER")
        .createAny("user")
        .readAny("user")
        .updateAny("user")
        .deleteAny("user");

    return ac;
})();