
export class Clientes {
    #id;
    #nome;
    #cpf;
    #dataCad;

    constructor(pNome, pCpf, pId){
        this.nome = pNome;
        this.cpf = pCpf;
        this.id = pId;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get cpf() {
        return this.#cpf;
    }

   set cpf(value) {
    if (!value){
        throw new Error('CPF obrigatório.');
    }

    this.#validarCPF(value);
    this.#cpf = value.replace(/[^\d]+/g, '');
}

get dataCad() {
    return this.#dataCad ?? null;
}
    #validarId(value){
        if(value && value <= 0){
            throw new Error('Verifique o ID informado.');
        }
    }

    #validarNome(value){
        if(!value || value.trim().length < 3){
            throw new Error('Nome inválido.');
        }
    }
    #validarCPF(cpf){
    if (!cpf){
        throw new Error('CPF obrigatório.');
    }

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)){
        throw new Error('CPF inválido.');
    }

    let soma = 0;
    for (let i = 0; i < 9; i++)
        soma += cpf[i] * (10 - i);

    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    if (resto !== Number(cpf[9])){
        throw new Error('CPF inválido.');
    }

    soma = 0;
    for (let i = 0; i < 10; i++)
        soma += cpf[i] * (11 - i);

    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;

    if (resto !== Number(cpf[10])){
        throw new Error('CPF inválido.');
    }
}
    static criar(dados){
        return new Clientes(dados.nome, dados.cpf, null);
    }

    static alterar(dados, id){
        return new Clientes(dados.nome, dados.cpf, id);
    }
}

