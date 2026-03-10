import { Router } from "express";
import { TeamController } from "../controllers/team.controller";

const router = Router();
const controller = new TeamController();

router.get("/api/teams", controller.list);
router.get("/api/teams/:id", controller.getById);
router.post("/api/teams", controller.create);
router.put("/api/teams/:id", controller.update);
router.delete("/api/teams/:id", controller.delete);

export default router;