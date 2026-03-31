import { Router } from "express";
import produtoController from "../controllers/produtoController.js";
import uploadImage from "../middlewares/uploadImage.middleware.js";

const produtoRoutes = Router();

produtoRoutes.post('/criar', uploadImage, produtoController.criar);
produtoRoutes.put('/atualizar/:id', uploadImage, produtoController.editar);
produtoRoutes.delete('/deletar/:id', produtoController.deletar);
produtoRoutes.get('/listar', produtoController.selecionar);

export default produtoRoutes;