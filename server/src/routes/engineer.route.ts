import { Router } from "express";
import { addAssignment, engineerSignin, engineerSignup } from "../controllers";
const router = Router();
router.post("/signup",engineerSignup);
router.post("/signin",engineerSignin);
router.post("/addassignment",addAssignment);
export { router as engineerRouter};