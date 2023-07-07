import { Router } from "express";
import {
  home,
  register,
  edit,
  login,
} from "../../controller/User/userController";
import { loginValidation } from "../../middleware/checkEmail";
import validate from "../../utils/dummyUtils";
import { searchPaginationSortMiddleware } from "../../middleware/sortSearch";

const router = Router();

router.get(
  "/home",
  searchPaginationSortMiddleware({
    model: "User",
    searchableFields: ["name", "email"],
  }),
  home
);
router.post("/register", validate(loginValidation), register);

router.patch("/edit/:id", edit);

router.post("/login", login);

export default router;
