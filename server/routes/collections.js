import express from "express";
import { getCollections, createCollection, updateCollection, deleteCollection, createTask, getSingleCollection ,deleteTask,updateTask} from "../controllers/collections.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, getCollections);
router.get("/:id", authenticateToken, getSingleCollection);
router.post("/", authenticateToken, createCollection);
router.put("/:id", authenticateToken, updateCollection);
router.delete("/:id", authenticateToken, deleteCollection);
router.post('/:id/tasks', authenticateToken, createTask);
router.delete('/:collectionId/tasks/:taskId', authenticateToken, deleteTask);
router.put('/tasks/:taskId', authenticateToken, updateTask);
export default router;