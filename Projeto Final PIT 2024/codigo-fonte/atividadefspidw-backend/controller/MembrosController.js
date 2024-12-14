const MembroModel = require('../model/entidades/MembroModel');

const membroModel = new MembroModel();
class MembrosController {
    async listar(req, res) {
        try {
            const membros = await membroModel.listar();
            res.status(200).json(membros);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar membros.", error });
        }
    }

    async obterPorId(req, res){
        const id = req.params.id
        const membro = await membroModel.obterPorId(id)
        return res.status(200).json(membro)
    }

    async adicionar(req, res){
        const {nome, cpf, genero,telefone, email, endereco, ativo} = req.body
        const membro = new MembroModel (0, nome, cpf, genero,telefone, email, endereco,  ativo)

        try {
            await membroModel.adicionar(membro)
            return res.status(201).json({message:'Cadastrado com sucesso!'})
        } catch (error) {
            console.log('Erro ao cadastrar membro: ' + error)
            res.status(500).json({error: 'Erro ao cadastrar membro'})
        }
    }


    async atualizar(req, res){
        const id = req.params.id
        const {nome, cpf, genero,telefone, email, endereco, ativo} = req.body
        const membro = new EventoModel (id, nome, cpf, genero,telefone, email, endereco,  ativo)

        try {
            await membroModel.atualizar(id, membro)
            return res.status(201).json({message:'Atualizado com sucesso!'})
        } catch (error) {
            console.log('Erro ao atualizar o evento: ' + error)
            res.status(500).json({error: 'Erro ao atualizar evento'})
        }
    }

    async excluir(req, res) {
        const id = req.params.id
        try {
            await membroModel.delete(id)
            res.status(200).json({message:'Excluído com sucesso.'})
        } catch (error) {
            console.log('Erro ao excluir evento', error)
            res.status(500).json({error: 'Erro ao excluir membro'})
        }
    }

    async filtrar(req, res){
        const termobusca = req.params.termobusca
        const membros = await membroModel.filtrar(termobusca)
        return res.status(200).json(membros)
    }
}

module.exports =  MembrosController
