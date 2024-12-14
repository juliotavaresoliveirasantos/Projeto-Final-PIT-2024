const DoadorModel = require("../model/entidades/DoadorModel");

const doadorModel = new DoadorModel( )
class DoadorController {

    async buscarPorNome(req, res) {
        try {
            const { nome } = req.params;
            console.log('nome',nome)
            const doadores = await DoadorModel.buscarPorNome(nome);
            res.status(200).json(doadores);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro ao buscar doadores por nome.' });
        }
    }
    async obterTodos(req, res){
        const doador = await doadorModel.obterTodos( )
        return res.status(200).json(doador)
    }
    
    async obterPorId(req, res){
        const id = req.params.id
        const doador = await doadorModel.obterPorId(id)
        return res.status(200).json(doador)
    }

    async adicionar(req, res){
        const {nome, cpf, genero,telefone, email, endereco,  membro} = req.body
        const doador = new DoadorModel (0, nome, cpf, genero,telefone, email, endereco,  membro)

        try {
            await doadorModel.adicionar(doador)
            return res.status(201).json({message:'Cadastrado com sucesso!'})
        } catch (error) {
            console.log('Erro ao cadastrar o doador: ' + error)
            res.status(500).json({error: 'Erro ao cadastrar doador'})
        }
    }

    async atualizar(req, res){
        const id = req.params.id
        const {nome, cpf, genero,telefone, email, endereco,  membro} = req.body
        const doador = new DoadorModel (id, nome, cpf, genero,telefone, email, endereco,  membro)

        try {
            await doadorModel.atualizar(id, doador)
            return res.status(201).json({message:'Atualizado com sucesso!'})
        } catch (error) {
            console.log('Erro ao atualizar o doador: ' + error)
            res.status(500).json({error: 'Erro ao atualizar doador'})
        }
    }
    
    async excluir(req, res) {
        const id = req.params.id
        try {
            await doadorModel.delete(id)
            res.status(200).json({message:'Excluído com sucesso.'})
        } catch (error) {
            console.log('Erro ao excluir  doador', error)
            res.status(500).json({error: 'Erro ao excluir  doador'})
        }
    }

    async filtrar(req, res){
        const termobusca = req.params.termobusca
        const  doadores = await  doadorModel.filtrar(termobusca)
        return res.status(200).json( doadores)
    }
}

module.exports = DoadorController