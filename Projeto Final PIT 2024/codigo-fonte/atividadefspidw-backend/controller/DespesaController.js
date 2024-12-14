const DespesaModel = require("../model/entidades/DespesaModel");

const despesaModel = new DespesaModel( )
class DespesaController {
    async obterTodos(req, res){
        const despesas = await despesaModel.obterTodos( )
        return res.status(200).json(despesas)
    }
    
    async obterPorId(req, res){
        const id = req.params.id
        const despesa = await despesaModel.obterPorId(id)
        return res.status(200).json(despesa)
    }

    async adicionar(req, res){
        const {nome, tipo, duracao, valor, data, horario} = req.body
        const despesa = new DespesaModel (0, nome, tipo, duracao, valor, data, horario)

        try {
            await despesaModel.adicionar(despesa)
            return res.status(201).json({message:'Cadastrada com sucesso!'})
        } catch (error) {
            console.log('Erro ao cadastrar a despesa: ' + error)
            res.status(500).json({error: 'Erro ao cadastrar a despesa'})
        }
    }

    async atualizar(req, res){
        const id = req.params.id
        const {nome, tipo, duracao, valor, data,  horario} = req.body
        const despesa = new DespesaModel (id, nome, tipo, duracao, valor, data,  horario)

        try {
            await despesaModel.atualizar(id, despesa)
            return res.status(201).json({message:'Atualizada com sucesso!'})
        } catch (error) {
            console.log('Erro ao atualizar a despesa: ' + error)
            res.status(500).json({error: 'Erro ao atualizar a despesa'})
        }
    }
    
    async excluir(req, res) {
        const id = req.params.id
        try {
            await despesaModel.delete(id)
            res.status(200).json({message:'Excluída com sucesso.'})
        } catch (error) {
            console.log('Erro ao excluir despesa', error)
            res.status(500).json({error: 'Erro ao excluir despesa'})
        }
    }

    async filtrar(req, res){
        const termobusca = req.params.termobusca
        const despesas = await despesaModel.filtrar(termobusca)
        return res.status(200).json(despesas)
    }
}

module.exports = DespesaController