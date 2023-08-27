import jwt from "jsonwebtoken";
export const generateToken = (uid) => {
  // 60 seg * #min
  const expiresIn = 60 * 15;
  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
  } catch (er) {
    console.log(er);
  }
};
