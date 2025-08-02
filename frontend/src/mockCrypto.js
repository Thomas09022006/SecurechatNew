export const mockCrypto = {
  AES: {
    encrypt: (text) => `ENC:${btoa(text)}`,                     // Base64 encode with a prefix
    decrypt: (text) => text.startsWith('ENC:') ? atob(text.slice(4)) : text // Decode only if starts with ENC:
  }
};
