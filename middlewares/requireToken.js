import jwt from "jsonwebtoken";
export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) {
      throw new Error("no existe el token en el header, usar Bearer");
    }

    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error.message);
    const tokenVerificationErrors = {
      "invalid signature": "la firma de JWT no es valida",
      "jwt expired": "JWT expirado",
      "invalid token": "Token invalido",
      "No Bearer": "Utiliza el formato Bearer",
    };
    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
    // return res.status(401).json({ error: error.message });
  }
};

// https://www.youtube.com/watch?v=VrLvbzHVT9A
// 3:59
