//Trata as requisições

import productService from "../services/product.service.js";

async function createProduct(req, res, next){
    try {
        let product = req.body;
        if(!product.name || !product.description || !product.value || !product.stock || !product.suppliers_id){
            throw new Error("name, Description, Value, Stock e Suppliers ID são obrigatórios");
        }

        //ProductService

        product = await productService.createProduct(product);
        res.send(product);
        logger.info(`POST /product - ${JSON.stringify(product)}`);

    } catch(err) {
        next(err);
    }
}

async function getProducts(req, res, next){
    try{
        res.send(await productService.getProducts());
        logger.info('GET /product');
    } catch(err){
        next(err);
    }
}

async function getProduct(req, res, next){
    try{
        res.send(await productService.getProduct(req.params.id));
        logger.info('GET /product');
    } catch(err){
        next(err);
    }
}

async function deleteProduct(req, res, next){
    try{
        await productService.deleteProduct(req.params.id);
        res.end();
        logger.info('DELETE /product');
    } catch(err) {
        next(err);
    }
}

async function updateProduct(req, res, next){
    try{
        let product = req.body;
        if(!product.product_id || !product.name || !product.description || !product.value || !product.stock || !product.suppliers_id){
            throw new Error('Product ID, Name, Description, Value, Stock, Suppliers ID são obrigatórios');
        }
        product = await productService.updateProduct(product);
        res.send(product);
        logger.info(`PUT /product - ${JSON.stringify(product)}`);
    } catch(err){
        next(err);
    }
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}