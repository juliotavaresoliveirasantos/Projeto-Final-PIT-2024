const EventoModel = require("../model/entidades/EventoModel");

const eventoModel = new EventoModel( )
class EventoController {
    async obterTodos(req, res){
        const eventos = await eventoModel.obterTodos( )
        return res.status(200).json(eventos)
    }
    
    async obterPorId(req, res){
        const id = req.params.id
        const evento = await eventoModel.obterPorId(id)
        return res.status(200).json(evento)
    }

    async adicionar(req, res){
        const {titulo, quantidade, data, datab, hora,  horab} = req.body
        const evento = new EventoModel (0, titulo, quantidade, data, datab, hora,  horab)

        try {
            await eventoModel.adicionar(evento)
            return res.status(201).json({message:'Cadastrado com sucesso!'})
        } catch (error) {
            console.log('Erro ao cadastrar o evento: ' + error)
            res.status(500).json({error: 'Erro ao cadastrar evento'})
        }
    }

    async atualizar(req, res){
        const id = req.params.id
        const {titulo, quantidade, data, datab, hora,  horab} = req.body
        const evento = new EventoModel (id, titulo, quantidade, data, datab, hora,  horab)

        try {
            await eventoModel.atualizar(id, evento)
            return res.status(201).json({message:'Atualizado com sucesso!'})
        } catch (error) {
            console.log('Erro ao atualizar o evento: ' + error)
            res.status(500).json({error: 'Erro ao atualizar evento'})
        }
    }
    
    async excluir(req, res) {
        const id = req.params.id
        try {
            await eventoModel.delete(id)
            res.status(200).json({message:'Excluído com sucesso.'})
        } catch (error) {
            console.log('Erro ao excluir evento', error)
            res.status(500).json({error: 'Erro ao excluir evento'})
        }
    }

    async filtrar(req, res){
        const termobusca = req.params.termobusca
        const eventos = await eventoModel.filtrar(termobusca)
        return res.status(200).json(eventos)
    }
}

module.exports = EventoController