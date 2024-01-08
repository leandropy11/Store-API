//Faz a conexão com o banco de dado

import {connect} from './db.js';

async function insertSupplier(supplier){
    const conn = await connect();
    try{
        const sql = "INSERT INTO suppliers (name, cnpj, phone, email, address) VALUES($1, $2, $3, $4, $5) RETURNING *"
        const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.address];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch(err){
        throw err;
    } finally {
        conn.release();
    }
    
}

async function getSuppliers(){ // Retorna todos os supplieres do banco
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM suppliers");
        return res.rows;
    } catch(err) {
        throw err;
    }finally {
        conn.release();
    }
}

async function getSupplier(id){ // Retorna o suppliere pelo id
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM suppliers WHERE suppliers_id = $1", [id]);
        return res.rows[0];
    } catch(err) {
        throw err;
    }finally {
        conn.release();
    }
}

async function updateSupplier(supplier){
    const conn = await connect();
    try {
        const sql = 'UPDATE suppliers SET name = $1, cnpj = $2, phone = $3, email = $4, address = $5 WHERE suppliers_id = $6 RETURNING *';
        const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.address, supplier.suppliers_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch(err) {
        throw err;
    }finally {
        conn.release();
    }
}

async function deleteSupplier(id){
    const conn = await connect();
    try {
        await conn.query("DELETE FROM suppliers WHERE suppliers_id = $1", [id]);
    } catch(err) {
        throw err;
    }finally {
        conn.release();
    }
}

export default {
    insertSupplier,
    getSuppliers,
    getSupplier,
    updateSupplier,
    deleteSupplier
}