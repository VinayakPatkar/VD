import { Router } from "express";
import { workerLogin, workerSignup,uploadUtility } from "../controllers";
import { upload } from "../utility";
const router = Router();
router.post("/signup",workerSignup);
router.post("/signin",workerLogin);
router.post("/upload",upload.single("image"),uploadUtility);
export { router as workerRouter };