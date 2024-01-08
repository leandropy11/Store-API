//Função para conexão com o banco de dados

import pg from 'pg';

async function connect(){
    //Criando um pool de conexões

    if(global.connection){
        return global.connection.connect();
    }

    const pool = new pg.Pool({
        connectionString: "postgres://rdslqdag:BpjnKpGFbyY16l3GeFqSjM-GdOd7FR7B@drona.db.elephantsql.com/rdslqdag"
    });

    global.connection = pool;

    return pool.connect();
}


export  {
    connect
}