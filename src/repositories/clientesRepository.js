import { connection } from "../configs/Database.js";

const clientesRepository = {
    criar: async (cliente, telefone, endereco) => {

        console.log(endereco.logradouro,
            endereco.complemento,
            endereco.bairro,
            endereco.cidade,
            endereco.uf,
            endereco.cep,
            endereco.numero);


        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const [resultCliente] = await conn.execute(
                'INSERT INTO clientes (Nome, CPF) VALUES (?, ?)',
                [
                    cliente.nome ?? null,
                    cliente.cpf ?? null
                ]
            );

            const clienteId = resultCliente.insertId;


            await conn.execute(
                'INSERT INTO telefone (ClienteId, Telefone) VALUES (?, ?)',
                [
                    clienteId,
                    telefone?.telefone ??  null
                ]
            );


            await conn.execute(
                `INSERT INTO enderecos 
            (Logradouro, ClienteId, Complemento, Bairro, Cidade, UF, CEP, Numero)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    endereco.logradouro,
                    resultCliente.insertId,
                    endereco.complemento,
                    endereco.bairro,
                    endereco.cidade,
                    endereco.uf,
                    endereco.cep,
                    endereco.numero
                ]
            );

            await conn.commit();
            return clienteId;

        } catch (error) {
            console.error(error);            
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    atualizar: async (cliente, telefone, endereco) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            await conn.execute(
                'UPDATE clientes SET Nome=?, CPF=? WHERE Id=?',
                [
                    cliente.nome ?? null,
                    cliente.cpf ?? null,
                    cliente.id
                ]
            );

            await conn.execute(
                'UPDATE telefone SET Telefone=? WHERE ClienteId=?',
                [
                    telefone?.telefone ?? telefone ?? null,
                    cliente.id
                ]
            );

            await conn.execute(
                `UPDATE enderecos 
                 SET Logradouro=?, Complemento=?, Bairro=?, Cidade=?, UF=?, CEP=?, Numero=? 
                 WHERE ClienteId=?`,
                [
                    endereco.logradouro ?? null,
                    endereco.complemento ?? null,
                    endereco.bairro ?? null,
                    endereco.cidade ?? null,
                    endereco.uf ?? null,
                    endereco.cep ?? null,
                    endereco.numero ?? null,
                    cliente.id
                ]
            );

            await conn.commit();

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    deletar: async (id) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            await conn.execute(
                'DELETE FROM telefone WHERE ClienteId=?',
                [id]
            );

            await conn.execute(
                'DELETE FROM enderecos WHERE ClienteId=?',
                [id]
            );

            await conn.execute(
                'DELETE FROM clientes WHERE Id=?',
                [id]
            );

            await conn.commit();

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    listar: async () => {
        const [rows] = await connection.execute(
            `SELECT 
                c.Id, c.Nome, c.DataCad, c.CPF, 
                t.Telefone,
                e.Logradouro,
                e.Numero,
                e.CEP,
                e.UF,
                e.Cidade,
                e.Bairro,
                e.Complemento
                
                FROM clientes as c 
                INNER JOIN telefone as t 
                    on c.Id = t.ClienteId 
                INNER JOIN enderecos as e 
                    ON c.Id = e.ClienteId`
        );
        return rows;
    }

};

export default clientesRepository;