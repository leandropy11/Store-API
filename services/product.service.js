//Faz toda a lógica de negócio

import productRepository from "../repositories/product.repository.js";
import supplierRepository from "../repositories/supplier.repository.js";

async function createProduct(product){
    if(await supplierRepository.getSupplier(product.suppliers_id)){
        return await productRepository.insertProduct(product);
    }
    throw new Error('O supplier ID informado não existe.');
    
}

async function getProducts(){
    return await productRepository.getProducts();
}

async function getProduct(id){
    return await productRepository.getProduct(id);
}

async function deleteProduct(id){
    await productRepository.deleteProduct(id);
}

async function updateProduct(product){
    if(await supplierRepository.getSupplier(product.suppliers_id)){
        return await productRepository.updateProduct(product);
    }
    throw new Error('O supplier ID informado não existe.');
    
}


export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}