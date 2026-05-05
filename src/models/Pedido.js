export class Pedido {
    #id;
    #clienteId;
    #subTotal;
    #status;
    #dataCad;

//CONSTRUCTOR
constructor (pClienteId, pSubtotal, pStatus, pId){
    this.#clienteId = pClienteId;
    this.#subTotal = pSubtotal;
    this.#status = pStatus;
    this.#id = pId;

}

    //GETTERS
    get id() {
        return this.#id;
    }
    get clienteId() {
        return this.#clienteId;
    }
    get subtotal() {
        return this.#subTotal;
    }
    get status() {
        return this.#status;
    }

    //SETTERS

    set id(value) {
        this.#validarId(value);
        this.#id = value
    }

    set clienteId(value) {
        this.#validarClienteId(value);
        this.#clienteId = value;
    }
    set subtotal(value) {
        this.#validarSubTotal(value);
        this.#subTotal = value;
    }
    set status(value) {
        this.#status = value
    }

    //METODOS AUXILIARES

    #validarId(value) {
        if (value && value <= 0) {
            throw new Error("Verifique o ID informado");
        }
    }
    #validarClienteId(value) {
        if (value && value <= 0) {
            throw new Error("Verifique o ID do cliente informado");
        }
    }

    #validarSubTotal(value) {
        if (!value && value <= 0) {
            throw new Error("Não foi possivel obter o subtotal");
        }
    }

    //DESIGN PATTERN
    static criar(dados){
        return new Pedido(dados.clienteId, dados.subtotal, dados.status, null);
    }
    static editar(dados, id){
        return new Pedido(dados.clienteId, dados.subtotal, dados.status, id);
    }
}



