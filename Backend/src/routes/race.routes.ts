//
import { Router } from "express";
import { RaceController } from "../controllers/race.controller";

const router = Router();
const controller = new RaceController();

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id", controller.getById);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);


export default router;