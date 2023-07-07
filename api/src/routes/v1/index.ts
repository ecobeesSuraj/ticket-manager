import { Router } from "express";

const router = Router();

import users from "../../controller/models/User/userRoutes";
import boards from "../../controller/models/Board/boardRoutes";
import auth from "./auth";

router.use("/api", auth);
router.use("/users", users);
router.use("/boards", boards);

export default router;
