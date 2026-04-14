import {Router} from "express";
const routes = Router ();
import categoriaRoutes from "./categoriaRoutes.js";
import clientesRoutes from "./clientesRoutes.js";
import produtoRoutes from "./produtoRoutes.js"

routes.use('/categorias', categoriaRoutes);
routes.use('/produtos', produtoRoutes);
routes.use('/clientes', clientesRoutes)

export default routes; 