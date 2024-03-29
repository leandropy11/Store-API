//Faz a conexão com o banco de dados

import {connect} from './db.js';

async function insertProduct(product){
    const conn = await connect();
    try{
        const sql = "INSERT INTO products (name, description, value, stock, suppliers_id) VALUES($1, $2, $3, $4, $5) RETURNING *"
        const values = [product.name, product.description, product.value, product.stock, product.suppliers_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch(err){
        throw err;
    } finally {
        conn.release();
    }
    
}

async function getProducts(){ // Retorna todos os productes do banco
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM products");
        return res.rows;
    } catch(err) {
        throw err;
    }finally {
        conn.release();
    }
}

async function getProduct(id){ // Retorna o producte pelo id
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM products WHERE product_id = $1", [id]);
        return res.rows[0];
    } catch(err) {
        throw err;
    }finally {
        conn.release();
    }
}

async function updateProduct(product){
    const conn = await connect();
    try {
        const sql = 'UPDATE products SET name = $1, description = $2, value = $3, stock = $4, suppliers_id = $5 WHERE product_id = $6 RETURNING *';
        const values = [product.name, product.description, product.value, product.stock, product.suppliers_id, product.product_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch(err) {
        throw err;
    }finally {
        conn.release();
    }
}

async function deleteProduct(id){
    const conn = await connect();
    try {
        await conn.query("DELETE FROM products WHERE product_id = $1", [id]);
    } catch(err) {
        throw err;
    }finally {
        conn.release();
    }
}

export default {
    insertProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}