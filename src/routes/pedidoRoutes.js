import { Router } from "express";
import pedidoController from "../controllers/pedidoController.js";

const router = Router();

router.get("/", pedidoController.listar);
router.post("/", pedidoController.criar);

router.post("/:pedidoId/itens", pedidoController.adicionarItem);
router.put("/itens/:itemId", pedidoController.editarItem);
router.delete("/itens/:itemId", pedidoController.removerItem);

router.put("/:pedidoId/status", pedidoController.atualizarStatus);

export default router;