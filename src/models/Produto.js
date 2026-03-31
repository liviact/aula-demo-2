export class Produto {
    #id;
    #idCategoria;
    #nome;
    #valor;
    #caminhoImagem;
    #dataCad;

    
    constructor(pNome, pValor, pIdCategoria, pCaminhoImagem, pId) {
        this.nome = pNome;
        this.valor = pValor;
        this.idCategoria = pIdCategoria;
        this.caminhoImagem = pCaminhoImagem || null;
        this.id = pId;
    }

    // getters e setters
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get idCategoria() {
        return this.#idCategoria;
    }

    set idCategoria(value) {
        this.#validarIdCategoria(value);
        this.#idCategoria = value;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get valor() {
        return this.#valor;
    }

    set valor(value) {
        this.#validarValor(value);
        this.#valor = value;
    }

    get caminhoImagem() {
        return this.#caminhoImagem;
    }

    set caminhoImagem(value) {
        this.#validarCaminhoImagem(value);
        this.#caminhoImagem = value;
    }

    get dataCad() {
        return this.#dataCad;
    }

    // métodos auxiliares de validação
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado.');
        }
    }

    #validarIdCategoria(value) {
        if (!value || value <= 0) {
            throw new Error('O ID da categoria é obrigatório.');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 100) {
            throw new Error('O nome do produto deve ter entre 3 e 100 caracteres.');
        }
    }

    #validarValor(value) {
        if (value === undefined || value === null || value <= 0) {
            throw new Error('O valor do produto deve ser maior que zero.');
        }
    }

    #validarCaminhoImagem(value) {
        if (value && value.trim().length > 255) {
            throw new Error('O caminho da imagem é muito longo.');
        }
    }


    static criar(dados) {
        return new Produto(
            dados.nome,
            dados.valor,
            dados.idCategoria,
            dados.caminhoImagem,
            null
        );
    }

    static alterar(dados, id) {
        return new Produto(
            dados.nome,
            dados.valor,
            dados.idCategoria,
            dados.caminhoImagem,
            id
        );
    }
}