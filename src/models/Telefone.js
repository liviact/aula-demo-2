export class Telefone {
    #telefone;

    constructor(pTelefone){
        this.telefone = pTelefone;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(value) {
        this.#validarTelefone(value);
        this.#telefone = value.replace(/[^\d]+/g, '');
    }

    #validarTelefone(value){
        const tel = value.replace(/[^\d]+/g, '');
        if(tel.length < 10 || tel.length > 11){
            throw new Error('Telefone inválido.');
        }
    }

    static criar(dados){
        return new Telefone(dados.telefone);
    }

    static alterar(dados){
        return new Telefone(dados.telefone);
    }
}