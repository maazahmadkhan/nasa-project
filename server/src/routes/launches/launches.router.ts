import express from "express";
import { deleteLaunchRouter } from "./delete/delete";
import { showAllLaunchesRouter } from "./index/index";
import { addNewLaunchRouter } from "./new/new";
const router = express.Router();

router.use(showAllLaunchesRouter);
router.use(addNewLaunchRouter);
router.use(deleteLaunchRouter);

export { router as launchesRouter };
