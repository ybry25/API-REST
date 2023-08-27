import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // op 1
    // const user = new User({ email, password });
    // await user.save();

    // opt 2
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();

    return res.json({ ok: "register ok" });
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      return res.status(400).json({
        error: `El correo ${email} ya se encuentra registrado`,
      });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ error: `el correo ${email} no exite en la BD` });
    }
    const resPassword = await user.comparePassword(password);
    if (!resPassword) {
      return res.status(403).json({ error: `Credenciales incorrectas` });
    }

    // generar token jwt
    // var token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET);
    const { token, expiresIn } = generateToken(user.id);
    return res.json({ ok: "login ok", token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    const { _id, email } = user;
    return res.json({ _id, email });
  } catch (error) {
    return res.status(500).json({ error: "error de server" });
  }
};

export const refreshToken = (req, res) => {
  res.json({ controller: "refreshToken" });
};

export const logout = (req, res) => {
  res.json({ controller: "logout" });
};
