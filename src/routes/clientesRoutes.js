import {Router} from 'express';
import clientesController from '../controllers/clientesContoller.js';

const clientesRoutes = Router();

clientesRoutes.post('/', clientesController.criar);      
clientesRoutes.get('/', clientesController.listar);     
clientesRoutes.put('/:id', clientesController.atualizar); 
clientesRoutes.delete('/:id', clientesController.deletar); 


export default clientesRoutes; 