//
import { Router } from "express";
import { Race_ResultController } from "../controllers/race_result.controller";

const router = Router();
const controller = new Race_ResultController();

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id", controller.getById);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;