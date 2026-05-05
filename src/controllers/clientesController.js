import { Clientes } from "../models/Clientes.js";
import { Endereco } from "../models/Endereco.js";
import { Telefone } from "../models/Telefone.js";

import clientesRepository from "../repositories/clientesRepository.js";
import axios from "axios";

const clientesController = {


    criar: async (req, res) => {
        try {
            const { nome, cpf, telefone, cep, numero, complemento } = req.body;

            const cepRegex = /^[0-9]{8}$/;
            if (!cepRegex.test(cep)) {
                return res.status(400).json({ message: 'Verifique o CEP informado!' });
            }

            const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            if (respApi.data.erro) {
                throw new Error('CEP não encontrado');
            }

            const logradouro = respApi.data.logradouro;
            const bairro = respApi.data.bairro;
            const cidade = respApi.data.localidade;
            const uf = respApi.data.uf;

            const clientes = Clientes.criar({ nome, cpf });

            const tel = Telefone.criar({
                telefone
            });

            const endereco = Endereco.criar({
                logradouro,
                numero,
                bairro,
                cidade,
                uf,
                cep,
                complemento
            });

            const clienteId = await clientesRepository.criar(clientes, tel, endereco);

            res.status(201).json({
                message: 'Cliente criado com sucesso',
                clienteId
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Erro no servidor',
                errorMessage: error.message
            });
        }
    },


    listar: async (req, res) => {
        try {
            const result = await clientesRepository.listar();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    buscar: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await clientesRepository.buscarPorId(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    atualizar: async (req, res) => {
        try {
            const id = req.params.id;
            const { nome, cpf, telefone, cep, numero, complemento } = req.body;

            const cepRegex = /^[0-9]{8}$/;
            if (!cepRegex.test(cep)) {
                return res.status(400).json({ message: 'Verifique o CEP informado!' });
            }

            const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            if (respApi.data.erro) {
                throw new Error('CEP não encontrado');
            }

            const logradouro = respApi.data.logradouro;
            const bairro = respApi.data.bairro;
            const cidade = respApi.data.localidade;
            const uf = respApi.data.uf;

            const cliente = Clientes.alterar({ nome, cpf }, id);
            // await clientesRepository.atualizar(clientes);

            const tel = Telefone.alterar({
                telefone,
                clienteId: id
            });

            // await clientesRepository.atualizarTelefone(tel);

            const endereco = Endereco.alterar({
                logradouro,
                clienteId: id,
                numero,
                bairro,
                cidade,
                uf,
                cep,
                complemento
            });

            // await clientesRepository.atualizarEndereco(endereco);

            await clientesRepository.atualizar(cliente, tel, endereco);

            res.status(200).json({
                message: 'Cliente atualizado com sucesso'
            });
 
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Erro no servidor',
                errorMessage: error.message
            });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = req.params.id;
            await clientesRepository.deletar(id);

            res.status(200).json({
                message: 'Cliente deletado com sucesso'
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default clientesController;