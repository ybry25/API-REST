import { Router } from "express";
import { body } from "express-validator";
import {
  login,
  register,
  infoUser,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { validatorExpress } from "../middlewares/validatorExpress.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.post(
  "/register",
  [
    body("email", "Formato email, incorrecto").isEmail().normalizeEmail(),
    body("password", "Contraseña mínimo 6 carácteres")
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("No coinciden las contraseñas");
        }
        return value;
      }),
  ],
  validatorExpress,
  register
);
router.post(
  "/login",
  [
    body("email", "Formato email, incorrecto").isEmail().normalizeEmail(),
    body("password", "Contraseña mínimo 6 carácteres").isLength({ min: 6 }),
  ],
  login
);
// router.get("/protected", validateToken, infoUser);
router.get("/refresh", refreshToken);
router.get("/logout", logout);
router.post("/protected", requireToken, infoUser);

export default router;
