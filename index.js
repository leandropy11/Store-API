//define rota dos roteadores e anexa nos devidos EndPoints

import express from 'express';
import cors from 'cors';
import winston from 'winston';
import clientsRouter from './routes/client.route.js';
import productRouter from './routes/product.route.js';
import suppliersRouter from './routes/supplier.route.js';
import salesRouter from './routes/sale.route.js';

const app = express();

const {combine, timestamp, label, printf} = winston.format; // Usado para criação de logs
const myFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level} ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: 'store-api.log'})
    ],
    format: combine(
        label({label: "store-api"}),
        timestamp(),
        myFormat
    )
});

app.use(express.json());
app.use(cors()); //usado para limitar como um documento ou script de uma origem pode interagir com recursos de outra origem


app.use('/client', clientsRouter); //Todo parametro passado em /client será redirecionado para clientsRouter
app.use('/product', productRouter); //Todo parametro passado em /client será redirecionado para productRouter
app.use('/supplier', suppliersRouter); //Todo parametro passado em /client será redirecionado para suppliersRouter
app.use('/sale', salesRouter); //Todo parametro passado em /client será redirecionado para salesRouter
app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({error: err.message});
});


app.listen(3000, () => {
    console.log('API Started');
});