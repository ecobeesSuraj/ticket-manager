import { Router } from "express";
import { register, login } from "../../controller/models/User/userController";
import { loginValidation } from "../../middleware/checkEmail";
import validate from "../../utils/dummyUtils";

const router = Router();

router.post("/register", validate(loginValidation), register);

router.post("/login", login);

export default router;
