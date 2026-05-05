export default class ItensPedido {

    #id;
    #pedidoId;
    #produtoId;
    #quantidade;
    #valorItem;

    constructor(pProdutoId, pQuantidade, pValorItem, pId = null, pPedidoId = null) {
        this.#produtoId = pProdutoId;
        this.#quantidade = pQuantidade;
        this.#valorItem = pValorItem;
        this.#id = pId;
        this.#pedidoId = pPedidoId;
    }

    get pedidoId() { return this.#pedidoId; }
    get produtoId() { return this.#produtoId; }
    get quantidade() { return this.#quantidade; }
    get valorItem() { return this.#valorItem; }

    static calcularSubTotalItens(itens) {
        return itens.reduce(
            (total, item) => total + (item.valorItem * item.quantidade),
            0
        );
    }

    static criar(dados) {
        return new ItensPedido(
            dados.produtoId,
            dados.quantidade,
            dados.valorItem
        );
    }
}