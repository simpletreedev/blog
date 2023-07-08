import bcrypt from "bcryptjs";

export const hashPw = async (pw) => {
  const salt = await bcrypt.genSalt(10);
  const pwHash = await bcrypt.hash(pw, salt);
  return pwHash;
};

export const comparePw = async (pw, raw) => {
  const isMatch = await bcrypt.compare(pw, raw);
  return isMatch;
};
