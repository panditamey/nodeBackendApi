import express from 'express';
import homeRouter from './routes/homeRouter.js';
import cors from 'cors';
import productsRouter from './routes/productsRouter.js';
import { getErrorStatus } from './controllers/404ErrorController.js';

const app = express();
const port = 5000;

const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 
 app.use(cors()) 

app.use(express.json());


app.use('/', homeRouter);
app.use('/products', productsRouter);
app.get('*',getErrorStatus);

app.listen(port, () => console.log(`Listening at port number ${port}`));
