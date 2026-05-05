import { statusPedido } from "../enums/statusPedido.js";
import ItensPedido from "../models/ItensPedido.js";
import { Pedido } from "../models/Pedido.js";
import pedidoRepository from "../repositories/pedidoRepository.js";

const pedidoController = {

    // listar pedidos
    async listar(req, res) {
        try {
            const pedidos = await pedidoRepository.listar();

            return res.status(200).json(pedidos);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao listar pedidos",
                error: error.message
            });
        }
    },

    // criar pedido
    async criar(req, res) {
        try {
            const { clienteId, itens } = req.body;

            if (!clienteId || !itens || itens.length === 0) {
                return res.status(400).json({ message: "Dados inválidos" });
            }

            const itensPedido = itens.map(item =>
                ItensPedido.criar({
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    valorItem: item.valorItem
                })
            );

            const subTotal = ItensPedido.calcularSubTotalItens(itensPedido);

            const pedido = Pedido.criar({
                clienteId,
                subTotal,
                status: statusPedido.ABERTO
            });

            const result = await pedidoRepository.criar(pedido, itensPedido);

            return res.status(201).json(result);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Erro ao criar pedido",
                error: error.message
            });
        }
    },

    // adicionar item
    async adicionarItem(req, res) {
        try {
            const { pedidoId } = req.params;
            const { produtoId, quantidade, valorItem } = req.body;

            if (!produtoId || quantidade <= 0 || valorItem <= 0) {
                return res.status(400).json({ message: "Item inválido" });
            }

            const item = ItensPedido.criar({
                produtoId,
                quantidade,
                valorItem,
                pedidoId
            });

            await pedidoRepository.adicionarItem(item);
            await pedidoRepository.atualizarSubtotal(pedidoId);

            res.status(200).json({ message: "Item adicionado com sucesso" });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // editar  item
    async editarItem(req, res) {
        try {
            const { itemId } = req.params;
            const { quantidade } = req.body;

            if (quantidade <= 0) {
                return res.status(400).json({ message: "Quantidade inválida" });
            }

            await pedidoRepository.editarItem(itemId, quantidade);

            const pedidoId = await pedidoRepository.buscarPedidoIdPorItem(itemId);
            await pedidoRepository.atualizarSubtotal(pedidoId);

            res.status(200).json({ message: "Item atualizado com sucesso" });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // remover item
    async removerItem(req, res) {
        try {
            const { itemId } = req.params;

            const pedidoId = await pedidoRepository.buscarPedidoIdPorItem(itemId);

            await pedidoRepository.removerItem(itemId);
            await pedidoRepository.atualizarSubtotal(pedidoId);

            res.status(200).json({ message: "Item removido com sucesso" });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // att status
    async atualizarStatus(req, res) {
        try {
            const { pedidoId } = req.params;
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({ message: "Status inválido" });
            }

            await pedidoRepository.atualizarStatus(pedidoId, status);

            res.status(200).json({ message: "Status atualizado com sucesso" });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default pedidoController;