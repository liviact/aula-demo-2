import { connection } from "../configs/Database.js";

const pedidoRepository = {

    async listar() {
        const sql = `SELECT * FROM pedidos`;
        const [rows] = await connection.execute(sql);
        return rows;
    },

    async criar(pedido) {
        const sql = `
            INSERT INTO pedidos (clienteId, subTotal, status, dataCad)
            VALUES (?, ?, ?, NOW())
        `;

        const [result] = await connection.execute(sql, [
            pedido.clienteId ?? null,
            0,
            pedido.status ?? "ABERTO"
        ]);

        return { pedidoId: result.insertId };
    },

 //add item
    async adicionarItem(item) {
        const sql = `
            INSERT INTO itens_pedidos (pedidoId, produtoId, quantidade, valorItem)
            VALUES (?, ?, ?, ?)
        `;

        await connection.execute(sql, [
            item.pedidoId ?? null,
            item.produtoId ?? null,
            item.quantidade ?? null,
            item.valorItem ?? null
        ]);

        await this.atualizarSubtotal(item.pedidoId);
    },

//editar item
    async editarItem(itemId, quantidade) {
        const sql = `
            UPDATE itens_pedidos
            SET quantidade = ?
            WHERE id = ?
        `;

        await connection.execute(sql, [
            quantidade ?? 0,
            itemId
        ]);

        const pedidoId = await this.buscarPedidoIdPorItem(itemId);

        if (pedidoId) {
            await this.atualizarSubtotal(pedidoId);
        }
    },

//remover item
    async removerItem(itemId) {
        const pedidoId = await this.buscarPedidoIdPorItem(itemId);

        const sql = `DELETE FROM itens_pedidos WHERE id = ?`;
        await connection.execute(sql, [itemId]);

        if (pedidoId) {
            await this.atualizarSubtotal(pedidoId);
        }
    },
//att
    async atualizarSubtotal(pedidoId) {
        if (!pedidoId) return;

        const sql = `
            UPDATE pedidos
            SET subTotal = (
                SELECT COALESCE(SUM(valorItem * quantidade), 0)
                FROM itens_pedidos
                WHERE pedidoId = ?
            )
            WHERE id = ?
        `;

        await connection.execute(sql, [pedidoId, pedidoId]);
    },

//buscar por id
    async buscarPedidoIdPorItem(itemId) {
        const sql = `SELECT pedidoId FROM itens_pedidos WHERE id = ?`;
        const [rows] = await connection.execute(sql, [itemId]);

        if (!rows || rows.length === 0) {
            return null;
        }

        return rows[0].pedidoId;
    },

    //att status
    async atualizarStatus(pedidoId, status) {
        const sql = `UPDATE pedidos SET status = ? WHERE id = ?`;
        await connection.execute(sql, [status, pedidoId]);
    }

};

export default pedidoRepository;