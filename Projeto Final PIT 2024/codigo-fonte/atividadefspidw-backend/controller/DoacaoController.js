
const DoacaoModel = require("../model/entidades/DoacaoModel");
const DoadorModel = require("../model/entidades/DoadorModel");
const doacaoModel = new DoacaoModel();
class DoacaoController {

    async buscarPorNome(req, res) {
        try {
            const { nome } = req.params;
            const doadores = await DoadorModel.buscarPorNome(nome);
            res.status(200).json(doadores);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar doadores por nome.' });
        }
    }
    async obterTodos(req, res) {
        try {
            const doacao = await doacaoModel.obterTodos();
            return res.status(200).json(doacao);
        } catch (error) {
            console.error("Erro ao obter todas as doações:", error);
            res.status(500).json({ error: "Erro ao obter todas as doações." });
        }
    }

    async obterPorId(req, res) {
        const id = req.params.id;
        try {
            const doacao = await doacaoModel.obterPorId(id);
            if (!doacao) {
                return res.status(404).json({ error: "Doação não encontrada." });
            }
            return res.status(200).json(doacao);
        } catch (error) {
            console.error("Erro ao obter a doação:", error);
            res.status(500).json({ error: "Erro ao obter a doação." });
        }
    }

    async adicionar(req, res) {
        const { nome, cpf, tipo, descricao } = req.body;
        if (!nome || !cpf || !tipo || !descricao) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const doacao = new DoacaoModel(0, nome, cpf, tipo, descricao);
        try {
            await doacaoModel.adicionar(doacao);
            return res.status(201).json({ message: "Doação cadastrada com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar a doação:", error);
            res.status(500).json({ error: "Erro ao cadastrar doação." });
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
        const { nome, cpf, tipo, descricao } = req.body;

        if (!nome || !cpf || !tipo || !descricao) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const doacao = new DoacaoModel(id, nome, cpf, tipo, descricao);

        try {
            await doacaoModel.atualizar(id, doacao);
            return res.status(200).json({ message: "Doação atualizada com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar a doação:", error);
            res.status(500).json({ error: "Erro ao atualizar a doação." });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;
        try {
            await doacaoModel.delete(id);
            res.status(200).json({ message: "Doação excluída com sucesso." });
        } catch (error) {
            console.error("Erro ao excluir a doação:", error);
            res.status(500).json({ error: "Erro ao excluir a doação." });
        }
    }

    async filtrar(req, res) {
        const termobusca = req.params.termobusca;
        try {
            const doacoes = await doacaoModel.filtrar(termobusca);
            return res.status(200).json(doacoes);
        } catch (error) {
            console.error("Erro ao filtrar doações:", error);
            res.status(500).json({ error: "Erro ao filtrar doações." });
        }
    }
}

module.exports = DoacaoController;
