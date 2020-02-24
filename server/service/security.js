const { roles } = require('../config/roles');
const jwt = require('jsonwebtoken');

exports.getPermission = function (action, resource, requestingUser, resourceOwnerId) {
            // First check if current role can create "ANY" fu-relation. (ANY > OWN)
            let permission = roles.can(requestingUser.role)[action + 'Any'](resource);
            if (!resourceOwnerId) return permission.granted;
            // if not granted, check if current role can create "OWN" fu-relation:
            if (permission.granted === false) {
                // Determine whether the implied resource is "owned"
                // by the current user. This is app's responsibility, not AC's.
                if (requestingUser.id === resourceOwnerId) {
                    // We made sure that the implied resource is "owned" by this user.
                    // Now we can ask AccessControl permission for performing
                    // the action on the target resource:
                    permission = roles.can(requestingUser.role)[action + 'Own'](resource);
                }
            }
    return permission.granted

};

exports.usePasswordHashToMakeToken = ({
       password: passwordHash,
       id: userId,
       createdAt
   }) => {
    // highlight-start
    const secret = passwordHash + "-" + createdAt
    return jwt.sign({ userId }, secret, {
        expiresIn: 3600 // 1 hour
    });
    // highlight-end

}