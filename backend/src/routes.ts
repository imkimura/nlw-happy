import {Router} from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanageController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.post('/orphanages', upload.array('images'), OrphanagesController.store);
routes.get('/orphanages/:id', OrphanagesController.show);

export default routes;