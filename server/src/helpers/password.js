import bcrypt from "bcrypt";



const rounds = Number(process.env.BCRYPT_ROUNDS || 12);

export async function hashPassword(plain) {
  return bcrypt.hash(plain, rounds);
}

export async function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

// simple temp pw generator (improve as needed)
export function generateTempPassword(len = 12) {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}
