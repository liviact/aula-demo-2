import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {


    async criar(req, res) {
        try {
            const { nome, preco, descricao } = req.body;

            const imagem = req.file ? req.file.filename : null;

            if (!nome || !preco) {
                return res.status(400).json({ message: "Nome e preço são obrigatórios" });
            }

            const produto = {
                nome,
                preco,
                descricao: descricao ?? null,
                imagem
            };

            const result = await produtoRepository.criar(produto);

            return res.status(201).json(result);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao criar produto",
                error: error.message
            });
        }
    },


    async editar(req, res) {
        try {
            const { id } = req.params;
            const { nome, preco, descricao } = req.body;

            const imagem = req.file ? req.file.filename : null;

            const produto = {
                id,
                nome,
                preco,
                descricao,
                imagem
            };

            await produtoRepository.editar(produto);

            return res.status(200).json({ message: "Produto atualizado com sucesso" });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao atualizar produto",
                error: error.message
            });
        }
    },

    
    async deletar(req, res) {
        try {
            const { Id } = req.params;

            await produtoRepository.deletar( Id);

            return res.status(200).json({ message: "Produto deletado com sucesso" });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao deletar produto",
                error: error.message
            });
        }
    },


    async selecionar(req, res) {
        try {
            const produtos = await produtoRepository.listar();

            return res.status(200).json(produtos);

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao listar produtos",
                error: error.message
            });
        }
    }

};

export default produtoController;