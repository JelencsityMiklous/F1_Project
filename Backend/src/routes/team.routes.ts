import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const router = Router();
const controller = new TaskController();

router.get("/api/teams", controller.list);
router.get("/api/teams/:id", controller.getById);
router.post("/api/teams", controller.create);
router.put("/api/teams/:id", controller.update);
router.delete("/api/teams/:id", controller.delete);

export default router;