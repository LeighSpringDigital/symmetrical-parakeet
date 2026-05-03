import { Hono } from "hono";
import healthRouter from "./health";
import sheetsRouter from "./sheets";

const router = new Hono();

router.route("/", healthRouter);
router.route("/sheets", sheetsRouter);

export default router;
