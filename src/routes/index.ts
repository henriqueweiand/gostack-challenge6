import { Router } from 'express';
import multer from 'multer';

import transactionsRouter from './transactions.routes';
import uploadConfig from '../config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.use('/transactions', upload.single('file'), transactionsRouter);

export default routes;
