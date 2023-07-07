import { Router } from "express";
import { home, edit } from "../User/userController";
import { searchPaginationSortMiddleware } from "../../../middleware/sortSearch";

const router = Router();

router.get(
  "/home",
  searchPaginationSortMiddleware({
    model: "User",
    searchableFields: ["name", "email"],
  }),
  home
);

router.patch("/edit/:id", edit);

export default router;
