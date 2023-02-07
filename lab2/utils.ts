const crypto = require('crypto');

export function hashString(str:string) {
    const normalized = str.replace(/\s/g, '').toLowerCase();
    const hash = crypto.createHmac('sha256', normalized).digest('hex');
    return hash;
}