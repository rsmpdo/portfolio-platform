const crypto = require('crypto');

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

/**
 * Generate a random Base32 secret (default 20 bytes = 32 Base32 chars, RFC 6238 compliant)
 */
function generateBase32Secret(byteLength = 20) {
  const bytes = crypto.randomBytes(byteLength);
  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8) | bytes[i];
    bits += 8;
    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }

  return output;
}

/**
 * Decode a Base32 string into a Buffer
 */
function base32ToBuffer(base32) {
  const cleaned = String(base32 || '')
    .toUpperCase()
    .replace(/=+$/, '')
    .replace(/[^A-Z2-7]/g, '');

  let bits = 0;
  let value = 0;
  const bytes = [];

  for (let i = 0; i < cleaned.length; i++) {
    const idx = BASE32_ALPHABET.indexOf(cleaned[i]);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }

  return Buffer.from(bytes);
}

/**
 * Compute 6-digit HOTP/TOTP code for a given counter
 */
function generateTOTPForCounter(secret, counter, digits = 6) {
  const key = base32ToBuffer(secret);
  const counterBuffer = Buffer.alloc(8);
  let temp = BigInt(counter);
  for (let i = 7; i >= 0; i--) {
    counterBuffer[i] = Number(temp & 0xffn);
    temp >>= 8n;
  }

  const hmac = crypto.createHmac('sha1', key).update(counterBuffer).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const otp = binary % Math.pow(10, digits);
  return String(otp).padStart(digits, '0');
}

/**
 * Verify a 6-digit TOTP code with a +/- 1 time-step window (30s per step)
 */
function verifyTOTP(token, secret, window = 1, stepSeconds = 30) {
  if (!token || !secret) return false;
  const cleanToken = String(token).replace(/\s+/g, '').trim();
  if (!/^\d{6}$/.test(cleanToken)) return false;

  const currentCounter = Math.floor(Date.now() / 1000 / stepSeconds);
  for (let errorWindow = -window; errorWindow <= window; errorWindow++) {
    const expected = generateTOTPForCounter(secret, currentCounter + errorWindow, 6);
    if (expected === cleanToken) {
      return true;
    }
  }
  return false;
}

/**
 * Generate 8 human-readable backup recovery codes (e.g. "7F2A-9C4E")
 */
function generateRecoveryCodes(count = 8) {
  const codes = [];
  for (let i = 0; i < count; i++) {
    const raw = crypto.randomBytes(4).toString('hex').toUpperCase();
    codes.push(`${raw.slice(0, 4)}-${raw.slice(4, 8)}`);
  }
  return codes;
}

/**
 * Build standard otpauth:// URI for QR code scanners
 */
function buildOtpAuthUrl({ secret, accountName, issuer = 'PortfolioCraft' }) {
  const label = `${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}`;
  return `otpauth://totp/${label}?secret=${encodeURIComponent(secret)}&issuer=${encodeURIComponent(
    issuer
  )}&algorithm=SHA1&digits=6&period=30`;
}

module.exports = {
  generateBase32Secret,
  verifyTOTP,
  generateRecoveryCodes,
  buildOtpAuthUrl
};
