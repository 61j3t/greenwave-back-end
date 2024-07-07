const crypto = require('crypto');

function generateSecret(length = 32) {
    return crypto.randomBytes(length).toString('hex');
}

const secretSession = generateSecret();
console.log("Generated secret session:", secretSession);